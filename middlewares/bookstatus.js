import {dbconnection} from '../utility/dbconn.js';
import {_bookstatus} from '../models/bookstatus.js';
import {_bookdata} from '../models/bookdata.js';

/***  this function borrow a book from system and update quantity of books 
 * in books collection and add record which user borrow(create acknowledgement) 
 * this book in bookstatus collection
 * function also check whether all books are borrowed or not. 
 * */

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



/*** this function return a book to system and update quantity of books 
 * in books collection and delete record from bookstatus collection(remove acknowledgement).
 * */

export async function returnbook(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOKSTATUS = get_conn.model('BOOKSTATUS', _bookstatus);
        const BOOK = get_conn.model('BOOK', _bookdata);
    
        if(Object.keys(req.params).length <= 1){
            res.locals.data = -2
            next();
        }
        else if(Object.keys(req.params).length >= 2 ){
            const has_borrow_book_or_not = await BOOKSTATUS.findOne({userid: req.params["userId"], bookid: req.params["bookId"]});
            if(has_borrow_book_or_not !=null){
                const get_book_quantity = await BOOK.findById(req.params["bookId"]);
                await BOOK.findByIdAndUpdate(req.params["bookId"], { quantity: get_book_quantity["quantity"] + 1});
                await BOOKSTATUS.deleteOne({userid:req.params["userId"], bookid:req.params["bookId"]});
                res.locals.data = 0;
                next();
            }
            else{
                res.locals.data = -1;
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

/*** this function get all borrowed books from bookstatus collection based on userid and bookid
 * */
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
            res.locals.data = await BOOKSTATUS.find({userid: req.params["userId"]}).select({bookid:1});
            next();
        }
    }
    catch(error)
    {
        res.locals.data = false;
        next();
    }
    
};