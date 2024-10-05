"use client";

import { useTranslations } from "../hooks/useTranslations";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Hero() {
	const { t } = useTranslations();
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.75; // Slow down the video slightly
		}
	}, []);

	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
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
			<div className="relative z-20 text-center px-4">
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

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 1.5, repeat: Infinity }}
			>
				<svg
					className="w-6 h-6 text-white"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
				</svg>
			</motion.div>
		</section>
	);
}
