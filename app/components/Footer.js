"use client";

import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations";

export default function Footer() {
	const { t } = useTranslations();

	const socialLinks = [
		{ name: "Spotify", url: "https://bit.ly/barcinmusic" },
		{ name: "Instagram", url: "https://bit.ly/instabarcin" },
		{ name: "YouTube", url: "https://bit.ly/youtubebarcin" },
		{ name: "Twitch", url: "https://www.twitch.tv/barcinmusic" },
		{ name: "Discord", url: "https://discord.gg/dE6PDJGFUf" },
		{ name: "TikTok", url: "https://www.tiktok.com/@barcin.music" },
		{ name: "Apple Music", url: "https://bit.ly/applebarcin" },
		{ name: "Kick", url: "https://kick.com/barcinmusic" },
	];

	return (
		<footer className="bg-purple-800 text-white py-12">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="flex flex-col items-center md:items-start">
						<h3 className="text-xl font-semibold mb-4">{t("followBarcin")}</h3>
						<div className="grid grid-cols-2 gap-x-8 gap-y-2">
							{socialLinks.map((link, index) => (
								<Link
									key={index}
									href={link.url}
									className="hover:text-purple-300 transition duration-300"
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>
					<div className="flex flex-col items-center md:items-start">
						<h3 className="text-xl font-semibold mb-4">{t("quickLinks")}</h3>
						<Link href="/" className="hover:text-purple-300 mb-2">
							{t("home")}
						</Link>
						<Link href="/music" className="hover:text-purple-300 mb-2">
							{t("music")}
						</Link>
						<Link href="/about" className="hover:text-purple-300 mb-2">
							{t("about")}
						</Link>
						<Link href="/live-streams" className="hover:text-purple-300">
							{t("liveStreams")}
						</Link>
					</div>
					<div className="flex flex-col items-center md:items-start">
						<h3 className="text-xl font-semibold mb-4">{t("contact")}</h3>
						<p className="mb-2">{t("emailContact")}: contact@barcinmusic.com</p>
						<p>{t("copyright")}</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
