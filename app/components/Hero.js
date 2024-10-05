import Link from "next/link";

export default function Hero() {
	return (
		<section
			className="h-screen flex items-center justify-center bg-cover bg-center"
			style={{ backgroundImage: "url('/hero-background.jpg')" }}
		>
			<div className="text-center text-white">
				<h1 className="barcin-logo text-6xl mb-4">Barçın</h1>
				<p className="text-2xl mb-8">Blending Emotions with Melodies</p>
				<Link
					href="https://open.spotify.com/artist/6cTIJAOGc7aOxEnSnSLKhb"
					className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
				>
					Listen Now
				</Link>
			</div>
		</section>
	);
}
