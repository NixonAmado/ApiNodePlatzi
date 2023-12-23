const boom = require('@hapi/boom')

function validatorHandler(schema, property){
  return (req, res, next) => {
    const data = req[property]; // como la info puede venir del body o el header o un query, se implementa req[property] para que sea dinamico y me obtenga la data independientemente
    const { error } = schema.validate(data, { abortEarly: false});
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
