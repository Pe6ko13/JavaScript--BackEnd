const { getProducts } = require("../data");
const { loadFragment, render } = require("../view");

module.exports = {
  async catalog(req, res) {
    const products = await getProducts();
    loadFragment("catalog", (fragment) => {
      const result = fragment.replace(
        "{{{items}}}",
        products.map((p) => `<li>${p.name} - ${p.price}</li>`).join(" ")
      );
      res.html(render(result, "Catalog"));
    });
  },
  create(req, res) {},
};
