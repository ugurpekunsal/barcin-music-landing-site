"use client";

import { useState, useEffect } from 'react';

export default function TwitchPlayer({ channel }) {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Twitch embed script is blocked
    const timeout = setTimeout(() => {
      if (!window.Twitch) {
        setError('Twitch player failed to load. Please disable ad blocker for this site.');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-600">
            Watch live at{' '}
            <a 
              href={`https://twitch.tv/${channel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800"
            >
              twitch.tv/{channel}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
      {!isPlayerLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      )}
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
        frameBorder="0"
        allowFullScreen
        scrolling="no"
        className="absolute top-0 left-0 w-full h-full"
        onLoad={() => setIsPlayerLoaded(true)}
      />
    </div>
  );
} 