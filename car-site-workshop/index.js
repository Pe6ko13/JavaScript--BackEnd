const express = require("express");
const hbs = require("express-handlebars");
const { home } = require("./controllers/home");

const app = express();

// const handlebars = hbs.create({extname: '.hbs'})

app.engine(
  "hbs",
  hbs.create({
    extname: ".hbs",
  }).engine
);
app.set("view engine", "hbs");

app.use(express.urlencoded({ extanded: true }));
app.use("/static", express.static("static"));

app.get("/", home);

app.listen(3000, () => console.log("server running"));
