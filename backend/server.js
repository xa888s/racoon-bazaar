//Server file where certain behaviour will happen


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//local functions from database.js
import {getCertainSale, getSells} from './database.js'
import { emitWarning } from "process";
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

/*
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
*/
/*
Anything in the '' determines what the "function" happens
'/' is the default case aka the index html

*/
app.get('/',bodyParser.urlencoded({extended:true}), async (req,res)=>{
   res.sendFile(path.join(__dirname,'/index.html'));
});


//test function to check if the form works
app.post('/sendData',async (req,res)=>{
    console.log("Send data has been pushed");
})

//function to get all the sale orders on the database
app.get('/retrieveSales',async(req,res)=>{
    console.log("retrieving sales");
    const sells = await getSells();
    res.send(sells);
})

app.post('/searchSales',bodyParser.json() ,async(req,res)=>{
    console.log("Searching for sales");
    console.log(req.body);
    //const sales = await getCertainSale(CMPT245);
    //res.send(sales);
})


//function to insert into database
app.post('/insertOrder', async(req,res)=>
{  
    const {buyerID, name, author, edition, course} = req.body;
    const order = await createSale(buyerID, name, author, edition, course);
    
    console.log("Inserting an order");
})




console.log("Server is running on port 3001");

app.listen(3001);
