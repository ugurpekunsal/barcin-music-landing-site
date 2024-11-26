export class RateLimit {
  constructor() {
    this.requests = new Map();
  }

  async check(ip, limit = 5, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    this.requests.forEach((timestamps, key) => {
      const filtered = timestamps.filter(time => time > windowStart);
      if (filtered.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, filtered);
      }
    });

    // Get/create timestamps for this IP
    const timestamps = this.requests.get(ip) || [];
    const recentRequests = timestamps.filter(time => time > windowStart);

    if (recentRequests.length >= limit) {
      return false;
    }

    this.requests.set(ip, [...recentRequests, now]);
    return true;
  }
} 