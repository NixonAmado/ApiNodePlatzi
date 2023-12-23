const express = require('express');
const routerApi = require('./Routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./Middlewares/error_handler');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
//http://localhost:3000/api/v1/products

app.use(express.json());//midware para atrapar los datos del post

routerApi(app);
const whitelist = ['http://localhost:8000', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log("http://localhost:", port);
})











//dependencias de desarrollo
// npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -d
//dependecias de produccion
//npm i express
