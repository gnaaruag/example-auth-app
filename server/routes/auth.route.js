const express = require('express');
const app = express();
const route = express.Router();

const {onboardUser, verifyLogin} = require("../controllers/auth.controller");

const authmiddleware = require("../middleware/isAuth")

route.post('/signup', onboardUser);
route.post('/login', verifyLogin);
route.get('/test', authmiddleware, (req,res)=>{
    res.send('session auth implemented');
});

module.exports = route;