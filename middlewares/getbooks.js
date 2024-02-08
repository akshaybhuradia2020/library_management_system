

import { dbconnection } from '../utility/dbconn.js'
import { _bookdata } from '../models/bookdata.js';

export async function getbooks(req, res, next){
    try{
        let get_conn = await dbconnection();
        const BOOK = get_conn.model('BOOK', _bookdata);
        if(req.params === undefined){
            res.locals.data = await BOOK.find({});
            next();
        }
        else if(typeof(req.params.id) === "string"){
            res.locals.data = await BOOK.findById(req.params.id);
            next()
        }
    }
    catch(error){
        res.locals.data = undefined;
        next();
    }
};