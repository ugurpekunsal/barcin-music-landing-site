import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MusicSection from "../../components/MusicSection";
import VideoSection from "../../components/VideoSection";

export default function MusicPage() {
	return (
		<>
			<Header />
			<main>
				<MusicSection />
				<VideoSection />
			</main>
			<Footer />
		</>
	);
}
