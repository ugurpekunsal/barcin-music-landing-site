"use client";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import LiveStreams from "../../components/sections/LiveStreams";
import CommunitySection from "../../components/sections/CommunitySection";

export default function LivePage() {
	return (
		<>
			<Header />
			<main>
				<LiveStreams />
				<CommunitySection />
			</main>
			<Footer />
		</>
	);
}
