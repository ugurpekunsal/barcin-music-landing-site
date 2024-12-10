"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "../../hooks/useTranslations";
import { useState, useEffect } from "react";

export default function LatestRelease() {
	const { t } = useTranslations();
	const [latestAlbum, setLatestAlbum] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchLatestAlbum();
	}, []);

	async function fetchLatestAlbum() {
		try {
			const response = await fetch('/api/albums');
			if (!response.ok) throw new Error('Failed to fetch albums');
			const data = await response.json();
			const latest = data.find(album => album.is_latest);
			setLatestAlbum(latest);
		} catch (err) {
			console.error('Error fetching latest album:', err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<section className="py-16 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="section-heading">{t("latestRelease")}</h2>
					<div className="flex justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
					</div>
				</div>
			</section>
		);
	}

	if (!latestAlbum) return null;

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-6">
				<h2 className="section-heading">{t("latestRelease")}</h2>
				<div className="max-w-2xl mx-auto text-center">
					<Link
						href={latestAlbum.spotify_link}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block transition transform hover:scale-105"
					>
						<Image
							src={latestAlbum.cover_url}
							alt={`${latestAlbum.title} Album Cover`}
							width={300}
							height={300}
							className="rounded-lg shadow-lg mx-auto"
						/>
						<p className="mt-4 text-xl font-semibold">{latestAlbum.title}</p>
					</Link>
					<div className="mt-6">
						<Link
							href={latestAlbum.spotify_link}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
						>
							{t("listenOnSpotify")}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
