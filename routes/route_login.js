const express = require("express");
const User = require("../models/model_User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        //chyba serveru
        if (err)
            return res.status(500).json({
                title: "Server error",
                error: err,
            });
        //user neexistuje
        if (!user) {
            return res.status(401).json({
                title: "User not found",
                error: "Invalid credentials",
            });
        }
        //user existuje ale zadane je nespravne heslo
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: "Wrong password",
                error: "Invalid credentials",
            });
        }

        //user existuje a heslo je spravne >> prihlasenie
        let token = jwt.sign({ userID: user._id }, "secretkey");
        res.status(200).json({ title: "Login successful", token: token });
    });
});

router.get("/", (req, res, next) => {
    console.log(req.body);
});
module.exports = router;
