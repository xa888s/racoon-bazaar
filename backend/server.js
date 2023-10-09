/*
Server file where certain behaviour will happen.
Think of this file as Switch Statement

*/
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//local functions from database.js
import {getSells, insertSale, getBookNameSales,getCourseCodeSales, getConditionSales,
getPriceRangeSales} from './database.js'
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Module helps parse data sent from HTTP Req Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', async (req,res)=>{
   res.sendFile(path.join(__dirname,'/views/bazaar.html'));
});



app.get('/retrieveSales',async(req,res)=>{
    const sells = await getSells();
    res.send(sells);
})


app.post('/searchSales',async(req,res)=>{
    const sales = await getCertainSale(bookCourseNumber);
    res.send(sales);
})



app.post('/insertOrder', async(req,res)=>
{   //put body properties as variables
    const bookName = req.body.book_name;
    const courseCode = req.body.course_code;
    const bookCond = req.body.condition;
    const bookPrice = req.body.price;
    
    const order = await insertSale(bookName, courseCode, bookCond, bookPrice);

    //show the database with all the sales
    const sells = await getSells();
    res.send(sells);

    
})

app.post('/searchSalesByName', async(req,res)=>{
    const bookSearch = await getBookNameSales(req.body.book_name);
    res.send(bookSearch);
})


app.post('/searchSalesByCourse', async(req,res)=>{
    const bookSearch = await getCourseCodeSales(req.body.course_code);
    res.send(bookSearch);
})

app.post('/searchSalesByCondition', async(req,res)=>{
    const bookSearch = await getConditionSales(req.body.condition);
    res.send(bookSearch);
})

app.post('/searchByPriceRange', async(req,res)=>{
    const bookSearch = await getPriceRangeSales(req.body.minPrice, req.body.maxPrice);
    res.send(bookSearch);
})

console.log("Server is running on port 3001");

app.listen(3001);
