const express = require("express");
const router = express.Router();
const models = require("../models");
const isEmpty = require('lodash/isEmpty');


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

router.put('/update-product/:id', async (req, res)=>{
  try {
    let id = req.params.id;
    let book;
    // if no book by id we get null back from db;
    // if a book is found by id then we get the object of that book
     book = await models.Product.findByPk(id);
    // findAll always return array
    /*book = await models.Product.findAll({
      where:{
        id: id
      }
    })*/
    console.log("get by id",book);
    if(!isEmpty(book)){
        book.title = req.body.title;
        book.price = req.body.price;
        book.imageURL = req.body.imageURL;
        book.description = req.body.description;
        let updatedBook = await book.save();
        // save method return the updated object
        console.log("save return", updatedBook);
        if(!isEmpty(updatedBook)){
          res.json(updatedBook);
        }else {
          res.status(400).send({error:true, msg:"book not updated"})
        }
    } else {
      res.status(400).send({error:true, msg:"book not found"})
    }
  }catch (e) {
    res.status(400).send({error:true, msg:"book not found"})
  }
});

router.delete('/delete-product/:id', async (req, res)=>{
  try {
    let id = req.params.id;
    let book;
    book = await models.Product.findByPk(id);
    console.log("delete by id", book);
    if(!isEmpty(book)){
      let deletedBook = await book.destroy();
      // delete method return the deleted object
      console.log("delete return", deletedBook);
      if(!isEmpty(deletedBook)){
        res.json(deletedBook);
      }else {
        res.status(400).send({error:true, msg:"book not deleted"})
      }
    } else {
      res.status(400).send({error:true, msg:"book not found"})
    }
  }catch (e) {
    res.status(400).send({error:true, msg:"book not found"})
  }
});

module.exports = router;