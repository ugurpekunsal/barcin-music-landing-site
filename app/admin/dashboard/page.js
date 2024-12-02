"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabase";
import AdminLayout from "../../components/layout/AdminLayout";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
	const [events, setEvents] = useState([]);
	const router = useRouter();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push("/");
	};

	return (
		<AdminLayout>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<button
						onClick={handleSignOut}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Sign Out
					</button>
				</div>
				<nav className="space-x-4">
					<a
						href="/admin/events"
						className="text-purple-600 hover:text-purple-800"
					>
						Manage Events
					</a>
					{/* Add more admin navigation links here */}
				</nav>
			</div>
		</AdminLayout>
	);
}
