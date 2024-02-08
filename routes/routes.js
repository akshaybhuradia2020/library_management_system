import jwt from 'jsonwebtoken';
import { Router } from "express";

import { CONFIGURATION } from '../utility/const.js'
import { registration } from "../middlewares/registration.js";
import { login } from "../middlewares/login.js";
import { addbooks } from "../middlewares/addbooks.js";
import { getbooks } from "../middlewares/getbooks.js";
import { borrowbook, returnbook, getuser_borrowed_books } from '../middlewares/bookstatus.js';
import { verifyToken } from '../middlewares/auth.js';

export const routes = Router();

routes.post("/books", [verifyToken, addbooks], function(req, res){
    if(res.locals.data === true){
        res.status(201).json({message: "Book is added"});
    }
    else{
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

routes.get("/books", [verifyToken, getbooks], function(req, res){
    if(res.locals.data){
        res.status(200).json({result: res.locals.data});
    }
    else{
        res.status(500).json({result: null});
    }
});

routes.get("/books/:id", [verifyToken, getbooks], function(req, res){
    if(res.locals.data){
        res.status(200).json({result: res.locals.data});
    }
    else{
        res.status(500).json({result: null});
    }
});

routes.post("/users", [registration], function(req, res, next){
    if(res.locals.check === false){
        res.status(409).json({message:"USER IS ALREADY REGISTERED", userreg: false});
    }
    else if(res.locals.check === true){
        res.status(201).json({message: "USER IS REGISTERED", userreg: true});
    }
    else{
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

routes.post("/users/login", [login], function(req, res, next){
    if(res.locals.login[0] === -1){
        res.status(401).json({message:"USER IS NOT EXIST", uservalid: false, token: null});
    }
    else if(res.locals.login[0] === 0){
        res.status(401).json({message:"USER CREDENTIAL IS WRONG", uservalid: false, token: null});
    }
    else if(res.locals.login[0] === 1){
        const token = jwt.sign({username: req.query["username"]}, CONFIGURATION.KEY, { expiresIn: '1h'});
        res.status(200).json({message:"CORRECT CREDENTIALS", uservalid: true, 
            token: token, userid: res.locals.login[1]});
    }
    else{
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

routes.post("/borrow/:bookId/:userId", [verifyToken, borrowbook], function(req, res, next){
    if(res.locals.data){
        res.sendStatus(200).json({message: "book is borrowed"});
    }
    else{
        res.sendStatus(500).json({message: "SOMETHING WENT WRONG"});
    }
});

routes.post("/return/:bookId/:userId", [verifyToken, returnbook], function(req, res, next){
    if(res.locals.data){
        res.sendStatus(200).json({message: "book is returned"});
    }
    else{
        res.sendStatus(500).json({message: "SOMETHING WENT WRONG"});
    }
    
});

routes.get("/users/:userId/books", [verifyToken, getuser_borrowed_books], function(req, res, next){
    if(res.locals.data){
        res.sendStatus(200).json({ results: res.locals.data});
    }
    else{
        res.sendStatus(200).json({results: null});
    }
    
});