import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function GET() {
	const cookieStore = await cookies();
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
	
	try {
		const { data, error } = await supabase
			.from('release_dates')
			.select('*')
			.order('date', { ascending: true })
			.limit(1);

		if (error) throw error;

		// Transform the data to match the expected format
		const transformedData = {
			items: data ? [
				{
					fields: {
						countdownDate: data[0]?.date
					}
				}
			] : []
		};

		return new Response(JSON.stringify(transformedData), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error fetching content:', error);
		return new Response(JSON.stringify({ 
			error: error.message,
			items: [] 
		}), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
