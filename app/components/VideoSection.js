"use client";

import { useTranslations } from "../hooks/useTranslations";
import { useState } from "react";

export default function VideoSection() {
	const { t } = useTranslations();
	const [activeVideo, setActiveVideo] = useState(1);

	const videos = [
		{ id: 1, src: "/videos/video-1.mp4", title: t("video1Title") },
		{ id: 2, src: "/videos/video-2.mp4", title: t("video2Title") },
		{ id: 3, src: "/videos/video-3.mp4", title: t("video3Title") },
	];

	return (
		<section className="py-16 bg-gradient-to-b from-purple-100 to-white">
			<div className="container mx-auto px-6">
				<h2 className="text-4xl font-bold mb-12 text-center text-purple-800">
					{t("watchBarcinPerform")}
				</h2>
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="md:col-span-2">
							<div className="aspect-w-16 aspect-h-9 bg-black rounded-lg shadow-lg overflow-hidden">
								<video
									key={activeVideo}
									controls
									className="w-full h-full object-cover"
									autoPlay
								>
									<source src={videos[activeVideo - 1].src} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>
							<p className="mt-4 text-center text-gray-600 font-semibold">
								{videos[activeVideo - 1].title}
							</p>
						</div>
						<div className="space-y-4">
							{videos.map((video) => (
								<div
									key={video.id}
									className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
										activeVideo === video.id
											? "bg-purple-600 text-white shadow-md transform scale-105"
											: "bg-purple-100 hover:bg-purple-200"
									}`}
									onClick={() => setActiveVideo(video.id)}
								>
									<h3 className="font-semibold mb-2">{video.title}</h3>
									<p className="text-sm">{t(`video${video.id}Description`)}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
