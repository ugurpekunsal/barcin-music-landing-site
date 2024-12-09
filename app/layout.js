import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { validateEnv } from "./utils/env";
import { TranslationsProvider } from "./hooks/useTranslations";
import localFont from "next/font/local";
import "./globals.css";

// Font configurations
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

// Metadata
export const metadata = {
	title: "Barçın Music - Blending Emotions with Melodies",
	description: "Official website of Barçın, New Age and world music artist",
};

export default async function RootLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });
	
	try {
		await supabase.auth.getSession();
	} catch (error) {
		console.error('Auth error:', error);
	}
	
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-100 text-gray-800`}>
				<TranslationsProvider>{children}</TranslationsProvider>
			</body>
		</html>
	);
}
