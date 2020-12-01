const express = require("express");
const axios = require("axios");

const app = express();
const apiKey = process.env.API_KEY;

app.get("*", (req, res, next) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  next();
});

app.get("/cats/random", (req, res) => {
  axios.get("https://api.thecatapi.com/v1/images/search").then((result) => {
    console.log(result.data);
    res.json(result.data);
  });
});

app.get("/cats/breeds", (req, res) => {
  axios
    .get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((result) => {
      console.log(result.data.length);
      res.json(result.data);
    });
});

module.exports = app;
