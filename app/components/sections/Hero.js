"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "../../hooks/useTranslations";
import Countdown from "../ui/Countdown"; // Import the Countdown component

export default function Hero() {
	const { t } = useTranslations();
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.75; // Slow down the video slightly
		}
	}, []);

	return (
		<section className="relative z-10 min-h-screen flex items-center justify-center text-center">
			{/* Video background */}
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				className="absolute w-full h-full object-cover"
			>
				<source src="/videos/hero-video.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black opacity-50 z-10"></div>

			{/* Content */}
			<div className="relative z-20 text-center px-4 mt-[-100px]">
				<motion.h1
					className="text-5xl md:text-7xl font-bold text-white mb-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Barçın
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl text-purple-200 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{t("blendingEmotions")}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<a
						href="#latest-release"
						className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 inline-block"
					>
						{t("listenNow")}
					</a>
				</motion.div>
			</div>

			{/* Countdown */}
			<div className="absolute bottom-0 left-0 right-0 z-30">
				<Countdown />
			</div>
		</section>
	);
}
