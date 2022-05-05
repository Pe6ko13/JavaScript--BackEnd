const express = require("express");
const hendlebars = require("express-handlebars");

const homeControler = require("./src/home");
const catalogRouter = require("./src/catalog");

const app = express();

const hbs = hendlebars.create({ extname: ".hbs" });

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: true }));
app.use("/content", express.static("static"));

app.get("/", homeControler);
app.use("/catalog", catalogRouter);

app.listen(3000);
