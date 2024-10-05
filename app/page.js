import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestRelease from "./components/LatestRelease";
import MusicSection from "./components/MusicSection";
import About from "./components/About";
import LiveStreams from "./components/LiveStreams";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<LatestRelease />
				<MusicSection />
				<About />
				<LiveStreams />
			</main>
			<Footer />
		</>
	);
}
