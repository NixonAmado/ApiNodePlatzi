const express = require('express');
const validatorHandler = require('./../Middlewares/validator_handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../Schemas/product_schema')


const router = express.Router();
const productService = require('./../Services/product_service');
const service = new productService();

router.get("/", async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req ,res, next ) => {
  try {   
    const { id } =  req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error)
  }})

router.get("./products/:name", (req,res) =>{
  const { name } = res.params;
  res.json(
    {
    id,
    name: "tv",
    price: 2000
  })
})

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  res.status(201).json(await service.create(body));
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next ) => {
  try {
    const {id } = req.params;
    const body = req.body;
    res.json({
      message: "It has been editated successfully",
      data: await service.update(id,body),
      id,
    })
    
  } catch (error) {
    next(error);
  };
  })

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    message: "It has been put successfully",
    data : body,
    id,
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
