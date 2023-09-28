import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//local functions from database.js
import {getSells} from './database.js'
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.get('/', async (req,res)=>{
    console.log("Server running");
    const sells = await getSells();
    res.send(sells);
});

app.listen(3000);
