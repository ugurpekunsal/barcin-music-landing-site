"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "../hooks/useTranslations";

export default function Header() {
	const { t } = useTranslations();

	return (
		<header className="bg-purple-800 bg-opacity-90 fixed w-full z-20">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<Link href="/" className="barcin-logo text-4xl text-purple-200">
					Barçın
				</Link>
				<div className="flex space-x-4 items-center">
					<Link
						href="/"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						{t("home")}
					</Link>
					<Link
						href="/music"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						{t("music")}
					</Link>
					<Link
						href="/about"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						{t("about")}
					</Link>
					<Link
						href="/live-streams"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						{t("liveStreams")}
					</Link>
					<LanguageSelector />
				</div>
			</nav>
		</header>
	);
}
