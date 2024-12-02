"use client";

import React, { useState, useEffect } from "react";
import styles from "./Countdown.module.css";
import { useTranslations } from "../../hooks/useTranslations";
import Link from "next/link";

const Countdown = () => {
	const { t } = useTranslations();
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const fetchCountdownDate = async () => {
			try {
				const response = await fetch("/api/content");
				const data = await response.json();

				if (data.items.length > 0) {
					const countDownDate = new Date(
						data.items[0].fields.countdownDate
					).getTime();

					const timer = setInterval(() => {
						const now = new Date().getTime();
						const distance = countDownDate - now;

						if (distance < 0) {
							clearInterval(timer);
							setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
							setIsVisible(false);
							return;
						}

						setTimeLeft({
							days: Math.floor(distance / (1000 * 60 * 60 * 24)),
							hours: Math.floor(
								(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
							),
							minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
							seconds: Math.floor((distance % (1000 * 60)) / 1000),
						});
					}, 1000);

					return () => clearInterval(timer);
				}
			} catch (error) {
				console.error("Failed to fetch countdown date:", error);
				setIsVisible(false);
			}
		};

		fetchCountdownDate();
	}, []);

	if (!isVisible) return null;

	return (
		<div
			className={`${styles.countdown} backdrop-blur-sm py-4`}
			style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
		>
			<h2
				className={`${styles.title} text-white text-xl font-bold mb-2`}
				style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
			>
				{t("nextSongRelease")}
			</h2>
			<div className="flex flex-col md:flex-row items-center justify-center">
				<div className={styles.timer}>
					{Object.entries(timeLeft).map(([unit, value]) => (
						<div key={unit} className={styles.timeUnit}>
							<span
								className={`${styles.number} text-white font-bold`}
								style={{
									backgroundColor: "rgba(124, 58, 237, 0.9)",
									textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
								}}
							>
								{value}
							</span>
							<span
								className={`${styles.label} text-white font-semibold mt-1`}
								style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
							>
								{t(unit)}
							</span>
						</div>
					))}
				</div>
				<div className="mt-4 md:mt-0 md:ml-8">
					<Link
						href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
						className="text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center text-sm"
						style={{ backgroundColor: "rgba(34, 197, 94, 0.9)" }}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = "rgba(34, 197, 94, 1)")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor = "rgba(34, 197, 94, 0.9)")
						}
					>
						<svg
							className="w-4 h-4 mr-2"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
						</svg>
						{t("preSaveOnSpotify")}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Countdown;
