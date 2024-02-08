import { Schema } from 'mongoose';

export const _bookstatus = new Schema({
    userid:{ type: String, required: true},
    bookid:{ type: String, required: true}
})