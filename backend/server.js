//Server file where certain behaviour will happen


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//local functions from database.js
import {getSells} from './database.js'
import { emitWarning } from "process";
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json);
/*
Anything in the '' determines what the "function" happens
'/' is the default case aka the index html

*/
app.get('/', async (req,res)=>{
    console.log("Server running");
    const sells = await getSells();
    res.send(sells);
});


//function to get all the sale orders on the database
app.get('/retrieveSales',async(req,res)=>{
    console.log("Retrieve sells from database");
})


//function to insert into database
app.post('/insertOrder', async(req,res)=>
{  
    const {buyerID, name, author, edition, course} = req.body;
    const order = await createSale(buyerID, name, author, edition, course);
    
    console.log("Inserting an order");
})

console.log("Server is running");

app.listen(3000);
