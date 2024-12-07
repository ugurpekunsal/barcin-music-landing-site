"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "../../hooks/useTranslations";

const albums = [
	{
		title: "Memores Nostri",
		cover: "/images/memores-nostri-cover.jpg",
		link: "https://open.spotify.com/album/56rSfAxXbHdmsMD0hoqDgP?si=z_qq-X6DRDGxRyP-GSv7HQ",
	},
	{
		title: "Bitter",
		cover: "/images/bitter-cover.png",
		link: "https://open.spotify.com/album/1BYvgKXvNxnWwtt6NyBBz3?si=Oc_CzVKPQOeyM77MOfmqmw",
	},
	{
		title: "İnan",
		cover: "/images/inan-cover.png",
		link: "https://open.spotify.com/album/4OGKoI017XPRVMUczxOWW6?si=5CqEWgYwTZeMmLiIiPXjQw",
	},
	{
		title: "Pure Melancholy",
		cover: "/images/pure-melancholy-cover.png",
		link: "https://open.spotify.com/album/https://open.spotify.com/album/7A0SYBDUZDGWC64NPLsgNU?si=Sy3snsAnRPuLF0vetbym4Q",
	},
];

export default function MusicSection() {
	const { t } = useTranslations();

	return (
		<section id="music" className="py-16 mt-20 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("music")}</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{albums.map((album, index) => (
						<Link
							key={index}
							href={album.link}
							target="_blank"
							rel="noopener noreferrer"
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
						target="_blank"
						rel="noopener noreferrer"
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
					>
						{t("viewAllOnSpotify")}
					</Link>
				</div>
			</div>
		</section>
	);
}
