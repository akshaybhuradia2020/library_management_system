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

// this endpoint add books into the system.
routes.post("/books", [verifyToken, addbooks], function(req, res){
    if(res.locals.data === true){
        res.status(201).json({message: "Book is added"});
    }
    else{
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

// this endpoint get all books from the system.
routes.get("/books", [verifyToken, getbooks], function(req, res){
    if(res.locals.data){
        res.status(200).json({results: res.locals.data});
    }
    else{
        res.status(500).json({results: null});
    }
});

// this endpoint get specific(based on id) books from the system.
routes.get("/books/:id", [verifyToken, getbooks], function(req, res){
    if(res.locals.data){
        res.status(200).json({results: res.locals.data});
    }
    else{
        res.status(500).json({results: null});
    }
});

// this endpoint is for user signup
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

// this endpoint is for user login and resource access of the system
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

// this endpoint borrow a book from the system and update details specific to books and user
routes.post("/borrow/:bookId/:userId", [verifyToken, borrowbook], function(req, res, next){
    if(res.locals.data === 0){
        res.status(200).json({message: "book is borrowed"});
    }
    else if(res.locals.data === -1){
        res.status(200).json({message: "no book is left"});
    }
    else{
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

// this endpoint return a book to the system and update details specific to books and user
routes.post("/return/:bookId/:userId", [verifyToken, returnbook], function(req, res, next){
    if(res.locals.data === 0){
        res.status(200).json({message: "book is returned"});
    }
    else if(res.locals.data === -1){
        res.status(200).json({message: "no book is borrowed"});
    }
    else {
        res.status(500).json({message: "SOMETHING WENT WRONG"});
    }
});

// this endpoint get all borrowed books by specific user 
routes.get("/users/:userId/books", [verifyToken, getuser_borrowed_books], function(req, res, next){
    if(res.locals.data){
        res.status(200).json({ results: res.locals.data});
    }
    else{
        res.status(200).json({ results: null});
    }
    
});