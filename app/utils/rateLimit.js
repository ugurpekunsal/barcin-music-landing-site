export class RateLimit {
  constructor(options) {
    this.requests = new Map();
    this.windowMs = options.windowMs || 60000; // 1 minute default
    this.max = options.max || 5; // 5 requests per window default
  }

  async check(ip) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Clean old requests
    this.requests.forEach((timestamp, key) => {
      if (timestamp < windowStart) {
        this.requests.delete(key);
      }
    });

    // Get existing requests for this IP
    const requestTimestamps = this.requests.get(ip) || [];
    const recentRequests = requestTimestamps.filter(time => time > windowStart);

    if (recentRequests.length >= this.max) {
      return false;
    }

    // Add new request
    this.requests.set(ip, [...recentRequests, now]);
    return true;
  }
} 