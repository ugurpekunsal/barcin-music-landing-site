import Image from "next/image";
import Link from "next/link";

export default function LatestRelease() {
	return (
		<section id="latest-release" className="py-16 bg-white">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold mb-8 text-center">Latest Release</h2>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<Image
						src="/memores-nostri-cover.jpg"
						alt="Memores Nostri Album Cover"
						width={300}
						height={300}
						className="rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
					/>
					<div className="text-center md:text-left">
						<h3 className="text-2xl font-semibold mb-2">Memores Nostri</h3>
						<p className="mb-4">
							Experience Barcın&apos;s latest emotional journey through sound.
						</p>
						<Link
							href="https://open.spotify.com/album/your-album-id"
							className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
						>
							<svg
								className="fill-current w-4 h-4 mr-2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
							</svg>
							Play on Spotify
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
