"use client";
import React, { useState } from "react";
import { useTranslations } from "../../hooks/useTranslations";
import styles from "../ui/Countdown.module.css";

const MailingList = () => {
	const { t } = useTranslations();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		setMessage(null);

		try {
			const response = await fetch("https://formspree.io/f/your-form-id", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setStatus("success");
				setMessage(t("subscribeSuccess"));
				setEmail("");
			} else {
				setStatus("error");
				setMessage(t("subscribeError"));
			}
		} catch (err) {
			setStatus("error");
			setMessage(t("subscribeError"));
		}
	};

	return (
		<div className={`${styles.countdown} container mx-auto px-6`}>
			<h2 className={styles.title}>{t("joinMailingList")}</h2>
			<p className="text-purple-700 mb-4">{t("mailingListDescription")}</p>

			{message && (
				<p
					className={`mb-4 ${
						status === "success" ? "text-green-600" : "text-red-600"
					}`}
				>
					{message}
				</p>
			)}

			<form
				onSubmit={handleSubmit}
				className="flex flex-col sm:flex-row justify-center items-center gap-4"
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={t("enterEmail")}
					required
					disabled={status === "loading"}
					className="w-full sm:w-auto px-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500 disabled:opacity-50"
				/>
				<button
					type="submit"
					disabled={status === "loading"}
					className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
				>
					{status === "loading" ? t("subscribing") : t("subscribe")}
				</button>
			</form>
		</div>
	);
};

export default MailingList;
