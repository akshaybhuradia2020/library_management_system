import {dbconnection} from '../utility/dbconn.js';
import {_bookstatus} from '../models/bookstatus.js';
import {_bookdata} from '../models/bookdata.js';

export async function borrowbook(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        const BOOK = get_conn.model('BOOK', _bookdata);
    
        if(Object.keys(req.params).length <= 1){
            res.locals.data = -2
            next();
        }
        else if(Object.keys(req.params).length >= 2 ){
            const get_book_quantity = await BOOK.findById(req.params["bookId"]);
            if(get_book_quantity["quantity"] <= 0){
                res.locals.data = -1;
                next();
            }
            else{
                await BOOK.findByIdAndUpdate(req.params["bookId"], { quantity: get_book_quantity["quantity"] -1});
                await new BOOKSTATUS({
                    userid: req.params["userId"],
                    bookid: req.params["bookId"]
                }).save();
                res.locals.data = 0;
                next();
            }

        }
    }
    catch(error)
    {
        res.locals.data = -2;
        next();
    }
};



export async function returnbook(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        const BOOK = get_conn.model('BOOK', _bookdata);
    
        if(Object.keys(req.params).length <= 1){
            res.locals.data = false
            next();
        }
        else if(Object.keys(req.params).length >= 2 ){
            const get_book_quantity = await BOOK.findById(req.params["bookId"]);
            await BOOK.findByIdAndUpdate(req.params["bookId"], { quantity: get_book_quantity["quantity"] + 1});
            await BOOKSTATUS.deleteOne({userid:req.params["userId"], bookid:req.params["bookId"]});
            res.locals.data = true;
            next();
        }
    }
    catch(error)
    {
        console.log(error);
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
            res.locals.data = false
            next();
        }
        else if(Object.keys(req.params).length >= 1 ){
            res.locals.data = await BOOKSTATUS.find({userid: req.params["userId"]}).select({bookid:1})
            next();
        }
    }
    catch(error)
    {
        res.locals.data = false;
        next();
    }
    
};