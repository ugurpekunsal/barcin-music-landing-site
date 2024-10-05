import Image from "next/image";
import Link from "next/link";

const albums = [
	{
		title: "Memores Nostri",
		cover: "/memores-nostri-cover.jpg",
		link: "https://open.spotify.com/album/your-album-id-1",
	},
	{
		title: "Bitter",
		cover: "/bitter-cover.jpg",
		link: "https://open.spotify.com/album/your-album-id-2",
	},
	{
		title: "İnan",
		cover: "/inan-cover.jpg",
		link: "https://open.spotify.com/album/your-album-id-3",
	},
	{
		title: "Pure Melancholy",
		cover: "/pure-melancholy-cover.jpg",
		link: "https://open.spotify.com/album/your-album-id-4",
	},
];

export default function MusicSection() {
	return (
		<section id="music" className="py-16 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold mb-8 text-center">Music</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{albums.map((album, index) => (
						<Link
							key={index}
							href={album.link}
							className="transition transform hover:scale-105"
						>
							<Image
								src={album.cover}
								alt={`${album.title} Album Cover`}
								width={250}
								height={250}
								className="rounded-lg shadow-lg"
							/>
							<p className="mt-2 text-center font-semibold">{album.title}</p>
						</Link>
					))}
				</div>
				<div className="text-center mt-8">
					<Link
						href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
					>
						View All on Spotify
					</Link>
				</div>
			</div>
		</section>
	);
}
