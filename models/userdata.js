
import {Schema} from "mongoose";

export const _userdata = new Schema({
    username: { type: String, required:true, trim: true, min : 4} ,
    email: { type: String, required:true, trim: true, min : 8} ,
    passwd: { type: String, required:true, trim: true, min: 4}
});