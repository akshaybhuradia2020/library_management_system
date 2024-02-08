import mongoose from "mongoose";
import { CONFIGURATION } from '../utility/const.js'
export async function dbconnection(){
    return await mongoose.connect(CONFIGURATION.DBCONNSTRING);
}