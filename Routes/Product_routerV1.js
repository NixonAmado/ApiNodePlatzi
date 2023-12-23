const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res)=> {
  const products = [];
  const { size } = req.query;
  const limit = size > 10 ? 10 : size;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);

})

module.exports = router;
