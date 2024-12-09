"use client";

import { useState } from "react";
import { useTranslations } from "../../hooks/useTranslations";

export default function MailingList() {
	const { t } = useTranslations();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setStatus({ type: "", message: "" });

		try {
			const response = await fetch("/api/marketing/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to subscribe");
			}

			setStatus({ type: "success", message: t("subscribeSuccess") });
			setEmail("");
		} catch (error) {
			setStatus({ type: "error", message: error.message });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-16 bg-purple-900 text-white">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">{t("joinMailingList")}</h2>
					<p className="mb-8">{t("mailListDescription")}</p>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={t("emailPlaceholder")}
								className="px-4 py-2 rounded-lg text-gray-900 w-full sm:w-auto"
								required
							/>
							<button
								type="submit"
								disabled={isLoading}
								className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
							>
								{isLoading ? t("subscribing") : t("subscribe")}
							</button>
						</div>
						
						{status.message && (
							<div className={`text-sm ${
								status.type === "success" ? "text-green-300" : "text-red-300"
							}`}>
								{status.message}
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
