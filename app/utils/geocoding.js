const OPENCAGE_API_URL = 'https://api.opencagedata.com/geocode/v1';

export async function geocode(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      key: process.env.OPENCAGE_API_KEY,
      limit: 1,
      no_annotations: 1
    });

    const response = await fetch(`${OPENCAGE_API_URL}/json?${params}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Geocoding request failed');

    const data = await response.json();
    if (!data.results?.length) {
      throw new Error('No results found');
    }

    const result = data.results[0];
    return {
      lat: result.geometry.lat,
      lng: result.geometry.lng,
      formatted: result.formatted,
      components: {
        country: result.components.country,
        city: result.components.city || result.components.town || result.components.village,
        state: result.components.state,
        country_code: result.components.country_code?.toUpperCase()
      },
      confidence: result.confidence
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function reverseGeocode(lat, lng) {
  try {
    const params = new URLSearchParams({
      q: `${lat},${lng}`,
      key: process.env.OPENCAGE_API_KEY,
      limit: 1,
      no_annotations: 1
    });

    const response = await fetch(`${OPENCAGE_API_URL}/json?${params}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Reverse geocoding request failed');

    const data = await response.json();
    if (!data.results?.length) {
      throw new Error('No results found');
    }

    const result = data.results[0];
    return {
      lat,
      lng,
      formatted: result.formatted,
      components: {
        country: result.components.country,
        city: result.components.city || result.components.town || result.components.village,
        state: result.components.state,
        country_code: result.components.country_code?.toUpperCase()
      }
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
} 