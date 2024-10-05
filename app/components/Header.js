import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-purple-100 bg-opacity-80 fixed w-full z-10">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<Link href="/" className="barcin-logo text-4xl text-purple-800">
					Barçın
				</Link>
				<div className="flex space-x-4">
					<Link href="/" className="text-purple-800 hover:text-purple-600">
						Home
					</Link>
					<Link href="#music" className="text-purple-800 hover:text-purple-600">
						Music
					</Link>
					<Link href="#about" className="text-purple-800 hover:text-purple-600">
						About
					</Link>
					<Link
						href="#live-streams"
						className="text-purple-800 hover:text-purple-600"
					>
						Live Streams
					</Link>
					<Link
						href="#contact"
						className="text-purple-800 hover:text-purple-600"
					>
						Contact
					</Link>
				</div>
			</nav>
		</header>
	);
}
