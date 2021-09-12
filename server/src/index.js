//IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const newsRouters = require("./routers/newsRouter");
const userRoutes = require("./routers/index");
const reserveRoutes = require("./routers/reserve");
const vetRoutes = require("./routers/vet");
const swaggerJsdoc = require('./swaggerJsdoc')
var cors = require("cors");
require("./auth/auth");
app.use(cors()); // Use this after the variable declaration

const PORT = 4000;

const MONGO_URI = "mongodb://127.0.0.1:27017/midas-consultores";
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(express.json());

app.use(newsRouters);
app.use(userRoutes);
app.use(reserveRoutes);
app.use(vetRoutes);
app.use(swaggerJsdoc);
app.listen(PORT, () => console.log("Starting app in port",PORT));
