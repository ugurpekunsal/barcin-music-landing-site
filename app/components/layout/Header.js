"use client";

import Link from "next/link";
import LanguageSelector from "../ui/LanguageSelector";
import { useTranslations } from "../../hooks/useTranslations";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{ href: "/", label: "home" },
		{ href: "/pages/music", label: "music" },
		{ href: "/pages/about", label: "about" },
		{ href: "/pages/live", label: "live", icon: <RecordingIcon /> },
	];

	return (
		<header className="bg-purple-800 bg-opacity-90 fixed top-0 w-full z-50">
			<nav className="container mx-auto px-6 py-3">
				<div className="flex justify-between items-center">
					<Link href="/" className="barcin-logo text-4xl text-purple-200">
						Barçın
					</Link>

					{/* Hamburger menu button */}
					<button
						className="lg:hidden text-purple-200 hover:text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>

					{/* Desktop menu */}
					<div className="hidden lg:flex space-x-4 items-center">
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
				</div>

				{/* Mobile menu */}
				<div
					className={`${
						isMenuOpen ? "block" : "hidden"
					} lg:hidden mt-4 pb-4 space-y-4`}
				>
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`block text-purple-200 hover:text-white transition duration-300 py-2 ${
								pathname === item.href ? "border-b-2 border-white" : ""
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							<span className="flex items-center">
								{t(item.label)}
								{item.icon}
							</span>
						</Link>
					))}
					<div className="pt-2">
						<LanguageSelector />
					</div>
				</div>
			</nav>
		</header>
	);
}
