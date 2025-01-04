import express from "express";
import axios from "axios";
const app = express();
import { readFileSync } from "fs"; //after finished reading the file then execute the next line
const port = 3000;
app.use(express.static("public")); 
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

const data = JSON.parse(readFileSync("./data/countries+states.json", "utf8")); //json content in javascript object syntax

app.get("/", (req, res) => {
  res.render("index", {data});
});

app.post("/", (req, res) => {
  res.send(req.body.country);
})

app.listen(port, () => {
  console.log("Running...");

});
