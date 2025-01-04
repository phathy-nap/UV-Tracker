import express from "express";
import axios from "axios";
const app = express();
import { readFileSync } from "fs"; //after finished reading the file then execute the next line
const port = 3000;
const apiURL = "https://api.openuv.io/api/v1/uv";
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
  const lat = req.body.cities.latitude;
  const lon = req.body.longitude;
  console.log(lat);
  res.send(req.body.cities)
  // const response = await axios.get(`${apiURL}?lat=`);
  // res.redirect("/")
});


app.listen(port, () => {
  console.log("Running...");
});
