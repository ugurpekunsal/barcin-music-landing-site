import Link from "next/link";

export default function About() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold">About Barcin Music</h1>
			<p>
				Here&apos;s where you can add information about your friend and her
				music.
			</p>
			<Link href="/" className="text-blue-500 hover:underline">
				Back to Home
			</Link>
		</main>
	);
}
