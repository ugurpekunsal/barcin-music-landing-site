import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-purple-800 text-white py-8">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p>&copy; 2024 Barçın Music. All rights reserved.</p>
					</div>
					<div className="flex space-x-4">
						<Link
							href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
							className="hover:text-purple-300"
						>
							Spotify
						</Link>
						<Link
							href="https://www.instagram.com/barcin.music/?hl=en"
							className="hover:text-purple-300"
						>
							Instagram
						</Link>
						<Link
							href="https://www.youtube.com/channel/UCF5wHhTHEi1FEGY6gElSEmA"
							className="hover:text-purple-300"
						>
							YouTube
						</Link>
						<Link
							href="https://www.twitch.tv/barcinmusic"
							className="hover:text-purple-300"
						>
							Twitch
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
