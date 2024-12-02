"use client";

import { useTranslations } from "../../hooks/useTranslations";
import Image from "next/image";
import Link from "next/link";

// SVG components for social media icons
const TwitchIcon = () => (
	<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
		<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
	</svg>
);

const InstagramIcon = () => (
	<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
	</svg>
);

const YouTubeIcon = () => (
	<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
		<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
	</svg>
);

const SpotifyIcon = () => (
	<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
		<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
	</svg>
);

const KickIcon = () => (
	<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
		<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.436 15.936l-4.242 4.242L9.88 16.12l2.121-2.121-2.121-2.121 3.314-3.314 4.242 4.242-2.121 2.121 2.121 2.121z" />
	</svg>
);

export default function About() {
	const { t } = useTranslations();

	return (
		<section id="about" className="py-16 bg-white mt-20 w-full">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("aboutBarcin")}</h2>
				<div className="max-w-4xl mx-auto">
					<div className="flex flex-col md:flex-row items-center mb-8">
						<div className="md:w-1/3 mb-4 md:mb-0">
							<Image
								src="/images/barcin-profile.png"
								alt="Barçın"
								width={300}
								height={300}
								className="rounded-full"
							/>
						</div>
						<div className="md:w-2/3 md:pl-8">
							<p className="mb-4">{t("aboutDescription")}</p>
							<p className="mb-4">{t("aboutDescription2")}</p>
							<p className="mb-4">{t("aboutDescription3")}</p>
							<p className="mb-4">{t("personalInfo")}</p>
						</div>
					</div>
					<div className="text-center">
						<h3 className="text-2xl font-semibold mb-4">{t("followBarcin")}</h3>
						<div className="flex justify-center space-x-6 mb-4">
							<a
								href="https://www.twitch.tv/barcinmusic"
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:text-purple-800"
							>
								<TwitchIcon />
							</a>
							<a
								href="https://www.instagram.com/barcin.music"
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:text-purple-800"
							>
								<InstagramIcon />
							</a>
							<a
								href="https://www.youtube.com/@BarcinMusicYT"
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:text-purple-800"
							>
								<YouTubeIcon />
							</a>
							<a
								href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:text-purple-800"
							>
								<SpotifyIcon />
							</a>
							<a
								href="https://kick.com/barcinmusic"
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:text-purple-800"
							>
								<KickIcon />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
