"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "../../hooks/useTranslations";
import { useState, useEffect } from "react";

export default function LiveStreams() {
	const { t } = useTranslations();
	const [activeStream, setActiveStream] = useState("twitch");
	const [parentDomain, setParentDomain] = useState("barcinmusic.com");

	useEffect(() => {
		const hostname = window.location.hostname;
		setParentDomain(hostname === "localhost" ? "localhost" : "barcinmusic.com");
	}, []);

	return (
		<section id="live-streams" className="py-16 mt-20 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("joinLive")}</h2>
				<div className="max-w-6xl mx-auto">
					<div className="flex justify-center mb-4">
						<button
							onClick={() => setActiveStream("twitch")}
							className={`px-6 py-3 mr-2 rounded-lg transition-colors ${
								activeStream === "twitch"
									? "bg-purple-600 text-white"
									: "bg-gray-200"
							}`}
						>
							Twitch
						</button>
						<button
							onClick={() => setActiveStream("kick")}
							className={`px-6 py-3 rounded-lg transition-colors ${
								activeStream === "kick"
									? "bg-purple-600 text-white"
									: "bg-gray-200"
							}`}
						>
							Kick
						</button>
					</div>
					<div className="flex flex-col lg:flex-row items-start gap-8">
						<div className="w-full lg:w-2/3">
							<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
								{activeStream === "twitch" ? (
									<iframe
										src={`https://player.twitch.tv/?channel=barcinmusic&parent=${parentDomain}`}
										frameBorder="0"
										allowFullScreen={true}
										scrolling="no"
										className="w-full h-full"
									></iframe>
								) : (
									<iframe
										src="https://player.kick.com/barcinmusic"
										frameBorder="0"
										allowFullScreen={true}
										scrolling="no"
										className="w-full h-full"
									></iframe>
								)}
							</div>
						</div>
						<div className="w-full lg:w-1/3">
							<h3 className="text-2xl font-semibold mb-4">{t("joinLive")}</h3>
							<p className="mb-6">{t("liveStreamDescription")}</p>
							<p className="mb-6">{t("streamDescription")}</p>
							{activeStream === "twitch" ? (
								<Link
									href="https://www.twitch.tv/barcinmusic"
									className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("followOnTwitch")}
								</Link>
							) : (
								<Link
									href="https://kick.com/barcinmusic"
									className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("followOnKick")}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
