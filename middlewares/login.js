import {dbconnection} from '../utility/dbconn.js'
import { _userdata } from '../models/userdata.js';

/***
 * this function is for login based on usernam and password.
 */
export async function login(req, res, next){
    try {
        let get_conn = await dbconnection();
        const USER = get_conn.model('USER', _userdata);
        if ((await USER.exists({username: req.query["username"]})) === null){
            res.locals.login = [-1, null];
            // await get_conn.disconnect();
            next();
        }
        else if((await USER.exists({username: req.query["username"], passwd: req.query["passwd"]}))){
            let _get_userid = await USER.findOne({username: req.query["username"], passwd: req.query["passwd"]});
            res.locals.login = [1, _get_userid["_id"]];
            // await get_conn.disconnect();
            next();
        }
        else{
            res.locals.login = [0, null];
            // await get_conn.disconnect();
            next();
        }
    }
    catch(error){
        res.locals.login = undefined;
        next()
    }
};