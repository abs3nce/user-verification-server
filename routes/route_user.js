const express = require("express");
const User = require("../models/model_User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
    let token = req.headers.token; // ziskanie tokenu usera z frontendu
    jwt.verify(token, "secretkey", (err, decoded) => {
        //token nie je valid >> user nie je spravne prihlaseny lebo nema spravny overeny token
        if (err) return res.status(401).json({ title: "Unauthorized user" });

        //token je valid >> user je autorizovany vidiet svoje udaje
        User.findOne({ _id: decoded.userID }, (err, user) => {
            if (err) return res.status(401).json({ title: "User not found" });
            return res.status(200).json({
                title: "Grabbed user info",
                user: {
                    username: user.username,
                    email: user.email,
                },
            });
        });
    });
});

module.exports = router;
