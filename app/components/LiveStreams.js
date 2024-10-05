"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "../hooks/useTranslations";
import { useState } from "react";

export default function LiveStreams() {
	const { t } = useTranslations();
	const [activeStream, setActiveStream] = useState("twitch");

	return (
		<section id="live-streams" className="py-16 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{t("liveStreams")}
				</h2>
				<div className="flex justify-center mb-4">
					<button
						onClick={() => setActiveStream("twitch")}
						className={`px-4 py-2 mr-2 ${
							activeStream === "twitch"
								? "bg-purple-600 text-white"
								: "bg-gray-200"
						}`}
					>
						Twitch
					</button>
					<button
						onClick={() => setActiveStream("kick")}
						className={`px-4 py-2 ${
							activeStream === "kick"
								? "bg-purple-600 text-white"
								: "bg-gray-200"
						}`}
					>
						Kick
					</button>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center mb-8">
					<div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
						<div className="aspect-w-16 aspect-h-9">
							{activeStream === "twitch" ? (
								<iframe
									src="https://player.twitch.tv/?channel=barcinmusic&parent=barcin-music-landing-site.vercel.app"
									frameBorder="0"
									allowFullScreen={true}
									scrolling="no"
									height="378"
									width="620"
								></iframe>
							) : (
								<iframe
									src="https://player.kick.com/barcinmusic"
									frameBorder="0"
									allowFullScreen={true}
									scrolling="no"
									height="378"
									width="620"
								></iframe>
							)}
						</div>
					</div>
					<div className="w-full md:w-1/2 text-center md:text-left">
						<h3 className="text-2xl font-semibold mb-4">{t("joinLive")}</h3>
						<p className="mb-6">{t("liveStreamDescription")}</p>
						<p className="mb-6">{t("streamDescription")}</p>
						{activeStream === "twitch" ? (
							<Link
								href="https://www.twitch.tv/barcinmusic"
								className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
							>
								{t("followOnTwitch")}
							</Link>
						) : (
							<Link
								href="https://kick.com/barcinmusic"
								className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
							>
								{t("followOnKick")}
							</Link>
						)}
					</div>
				</div>
				<div className="max-w-4xl mx-auto">
					<h3 className="text-2xl font-semibold mb-4 text-center">
						{t("supportBarcin")}
					</h3>
					<p className="mb-4">{t("supportMessage")}</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">Papara</h4>
							<p>{t("paparaSupport")}</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">Shopier - Tablolarım</h4>
							<p>{t("shopierDescription")}</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h4 className="font-semibold mb-2">PayPal</h4>
							<p>{t("paypalSupport")}</p>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center">
					<h3 className="text-2xl font-semibold mb-4">
						{t("songListDescription")}
					</h3>
					<p className="mb-4">{t("songListDescription")}</p>
					<Link
						href="https://www.streamersonglist.com/t/barcinmusic/songs"
						className="text-purple-600 hover:text-purple-800"
					>
						{t("viewSongList")}
					</Link>
				</div>
			</div>
		</section>
	);
}
