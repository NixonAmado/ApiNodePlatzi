const express = require('express');
const router = express.Router();

router.get('/:categoryId/products/:productId',(req, res) => {
  const {caategoryId, productId} = req.params;
  res.json({
    id,
    name: "product 2",
    price: 2000
  });
})

router.get('/', (req, res) =>{
    res.json([{
      id : 1,
      name: "electrodomesticos",
      price: 2000
    },
    {
      id : 2,
      name: "frutas ",
      price: 2000
    }]);
})

module.exports = router;
