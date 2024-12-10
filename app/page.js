import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import LatestRelease from "./components/sections/LatestRelease";
import MusicSection from "./components/sections/MusicSection";
import About from "./components/sections/About";
import LiveStreams from "./components/sections/LiveStreams";
import MailingList from "./components/sections/MailingList";

export default function Home() {
	return (
		<main>
			<Header />
			<Hero />
			<LatestRelease />
			<MusicSection />
			<About />
			<MailingList />
			<LiveStreams />
			<Footer />
		</main>
	);
}
