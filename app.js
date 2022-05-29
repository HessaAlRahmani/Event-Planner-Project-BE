const express = require("express");
const eventRouts = require("./apis/event.routs");
//db
const connectDB = require("./database/connections");
const app = express();
app.use(express.json());
// routs
app.use("/api/events", eventRouts);
connectDB();
const PORT = 8002;
app.listen(PORT, () => console.log(`this app is running on port ${PORT}`));
