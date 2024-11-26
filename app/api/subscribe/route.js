import { RateLimit } from '@/app/utils/rateLimit';
import { createClient } from "contentful-management";
import { headers } from 'next/headers';

const limiter = new RateLimit();

export async function POST(request) {
	try {
		// Get IP address
		const headersList = headers();
		const forwarded = headersList.get("x-forwarded-for");
		const ip = forwarded ? forwarded.split(',')[0] : headersList.get("x-real-ip");

		if (!ip) {
			return new Response(
				JSON.stringify({ 
					error: "INVALID_REQUEST",
					message: "Could not verify request origin" 
				}), 
				{ 
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		// Check rate limit
		const isAllowed = await limiter.check(ip);
		if (!isAllowed) {
			return new Response(
				JSON.stringify({ 
					error: "RATE_LIMIT_EXCEEDED",
					message: "Too many requests, please try again later" 
				}), 
				{ 
					status: 429,
					headers: {
						'Content-Type': 'application/json',
						'Retry-After': '900' // 15 minutes in seconds
					}
				}
			);
		}

		// Validate and sanitize input
		const { email } = await request.json();
		const sanitizedEmail = email?.trim().toLowerCase();
		
		if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
			return new Response(
				JSON.stringify({ 
					error: "INVALID_EMAIL",
					message: "Invalid email address" 
				}), 
				{ 
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		const client = createClient({
			accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
		});

		const space = await client.getSpace(
			process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
		);
		const environment = await space.getEnvironment("master");

		// Check for existing entries with this email
		const entries = await environment.getEntries({
			content_type: "subscriber",
			"fields.email[match]": sanitizedEmail,
		});

		if (entries.items.length > 0) {
			console.log("Found existing email:", sanitizedEmail);
			return new Response(
				JSON.stringify({ message: "Email already subscribed" }),
				{ status: 400 }
			);
		}

		// Create new subscriber
		try {
			const entry = await environment.createEntry("subscriber", {
				fields: {
					email: {
						"en-US": sanitizedEmail,
					},
					ipAddress: {
						"en-US":
							process.env.NODE_ENV === "production" ? ip : `test-${Date.now()}`,
					},
					subscriptionDate: {
						"en-US": new Date().toISOString(),
					},
				},
			});

			// Publish the entry
			await entry.publish();

			return new Response(
				JSON.stringify({ message: "Successfully subscribed" }),
				{ status: 200 }
			);
		} catch (createError) {
			console.error("Entry creation error:", {
				message: createError.message,
				details: createError.details,
			});
			return new Response(
				JSON.stringify({
					message: "Failed to create subscription",
					details: createError.message,
				}),
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Subscription error:", {
			message: error.message,
			details: error.details,
			stack: error.stack,
		});
		return new Response(
			JSON.stringify({
				message: "Internal server error",
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}
