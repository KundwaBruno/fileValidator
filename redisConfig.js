const redis = require("redis");
const client = redis.createClient();

client.on("connect", (error) => {
  if (error) {
    console.log(`Error connecting to redis db :  ${error}`);
  } else {
    console.log("Redis db connected");
  }
});

module.exports = client;
