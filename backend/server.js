//Server file where certain behaviour will happen


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//local functions from database.js
import {getCertainSale, getSells, insertSale} from './database.js'
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*
Anything in the '' determines what the "function" happens
'/' is the default case aka the index html

*/
app.get('/', async (req,res)=>{
   res.sendFile(path.join(__dirname,'/index.html'));
});



//function to get all the sale orders on the database
app.get('/retrieveSales',async(req,res)=>{
    console.log("retrieving sales");
    const sells = await getSells();
    res.send(sells);
})

app.post('/searchSales',async(req,res)=>{

    const bookCourseNumber = req.body.courseNumber;
    const sales = await getCertainSale(bookCourseNumber);
    res.send(sales);
})


//function to insert into database and then returns the entire database
app.post('/insertOrder', async(req,res)=>
{   //put body properties as variables
    const bookName = req.body.bookName;
    const author = req.body.author;
    const edition = req.body.edition;
    const course = req.body.course;
    
    //put variables through
    const order = await insertSale(bookName, author, edition, course);

    //show the database with all the sales
    const sells = await getSells();
    res.send(sells);
})




console.log("Server is running on port 3001");

app.listen(3001);
