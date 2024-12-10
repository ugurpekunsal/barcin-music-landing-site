"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "../../hooks/useTranslations";
import { useState, useEffect } from "react";
import SpotifyStats from '../SpotifyStats';

export default function MusicSection({ showMap = false }) {
	const { t } = useTranslations();
	const [albums, setAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchAlbums();
	}, []);

	async function fetchAlbums() {
		try {
			const response = await fetch('/api/albums');
			if (!response.ok) throw new Error('Failed to fetch albums');
			const data = await response.json();
			setAlbums(data);
		} catch (err) {
			console.error('Error fetching albums:', err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<section id="music" className="py-16 mt-20 bg-purple-100">
				<div className="container mx-auto px-6">
					<h2 className="section-heading">{t("music")}</h2>
					<div className="flex justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="music" className="py-16 mt-20 bg-purple-100">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("music")}</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{albums.map((album) => (
						<Link
							key={album.id}
							href={album.spotify_link}
							target="_blank"
							rel="noopener noreferrer"
							className="transition transform hover:scale-105"
						>
							<Image
								src={album.cover_url}
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
			{showMap && <SpotifyStats showMap={showMap} />}
		</section>
	);
}
