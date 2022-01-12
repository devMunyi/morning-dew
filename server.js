require("dotenv").config();
const express = require("express");
const port = process.env.PORT || process.env.SERVER_LOCAL_PORT;
const app = express();
const path = require('path');

app.use(express.json());

const dbConfig = require("./db");
const roomsRoute = require("./api/routes/roomsRoute");
const usersRoute = require("./api/routes/userRoute");
const bookingsRoute = require("./api/routes/bookingsRoute");


app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);
app.use("/bookings", bookingsRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
