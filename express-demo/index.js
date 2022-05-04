const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

const hbs = handlebars.create({ extname: ".hbs" });

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

let visitors = 0;

const products = [
  { name: "oats", price: 2 },
  { name: "wheat", price: 5 },
  { name: "corn", price: 7, promoted: true },
];

app.get("/", (req, res) => {
  // res.locals = {
  //     count: ++visitors,
  // }
  res.render("home", {
    count: visitors++,
    user: {
      username: "Peter",
      email: "peter@abv.bg",
    },
  });
});

app.get("/catalog", (req, res) => {
  res.locals = {
    products,
  };
  res.render("catalog");
});

app.all("*", (req, res) => {
  res.send("404 Not Found Page");
}); // For 404 page usually

app.listen(3000);
