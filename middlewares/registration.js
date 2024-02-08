import {dbconnection} from '../utility/dbconn.js';
import { _userdata } from '../models/userdata.js';

export async function registration(req, res, next){
    try{
        let get_conn = await dbconnection();
        const USER = get_conn.model('USER', _userdata);
        
        if ((await USER.exists({username: req.body["username"]})) === null){
            await new USER({
                username: req.body["username"],
                passwd: req.body["password"],
                email: req.body["email"]
            }).save();
            res.locals.check = true;
            // await get_conn.disconnect();
            next();
            
        }
        else{
            res.locals.check = false;
            // await get_conn.disconnect();
            next();
        }
    }
    catch(error){
        res.locals.check = undefined;
        next()
    }
};