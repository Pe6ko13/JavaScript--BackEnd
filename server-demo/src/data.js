const fs = require("fs").promises;

async function getProducts() {
  const data = JSON.parse(
    (await fs.readFile("./data/products.json")).toString()
  );

  return Object.entries(data).map(([id, item]) =>
    Object.assign({}, item, { _id: id })
  );
}

module.exports = {
  getProducts,
};
