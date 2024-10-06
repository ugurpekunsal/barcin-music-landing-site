"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "../hooks/useTranslations";
import { usePathname } from "next/navigation";

const RecordingIcon = () => (
	<svg
		className="w-2 h-2 ml-1 animate-pulse"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="50" cy="50" r="50" fill="red" />
	</svg>
);

export default function Header() {
	const { t } = useTranslations();
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "home" },
		{ href: "/music", label: "music" },
		{ href: "/about", label: "about" },
		{ href: "/live", label: "live", icon: <RecordingIcon /> },
	];

	return (
		<header className="bg-purple-800 bg-opacity-90 fixed w-full z-20">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<Link href="/" className="barcin-logo text-4xl text-purple-200">
					Barçın
				</Link>
				<div className="flex space-x-4 items-center">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`text-purple-200 hover:text-white transition duration-300 flex items-center ${
								pathname === item.href ? "border-b-2 border-white" : ""
							}`}
						>
							{t(item.label)}
							{item.icon}
						</Link>
					))}
					<LanguageSelector />
				</div>
			</nav>
		</header>
	);
}
