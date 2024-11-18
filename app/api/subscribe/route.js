import { createClient } from "contentful-management";

export async function POST(request) {
	try {
		const { email } = await request.json();

		// Get IP address from various possible headers
		const forwarded = request.headers.get("x-forwarded-for");
		const ip = forwarded
			? forwarded.split(",")[0]
			: request.headers.get("x-real-ip");

		if (!ip) {
			return new Response(
				JSON.stringify({ message: "Could not verify request origin" }),
				{ status: 400 }
			);
		}

		// Validate email
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return new Response(
				JSON.stringify({ message: "Invalid email address" }),
				{ status: 400 }
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
			"fields.email[match]": email,
		});

		if (entries.items.length > 0) {
			console.log("Found existing email:", email);
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
						"en-US": email,
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
