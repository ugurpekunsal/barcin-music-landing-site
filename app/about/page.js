import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import VideoSection from "../components/VideoSection";

export default function AboutPage() {
	return (
		<>
			<Header />
			<main>
				<About />
				<VideoSection />
			</main>
			<Footer />
		</>
	);
}
