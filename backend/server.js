const express = require("express");
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loadModels } = require("./controllers/imageSimilarity");
const { createCanvas, Image, Canvas } = require("canvas");
const faceapi = require("face-api.js");
const { fetchImage } = require("face-api.js");
// const fetch = require("node-fetch");

// faceapi.env.monkeyPatch({ fetch });

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// loadModels().then();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server is listening at the port ${port}`));
