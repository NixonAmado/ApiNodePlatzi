const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor(){
    this.products = [];
    this.generate();

  }

  generate( ){
    //const { size } = req.query;
    //const limit = size > 5 ? 5 : size;
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id : faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create ( data ){
    const newProduct = {
      ...data
    }
    this.products.push(newProduct);
    return newProduct;

  }
  find (){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }
  async findOne ( id ){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product

  }
  async update (id, changes){
    var index = this.products.findIndex(item => item.id === id);
    if(index === -1)
    {
      throw boom.notFound('product not found');
    }
    const  product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }
  async delete (id){
    const index = this.products.findIndex(item => item.id  === id);
    if(index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return{id};
  }
}

module.exports = ProductService;
