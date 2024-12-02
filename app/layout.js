import { validateEnv } from "./utils/env";
import { TranslationsProvider } from "./hooks/useTranslations";
import localFont from "next/font/local";
import "./globals.css";

// Validate environment variables during initialization
if (process.env.NODE_ENV !== "development") {
	validateEnv();
}

const geistSans = localFont({
	src: "../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Barçın Music - Blending Emotions with Melodies",
	description: "Official website of Barçın, New Age and world music artist",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-100 text-gray-800`}
			>
				<TranslationsProvider>{children}</TranslationsProvider>
			</body>
		</html>
	);
}
