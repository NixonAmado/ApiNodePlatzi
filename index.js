const express = require('express');
const routerApi = require('./Routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./Middlewares/error_handler');
const app = express();
const cors = require('cors');
const port = 3000;


app.use(express.json());//midware para atrapar los datos del post

routerApi(app);
const whitelist = ['http://localhost:8000', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
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
  console.log("Mi port", port);
})











//dependencias de desarrollo
// npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -d
//dependecias de produccion
//npm i express
