"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase";

export default function AdminLayout({ children }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		checkUser();
	}, []);

	async function checkUser() {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) {
				router.push("/admin/login");
				return;
			}

			// Check if user is admin
			const { data: adminData, error: adminError } = await supabase
				.from("admin_users")
				.select("user_id")
				.eq("user_id", session.user.id)
				.single();

			if (adminError || !adminData) {
				router.push("/admin/login");
				return;
			}

			setIsAuthorized(true);
		} catch (error) {
			router.push("/admin/login");
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
			</div>
		);
	}

	if (!isAuthorized) {
		return null;
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
