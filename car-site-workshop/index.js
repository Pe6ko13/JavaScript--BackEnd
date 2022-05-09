const express = require("express");
const hbs = require("express-handlebars");

const carService = require("./services/cars");

const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");

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
app.use(carService());

app.get("/", home);
app.get("/about", about);

// app.route("/create").get(create.get).post(create.post);
app.get("/create", create.get);
app.post("/create", create.post);

app.get("/details/:id", details);
app.all("*", notFound);

app.listen(3000, () => console.log("server running"));
