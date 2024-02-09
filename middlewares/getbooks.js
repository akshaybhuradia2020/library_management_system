

import { dbconnection } from '../utility/dbconn.js'
import { _bookdata } from '../models/bookdata.js';

/*** this function return books details based on id,
 * if id is not provided then all books of system are return.
 * ***/
export async function getbooks(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOK = get_conn.model('BOOK', _bookdata);
        
        if(Object.keys(req.params).length === 0){
            res.locals.data = await BOOK.find({});
            next();
        }
        else if(Object.keys(req.params).length >= 1){
            res.locals.data = await BOOK.findById(req.params.id).exec();
            next();
        }
        else{
            res.locals.data = undefined;
            next();
        }
    }
    catch(error){
        res.locals.data = undefined;
        next();
    }
};