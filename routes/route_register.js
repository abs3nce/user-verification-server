const express = require("express");
const User = require("../models/model_User");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
    //zapisanie udajov z reg. formularu do objektu newUser s tym ze heslo zahashujeme
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    console.log(newUser);

    //ulozenie tohoto newUser do DB
    newUser.save((err) => {
        //ak nastane error pri ukladani >> username alebo email uz existuje
        //to je nastavene podla modelu User kde je zadefinovane ze tieto dva udaje musia byt jedinecne
        if (err) {
            return res.status(400).json({
                title: "Username or email already exists",
                error: err,
                user: newUser,
            });
        }

        //
        return res.status(200).json({
            title: "Registration successful",
            user: newUser,
        });
    });
});

module.exports = router;
