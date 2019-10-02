const express = require("express");
const sequelize = require('./utils/db');
const app = express();
const models = require("./models");
const product = require('./routes/product');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/product', product);
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

let port = process.env.PORT || 8081;
models.sequelize.sync()
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

