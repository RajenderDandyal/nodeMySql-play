const express = require("express");
const router = express.Router();
const models = require("../models");
const isEmpty = require('lodash/isEmpty');

router.get('/', (req, res)=>{
  models.Product.findAll({}).then(result => res.json(result)).catch(e=>console.log(e));
    //models.Product.findAll()
});

router.get('/:id', async (req, res)=>{
  try {
    let id = req.params.id;
    let book;
    // if no book by id we get null back from db;
    // if a book is found by id then we get the object of that book
    // book = await models.Product.findByPk(id);
    // findAll always return array
    book = await models.Product.findAll({
      where:{
        id: id
      }
    })
    console.log("get by id",book);
    if(!isEmpty(book)){
      res.json(book);
    } else {
      res.status(400).send({error:true, msg:"book not found"})
    }
  }catch (e) {
    res.status(400).send({error:true, msg:"book not found"})
  }
});

router.post('/create-product', async (req, res)=>{
  try {
    let newBook = {
      title: req.body.title,
      price: req.body.price,
      imageURL: req.body.imageURL,
      description: req.body.description
    }
    let book = await models.Product.create(newBook)
    if(book){
      console.log(book)
      res.json(book);
    }
  }catch (e) {
    res.status(400).send({error:true, msg:"db insert error"})
  }
})

module.exports = router;