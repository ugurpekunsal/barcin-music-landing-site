import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import SupportBarcin from "../components/SupportBarcin";
export default function AboutPage() {
	return (
		<>
			<Header />
			<main>
				<About />
				<SupportBarcin />
			</main>
			<Footer />
		</>
	);
}
