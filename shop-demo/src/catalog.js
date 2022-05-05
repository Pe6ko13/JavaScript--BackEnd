const router = require("express").Router();
const { getProducts, createProduct, getProductById } = require("./data");

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.locals = {
    title: "Catalog",
    products,
  };
  res.render("catalog");
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    promoted: req.body.promote ? true : false,
  };
  await createProduct(product);

  res.redirect("/catalog");
});

router.get("/edit/:id", async (req, res) => {
  const product = await getProductById(req.params.id);

  res.render("edit", product);
});

module.exports = router;
