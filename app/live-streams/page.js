import Header from "../components/Header";
import Footer from "../components/Footer";
import LiveStreams from "../components/LiveStreams";

export default function LiveStreamsPage() {
	return (
		<>
			<Header />
			<main>
				<LiveStreams />
			</main>
			<Footer />
		</>
	);
}
