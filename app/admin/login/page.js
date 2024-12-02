"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleLogin(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			// Check if user is in admin_users table
			const { data: adminData, error: adminError } = await supabase
				.from("admin_users")
				.select("user_id")
				.eq("user_id", data.user.id)
				.single();

			if (adminError || !adminData) {
				throw new Error("Unauthorized access");
			}

			router.push("/admin/dashboard");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Admin Login
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleLogin}>
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{error}
						</div>
					)}
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
