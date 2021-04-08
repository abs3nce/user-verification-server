//IMPORT PACKAGOV
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//dotenv na prepojenie .env s tymto filom aby tu nemusel byt napisany link na DB
require("dotenv/config");

//IMPORT ROUTOV
const registerRoute = require("./routes/route_register");
const loginRoute = require("./routes/route_login");
const userRoute = require("./routes/route_user");
const usersRoute = require("./routes/route_users");

//PRIPOJENIE NA DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("> Connected to DB");
});

//ZAPNUTIE EXPRESSU A NASLEDNE POUZIVANIE CEZ APP
const app = express();

//MIDDLEWARE AKO CORS A BODYPARSER
app.use(cors());
app.use(express.json());

//POKIAL JE REQUEST NA NIZSIE UVEDENE URLs TAK PRESMERUJ NA routes/route
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/users", usersRoute);

//NASTAVENIE PORTU
port = process.env.port || 3000;

//ZAPNUTIE SERVERU A LISTEN NA port
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`> Server running on port: ${port}`);
});
