import { dbconnection } from '../utility/dbconn.js'
import { _bookdata } from '../models/bookdata.js';

/***
 * this function add books to the system.
 */
export async function addbooks(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOK = get_conn.model('BOOK', _bookdata);

        if(req.body === undefined){
            res.local.data = false;
            next();
        }
        else{
            await new BOOK({
                title: req.body["title"],
                author: req.body["author"],
                isbn: req.body["isbn"],
                quantity: req.body["quantity"]
            }).save();
            res.locals.data = true;
            next();
        }

    }
    catch(error){
        res.locals.data = false;
        console.log(error);
        next();
    }
};