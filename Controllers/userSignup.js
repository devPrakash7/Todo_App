
const mongoose = require("mongoose");
const userModel = require("../Models/userSignup");
const validator = require("../validations/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


  const SingUp = async(req,res) => {

     try{

        const reqBody = req.body;
        if (!validator.isValidRequestBody(reqBody)) {
            return res.status(400).send({
              status: false,
              message: "Invalid request parameter",
            });
          }
      
        const {userName , Email , password} = reqBody;


        if (!validator.isValid(userName)) {
            return res
              .status(400)
              .send({ status: false, message: "useName is required"});
          }

          if (!validator.isValid(Email)) {
            return res
              .status(400)
              .send({ status: false, message: "Email is required"});
          };

          if (!validator.isValid(password)) {
            return res
              .status(400)
              .send({ status: false, message: "password is required"});
          };
        
        
          const duplicateEmail = await userModel.findOne({Email:Email});
          if (duplicateEmail) {
            return res.status(400).send({
              status: false,
              message: `${Email} email address is already registered`,
            });
          }

          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            res
              .status(400)
              .send({
                status: false,
                message: `Email should be a valid email address`,
              });
            return;
          }
        const saltRound = 10;
        reqBody.password = await bcrypt.hash(password , saltRound);
          
        const user = await userModel.create(reqBody);
        return res.status(201).send({data:user});

     }catch(err){

        return res.status(500).send({error: err.message});
     }
};

const Login = async(req,res) => {

    try {
        let reqBody = req.body;

        //Extract Params
        let { Email, password } = reqBody;

        if (!validator.isValidRequestBody(reqBody)) {
            return res.status(400).send({ status: false, message: "Invalid request body. Please provide the the input to proceed" })
        }
        //Validation start
        if (!validator.isValid(Email)) {
            return res.status(400).send({ status: false, message: "Please enter an email address." })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password." })
        }

        let user = await userModel.findOne({ Email });
        if (!user)
            return res.status(400).send({ status: false, message: "Login failed! Email  is incorrect." });

        let passwordInBody = user.password;
        let encryptPassword = await bcrypt.compare(password, passwordInBody);

        if (!encryptPassword) return res.status(400).send({ status: false, message: "Login failed! password is incorrect." });
        //Validation End

        let userId = user._id
        // create token
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
            },
            'prakash123'
        )

        res.status(200).send({ status: true, message: 'Success', userId: { userId, token } });

    } catch (err) {
        res.status(500).send({ message: "Server not responding", error: err.message });
    }
}

module.exports = {SingUp,Login};