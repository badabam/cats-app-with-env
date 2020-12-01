const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

const apiKey = process.env.API_KEY;
console.log("apiKey", apiKey);

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

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
