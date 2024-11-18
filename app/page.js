import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestRelease from "./components/LatestRelease";
import MusicSection from "./components/MusicSection";
import About from "./components/About";
import LiveStreams from "./components/LiveStreams";
import Footer from "./components/Footer";
import MailingList from "./components/MailingList";

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
