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
getPriceRangeSales, createUser, getHashedPassword, getUserID, getUserInventory, getAuthorSales} from './database.js'
//to fix __dirname errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Module helps parse data sent from HTTP Req Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


import session from "express-session";

// Function section
function checkInput(input) {
    // Check if the input is null or undefined (i.e search field is left empty)
    //console.log(input);
    if (input == 0 || input == " " || input == undefined) {
        //console.log(input);
        return false; // Input is null or undefined
    }
    return true; // Input is valid
}

//Create a session object that lasts for one day
const oneDay = 1000 * 60 *60 *24;
/*
documentation on session object: https://www.npmjs.com/package/express-session
*/
app.use(session({
    secret:"This is for a secret",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: oneDay}
}))



//Set homepage on intial load of web page to login
app.get('/', async (req,res)=>{
   res.sendFile(path.join(__dirname,'/views/login.html'));
});


//function that takes user input and sends it off to the database to check if they are valid
//TODO: Make error page
app.post('/login', async (req,res)=>{
    console.log(req.body.email);
    /*
    TODO: check if the email is even in the database to begin with
    */
    const userPass = await getHashedPassword(req.body.email);
    //check if the password inputed matches with the one on the db
    const isMatch = await bcrypt.compare(req.body.password, userPass);
    //if the password matches, then set the session user to the email for later storage
    //then redirect to bazaar page
    if(isMatch){
        //retrieve userID from server via email criteria
        const userID = await getUserID(req.body.email);
        //set the user property of the session to the retrieve email
        req.session.user = req.body.email;
        //set the user_id property of the session
        req.session.user_id = userID;
        //redirect to the "dashboard"
        res.sendFile(path.join(__dirname,'views/bazaar.html'));
    }
    //if the password doesnt match, then notify that either password or email doesnt match
    else{
        console.log("Your password or email are invalid");
    }
})


//SETTERS
//redirect to register page
app.get('/register', async(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register.html'))
})

//redirect to bazaar page
app.get('/bazaar', async(req,res)=>{
    //if the user property of the session is not defined, then return an 400 error (server error)
    if(!req.session.user){
        return res.status(401).send();
    }
    //if the user property is defined, then they must have logged in before
    return res.status(200).send("Welcome to the dashboard");
})

//redirect to about page
app.get('/about', async(req,res)=>{
   res.sendFile(path.join(__dirname,'/views/about.html'));
});

//redirect to contact page
app.get('/contact', async(req,res)=>{
   res.sendFile(path.join(__dirname,'/views/contact.html'));
});

//redirect to the sell page
app.get('/sell', async(req, res)=>{
    res.sendFile(path.join(__dirname,'/views/sell.html'));
})



//INSERTERS
// helper function usage is utilized in retrievers and inserters
app.post('/insertOrder', async(req,res)=>
{   //put body properties as variables
    const bookName = req.body.book_name;
    const courseCode = req.body.course_code;
    const bookCond = req.body.condition;
    const bookPrice = req.body.price;
    const userID = req.session.user_id;
    const author = req.body.author;

    
    //if the inputs are not defined, return 400 error
    if (!checkInput(bookName) || !checkInput(courseCode) || 
    !checkInput(bookCond) || !checkInput(bookPrice)){
        res.status(400).send("Invalid input data. Check book name, course code, book condition & price fields for invalid input");
    }

   //iteration 2 MUST needs: sanitize input to prevent malicious SQL quackery
    const order = await insertSale(bookName, courseCode, bookCond, bookPrice,userID, author);

    //show the database with all the sales
    const sells = await getSells();
    res.send(sells);
    
})

//RETRIEVERS (as it stands, all retrieve functions are currently sending raw JSON object files to output)
//query the database to get all avaiable sales
app.get('/retrieveSales',async(req,res)=>{
    const sells = await getSells();
    res.send(sells);
})

//search database based of course code
app.post('/searchSales',async(req,res)=>{
    const checkBookCourseCode = req.body.course_code;
    if (!checkInput(checkBookCourseCode)){
        res.status(400).send("Invalid input data. Make sure book course code input is valid.");
    }
    const sales = await getCertainSale(bookCourseNumber);
    res.send(sales);
})

