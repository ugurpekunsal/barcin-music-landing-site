"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AdminLayout({ children }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const supabase = createClientComponentClient();

	useEffect(() => {
		checkUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (!session) {
				router.push('/admin/login');
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	async function checkUser() {
		try {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) {
				router.push('/admin/login');
			}
		} catch (error) {
			console.error('Auth error:', error);
			router.push('/admin/login');
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<h1 className="text-xl font-bold">Admin Dashboard</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
