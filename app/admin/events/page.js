"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

export default function EventsAdmin() {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		const response = await fetch("/api/events");
		const data = await response.json();
		setEvents(data);
		setIsLoading(false);
	}

	async function updateEvent(id, newDate) {
		const response = await fetch(`/api/events/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ date: newDate }),
		});

		if (response.ok) fetchEvents();
	}

	return (
		<AdminLayout>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-6">Manage Events</h1>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className="space-y-4">
						{events.map((event) => (
							<div
								key={event.id}
								className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
							>
								<div>
									<h3 className="font-semibold">{event.title}</h3>
									<p>{new Date(event.date).toLocaleString()}</p>
								</div>
								<input
									type="datetime-local"
									value={event.date}
									onChange={(e) => updateEvent(event.id, e.target.value)}
									className="border rounded p-2"
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
