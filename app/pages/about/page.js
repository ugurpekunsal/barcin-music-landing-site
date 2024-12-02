import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import About from "../../components/sections/About";
import SupportBarcin from "../../components/sections/SupportBarcin";
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
