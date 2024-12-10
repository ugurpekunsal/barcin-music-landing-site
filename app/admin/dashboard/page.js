"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminLayout from "../../components/layout/AdminLayout";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
	const router = useRouter();
	const supabase = createClientComponentClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push("/admin/login");
		router.refresh();
	};

	return (
		<AdminLayout>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<button
						onClick={handleSignOut}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					>
						Sign Out
					</button>
				</div>
				<nav className="space-y-2">
					<a
						href="/admin/albums"
						className="block text-purple-600 hover:text-purple-800"
					>
						Manage Albums
					</a>
					<a
						href="/admin/release-date"
						className="block text-purple-600 hover:text-purple-800"
					>
						Manage Release Date
					</a>
					<a
						href="/admin/subscribers"
						className="block text-purple-600 hover:text-purple-800"
					>
						Email Subscribers
					</a>
				</nav>
			</div>
		</AdminLayout>
	);
}
