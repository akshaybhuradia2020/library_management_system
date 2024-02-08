import {dbconnection} from '../utility/dbconn.js';
import {_bookstatus} from '../models/bookstatus.js';
import {_bookdata} from '../models/bookdata.js';

export async function borrowbook(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        const BOOK = get_conn.model('BOOK', _bookdata);
    
        if(Object.keys(req.params).length <= 1){
            res.locals.data = undefined
            next();
        }
        else if(Object.keys(req.params).length >= 2 ){
            let _t = 0;
            const get_book_quantity = await BOOK.findById(req.params["bookId"])
            .then(msg => {console.log(msg); _t=msg["quantity"]; res.locals.data = true;})
            .catch(err => {console.log(err); throw "Error1"});
            
            await BOOK.findByIdAndUpdate(req.params["bookId"], 
            { quantity: _t-1})
            .then(msg => {console.log(msg); res.locals.data = true;})
            .catch(err => {console.log(err); throw "Error2"});

            await new BOOKSTATUS({
                userid: req.params["userId"],
                bookid: req.params["bookId"]
            }).save()
            .then(msg => {console.log(msg); res.locals.data = true; next();})
            .catch(err => {console.log(err); throw "Error3"});
        }
    }
    catch(error)
    {
        res.locals.data = undefined;
        next();
    }
};



export async function returnbook(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        const BOOK = get_conn.model('BOOK', _bookdata);
    
        if(Object.keys(req.params).length <= 1){
            res.locals.data = undefined
            next();
        }
        else if(Object.keys(req.params).length >= 2 ){
            const get_book_quantity = await BOOK.findById(req.params["bookId"]).exec();
            await BOOK.findByIdAndUpdate(req.params["bookId"], { quantity: get_book_quantity["quantity"] + 1}).exec();
            await BOOKSTATUS.findByIdAndDelete({userid:req.params["bookId"]}).exec();
            res.locals.data = true;
            next();
        }
    }
    catch(error)
    {
        res.locals.data = false;
        next();
    }
};


export async function getuser_borrowed_books(req, res, next){
    try
    {
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        if(Object.keys(req.params).length == 0){
            res.locals.data = undefined
            next();
        }
        else if(Object.keys(req.params).length >= 1 ){
            res.locals.data = await BOOKSTATUS.findById(req.params["userId"]);
            next();
        }
    }
    catch(error)
    {
        res.locals.data = undefined;
        next();
    }
    
};