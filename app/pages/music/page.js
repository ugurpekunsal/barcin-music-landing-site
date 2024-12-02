import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import MusicSection from "../../components/sections/MusicSection";
import VideoSection from "../../components/sections/VideoSection";

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
