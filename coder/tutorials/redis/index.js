import express from "express";
import redis from "redis";

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const redis_port = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  url: "redis://awesome.redis.server:6380",
});
await redisClient.connect();

app.get(`/repos/:name`, async function (req, res, next) {
  const getDataRedis = await redisClient.get("posts");
  if (getDataRedis) {
    return res.send(JSON.parse(getDataRedis));
  }

  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (response) => response.json()
  );
  await redisClient.set("posts", JSON.stringify(resp));
  res.send(resp);
});
