const http = require("http");
const fs = require("fs");
const { get, post, match } = require("./src/router");
const { home } = require("./src/controllers/home");
const { catalog } = require("./src/controllers/catalog");

get("/", home);
get("/catalog", catalog);

http
  .createServer((req, res) => {
    if (req.url.startsWith("/public")) {
      fs.createReadStream(`./static/${req.url.slice(8)}`).pipe(res);
    } else {
      match(req, res);
    }
  })
  .listen(3000);
