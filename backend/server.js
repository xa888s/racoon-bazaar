/*
Server file where certain behaviour will happen.
Think of this file as Switch Statement

*/
import express from "express";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
//functions from database.js
import {getSells, insertSale, getBookNameSales,getCourseCodeSales, getConditionSales,
getPriceRangeSales, createUser, loginUser, getHashedPassword} from './database.js'
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Module helps parse data sent from HTTP Req Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


import session from "express-session";
//import {passport} from './passport-config.js';



//tell express to use sessions
app.use(session({
    secret: "A secret for this thing",
    resave: true,
    saveUninitialized: true
}))

//app.use(passport.initialize());
//app.use(passport.session);





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

app.get('/loginView', async(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/login.html'));
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
        const userRegister = await createUser(req.body.first_name,req.body.last_name,req.body.major,req.body.phone_number,hashedPassword,req.body.email);
        console.log("Account data sent");
        res.send(userRegister);
    }catch(e){
        console.log("Register went wrong");
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }   
})

//login
app.post('/login', async(req,res)=>{
    try{
        console.log("TEST");
        //Queries the database by looking for the email, function returns 
        //const userAuthenticate = await getHashedPassword(req.body.email);
        //using bcrypt, compaires the plaintext password to the hashed password from the database
        
        //const isMatch = await bcrypt.compare(req.body.password, userAuthenticate);
        /*
        //if the match is true, grant session token (passportjs)
        if(isMatch){

        }
        //if the match is false, password entered must be wrong
        else{
            
        }
        console.log("AUTHENTICATED???? " + isMatch);
        */

        //res.send(userAuthenticate);

    }catch(e){
        console.log("Login went wrong");
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }    
})

console.log("Server is running on port 3001");

app.listen(3001);
