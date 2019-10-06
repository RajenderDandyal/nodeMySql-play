const express = require("express");
const router = express.Router();
const models = require("../models");
const isEmpty = require('lodash/isEmpty');


router.post('/create-user', async (req, res) => {
    try {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imageURL: req.body.imageURL,
        }
        let user = await models.User.create(newUser);
        console.log(user)

        if (user) {
            res.json(user);
        }
    } catch (e) {
        res.status(400).send({error: true, msg: "db insert error", err: e})
    }
})

router.get('/', (req, res) => {
    models.User.findAll({}).then(result => res.json(result)).catch(e => console.log(e));
    //models.Product.findAll()
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user;
        // findAll always return array
        user = await models.User.findAll({
            where: {
                id: id
            }
        })
        console.log("get by id", user);
        if (!isEmpty(user)) {
            res.json(user);
        } else {
            res.status(400).send({error: true, msg: "book not found"})
        }
    } catch (e) {
        res.status(400).send({error: true, msg: "book not found"})
    }
});

router.put('/update-user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user;
        // if no book by id we get null back from db;
        // if a book is found by id then we get the object of that book
        user = await models.User.findByPk(id);
        // findAll always return array
        /*book = await models.Product.findAll({
          where:{
            id: id
          }
        })*/
        console.log("get by id", user);
        if (!isEmpty(user)) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.imageURL = req.body.imageURL;

            let updatedUser = await user.save();
            // save method return the updated object
            console.log("save return", updatedUser);
            if (!isEmpty(updatedUser)) {
                res.json(updatedUser);
            } else {
                res.status(400).send({error: true, msg: "user not updated"})
            }
        } else {
            res.status(400).send({error: true, msg: "user not found"})
        }
    } catch (e) {
        res.status(400).send({error: true, msg: "user not found"})
    }
});

router.delete('/delete-user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user;
        user = await models.User.findByPk(id);
        console.log("delete by id", user);
        if (!isEmpty(user)) {
            let deletedUser = await user.destroy();
            // delete method return the deleted object
            console.log("delete return", deletedUser);
            if (!isEmpty(deletedUser)) {
                res.json(deletedUser);
            } else {
                res.status(400).send({error: true, msg: "book not deleted"})
            }
        } else {
            res.status(400).send({error: true, msg: "book not found"})
        }
    } catch (e) {
        res.status(400).send({error: true, msg: "book not found"})
    }
});

module.exports = router;