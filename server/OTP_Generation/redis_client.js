const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("REDIS_URL not set in .env file");
  process.exit(1);
}

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("❌ Could not connect to Redis:", err);
    process.exit(1); // Optional: shut down the app if Redis is critical
  }
})();

module.exports = redisClient;
