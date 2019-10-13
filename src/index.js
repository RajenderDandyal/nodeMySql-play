const express = require("express");
const sequelize = require('./utils/db');
const app = express();
const models = require("./models");
const product = require('./routes/product');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/product', product);
app.use('/api/user', require('./routes/user'));
// route not found
app.use((req, res) => {
  let responseObj = {
    status: 404,
    message: 'Invalid route',
    error: { error: true, message: 'route not found', status: 404 },
  };
  res.status(404).json(responseObj);
  //next(error);
});
// log errors to console
app.use(logErrors);
//
app.use(clientErrorHandler);
app.use((error, req, res) => {
  res.status(error.status || 500);
  return res.json({
    status: error.status || 500,
    message: error.message,
    error: {
      error: error.message,
    },
  });
});

// log errors to console
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
// error handling for xhr request
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    //console.log('xhr request');
    res.status(400).send({
      status: 400,
      message: 'Bad request from client',
      error: err.message,
    });
  } else {
    next(err);
  }
}
// product & user associations
models.Product.belongsTo(models.User, {constraints: true, onDelete: 'CASCADE'});
models.User.hasMany(models.Product);

// cart & user associations
models.Cart.belongsTo(models.User, {constraints: true, onDelete: 'CASCADE'});
models.User.hasOne(models.Cart);

// cart & product associations
models.Cart.belongsToMany(models.Product, {through: models.CartItem});
models.Product.belongsToMany(models.Cart, {through: models.CartItem});

let port = process.env.PORT || 8083;
models.sequelize.sync({force: false})
  .then(res =>{
    console.log(res)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      console.log(`connected to db`);
    });
  })
  .catch(err=>{
    console.log(`connection error`);
  });

