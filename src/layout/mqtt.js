import mqtt from 'mqtt';

const connectionString = {
    host : import.meta.env.VITE_CON_STR_HOST,
    port : parseInt(import.meta.env.VITE_CON_STR_PORT),
    username : import.meta.env.VITE_CON_STR_USERNAME,
    password : import.meta.env.VITE_CON_STR_PASSWORD,
    clientId : import.meta.env.VITE_CON_STR_CLIENTID+Math.random().toString(16).substr(2, 8)
}
let client = mqtt.connect(connectionString);

const topic_temp = "arec/temperature";

client.on("connect", () => {
  client.subscribe(topic_temp, (err) => {
    if (!err) {
      client.publish(topic_temp, "Hello from app");
      console.log("connected")
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
    console.log(topic, ": ", message.toString());
});


export default client;