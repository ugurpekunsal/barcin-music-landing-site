"use client";
import React, { useState } from "react";
import { useTranslations } from "../hooks/useTranslations";
import styles from "./Countdown.module.css"; // Import the same styles as Countdown

const MailingList = () => {
	const { t } = useTranslations();
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement mailing list signup logic
		console.log("Mailing list signup:", email);
		setEmail("");
	};

	return (
		<div className={`${styles.countdown} container mx-auto px-6`}>
			<h2 className={styles.title}>{t("joinMailingList")}</h2>
			<p className="text-purple-700 mb-4">{t("mailingListDescription")}</p>
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
					className="w-full sm:w-auto px-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500"
				/>
				<button
					type="submit"
					className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
				>
					{t("subscribe")}
				</button>
			</form>
		</div>
	);
};

export default MailingList;
