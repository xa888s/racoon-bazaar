/*
Server file where certain behaviour will happen.
Think of this file as Switch Statement

*/
import express from "express";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
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


const users = [];
//SETTERs
//set homepage on intial load of web page
app.get('/', async (req,res)=>{
   res.sendFile(path.join(__dirname,'/views/bazaar.html'));
});



app.get('/about', async(req,res)=>{
   res.sendFile(path.join(__dirname,'/views/about.html'));
});

app.get('/contact', async(req,res)=>{
   res.sendFile(path.join(__dirname,'/views/contact.html'));
});

app.get('/registerView', async(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register.html'));
})

//INSERTERS
app.post('/insertOrder', async(req,res)=>
{   //put body properties as variables
    const bookName = req.body.book_name;
    const courseCode = req.body.course_code;
    const bookCond = req.body.condition;
    const bookPrice = req.body.price;

   //iteration 2 MUST needs: sanitize input to prevent malicious SQL quackery
    const order = await insertSale(bookName, courseCode, bookCond, bookPrice);

    //show the database with all the sales
    const sells = await getSells();
    res.send(sells);

    
})

//RETRIEVERS
//as it stands, all retrieve functions are currently sending raw JSON object files to output
app.get('/retrieveSales',async(req,res)=>{
    const sells = await getSells();
    res.send(sells);
})

app.post('/searchSales',async(req,res)=>{
    const sales = await getCertainSale(bookCourseNumber);
    res.send(sales);
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


//create account
app.post('/register', async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("UserFirstName" + req.body.first_name);
        console.log("LastName" + req.body.last_name);
        console.log("Major"+ req.body.major);
        console.log("phone number" + req.body.phone_number);
        console.log("password" + hashedPassword);
        console.log("email" + req.body.email);

    }catch{
        
    }   
})

//login
app.post('/login', async(req,res)=>{
    console.log("login attempt made");    
})

console.log("Server is running on port 3001");

app.listen(3001);
