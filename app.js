import express from "express";
import axios from "axios";
const app = express();
import { readFileSync } from "fs"; //after finished reading the file then execute the next line
const port = 3000;
const apiURL = "https://api.openuv.io/api/v1/uv/";
const config = {
  headers: {
    "x-access-token": "apiKey",
  },
};
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const data = JSON.parse(readFileSync("./data/countries+states.json", "utf8")); //json content in javascript object syntax

app.get("/", (req, res) => {
  res.render("index", { data: data });
});

app.post("/", (req, res) => {
  const countryData = data.find((c) => c.name === req.body.country); //get the country data

  res.render("index", { cities: countryData.cities, data: data }); //send all cities in the county to index.ejs
});

app.post("/uv", async (req, res) => {
  const stateData = JSON.parse(req.body.cities);
  const lat = stateData.latitude;
  const lon = stateData.longitude;
  const response = await axios.get(`${apiURL}?lat=${lat}&lng=${lon}`, config);
  console.log(response.data.result.uv);
  res.send("UV index for your localtion is: "+response.data.result.uv);
});

app.listen(port, () => {
  console.log("Running...");
});