//search sales based on book name 
app.post('/searchSalesByName', async(req,res)=>{
    const bookCourseName = req.body.book_name;
    if (!checkInput(bookCourseName)) {
        res.status(400).send("Invalid input data. Cannot leave Book Name search field empty");
    }
    else { 
        const bookSearch = await getBookNameSales(req.body.book_name);
        res.send(bookSearch);
    }
})

//search sales based by course code
app.post('/searchSalesByCourse', async(req,res)=>{
    const bookCourseCode = req.body.course_code;
    console.log(bookCourseCode);
    if (!checkInput(bookCourseCode)) {
        res.status(400).send("Invalid input data. Cannot leave Course Code search field empty");
        // filter for null and non numerical/alpha characters
    }
    else {
        const bookSearch = await getCourseCodeSales(req.body.course_code);
        res.send(bookSearch);
    }
})

//search sales based by book condition 
app.post('/searchSalesByCondition', async(req,res)=>{
    const bookConditionCode = req.body.condition;
    if (!checkInput(bookConditionCode)) {
       // console.log("flag condition code");
        res.status(400).send("Invalid input data. Cannot leave Book Condition field empty");
    }
    else {
        const bookSearch = await getConditionSales(req.body.condition);
        res.send(bookSearch);
    } 
})

//search sales based by minimum price point and maximum price point
app.post('/searchByPriceRange', async(req,res)=>{
    const bookMinPrice = req.body.min_price;
    const bookMaxPrice = req.body.max_price;
    console.log(bookMinPrice);
    if (!checkInput(bookMinPrice) || !checkInput(bookMaxPrice)){
        res.status(400).send("Invalid input data. Cannot leave min/max price range field empty");
    }
    else{
        const bookSearch = await getPriceRangeSales(bookMinPrice, bookMaxPrice);
        res.send(bookSearch);
    }
})


//search the book database using the user_id stored and uses that for WHERE statement
app.post('/getUserInventory', async(req,res)=>{
    const userInventory = await getUserInventory(req.session.user_id);
    res.send(userInventory);
})

//search book based on author name
app.post('/searchSalesByAuthor', async(req,res)=>{

    const author = req.body.author_name;

    if (!checkInput(author)) {
        res.status(400).send("Invalid input data. Cannot leave author search field empty");
    }
    else { 
        const authorInventory = await getAuthorSales(author);
        //const bookSearch = await getBookNameSales(req.body.book_name);
        res.send(authorInventory);
    }
})

// helper function usage stops here

//create account
app.post('/registerAccount', async(req,res)=>{
    try{
        //TODO: Make sure the email being used isn't already in the database
        //inputs: plain text password and number of salt rounds: 10
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userRegister = await createUser(req.body.user_firstName,
            req.body.user_lastName,
            req.body.user_major,
            req.body.user_phone_number,
            hashedPassword,
            req.body.email);
            res.sendFile(path.join(__dirname,'/views/login.html'));
    }catch(e){
        console.log("Register went wrong");
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }   
})


//logout to destroy session
app.get('/logOut', async(req, res)=>{    

    req.session.destroy();
    res.sendFile(path.join(__dirname,'/views/login.html'));
})

//autologging button for testing and marking
app.post('/loginTest', async (req,res)=>{
    const userPass = await getHashedPassword("admin@admin.com");
    //check if the password inputed matches with the one on the db
    const isMatch = await bcrypt.compare("admin", userPass);
    //if the password matches, then set the session user to the email for later storage
    //then redirect to bazaar page
    if(isMatch){
        const userID = await getUserID("admin@admin.com");
        req.session.user = "admin@admin.com";
        req.session.user_id = userID;
        res.sendFile(path.join(__dirname,'views/bazaar.html'));
    }
    //if the password doesnt match, then notify that either password or email doesnt match
    else{
        console.log("Your password or email are invalid");
    }
})

console.log("Server is running on port 3001");

app.listen(3001);
