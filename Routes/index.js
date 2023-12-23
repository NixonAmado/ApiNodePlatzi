const express = require('express');
const productsRouter = require("./product_router");
const categoriesRouter = require("./category_router");
const usersRouter = require("./user_router");
const productsV1Router = require('./Product_routerV1');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);

  // const routerV1 = express.Router();
  // app.use('/api/v1/', routerV1);
  // router.use('products', productsV1Router);
}

module.exports = routerApi;
