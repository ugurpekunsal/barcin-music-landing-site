import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-purple-800 bg-opacity-90 fixed w-full z-20">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<Link href="/" className="barcin-logo text-4xl text-purple-200">
					Barçın
				</Link>
				<div className="flex space-x-4">
					<Link
						href="/"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						Home
					</Link>
					<Link
						href="#music"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						Music
					</Link>
					<Link
						href="#about"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						About
					</Link>
					<Link
						href="#live-streams"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						Live Streams
					</Link>
					<Link
						href="#contact"
						className="text-purple-200 hover:text-white transition duration-300"
					>
						Contact
					</Link>
				</div>
			</nav>
		</header>
	);
}
