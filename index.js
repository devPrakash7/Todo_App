
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

//All midddleware\
app.use(express.json());
app.use(require("./Routes/rout"))

// mongoDb connnected
mongoose
    .connect("mongodb+srv://root:akki909@cluster0.sm3rshd.mongodb.net/Todo_list", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("running port........");
    })
    .catch((error) => {

        console.log(error);
    });


// my Port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));