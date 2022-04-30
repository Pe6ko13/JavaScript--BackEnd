const fs = require("fs").promises;

async function readFile() {
  const data = JSON.parse(
    (await fs.readFile("./data/products.json")).toString()
  );
  return data;
}

async function getProducts() {
  const data = await readFile();

  return Object.entries(data).map(([id, item]) =>
    Object.assign({}, item, { _id: id })
  );
}

async function createProduct(product) {
  const data = await readFile();

  const _id = nextId();

  data[_id] = product;

  await fs.writeFile("./data/products.json", JSON.stringify(data, null, 2));
}

function nextId() {
  return "xxxxxxxx".replace(/x/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}

module.exports = {
  getProducts,
  createProduct,
};
