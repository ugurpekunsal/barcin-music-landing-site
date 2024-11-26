import { createClient } from "contentful";

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN, // Now private
});

export async function GET() {
	try {
		const entry = await client.getEntries({
			content_type: "barcinMusic",
			limit: 1,
		});

		return Response.json(entry);
	} catch (error) {
		console.error("Content fetch error:", error);
		return Response.json({ error: "Failed to fetch content" }, { status: 500 });
	}
}
