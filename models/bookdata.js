
import {Schema} from "mongoose";

export const _bookdata = new Schema({
    title: { type: String, required:true, trim: true, min : 10} ,
    author: { type: String, required:true, trim: true, min: 10},
    isbn: { type: String, required:true, trim: true, min : 13} ,
    quantity: { type: Number, required:true}
});