//js file where database queries will be made

//This block is for setting up the environment variables
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
}).promise()

/*
    Function sends a select all elements in the Marketplace Table 
    Returns: JSON Object
    */
export async function getSells(){
    const [result] = await pool.query("SELECT * FROM Inventory")
    return result;
}

/*
    Function that sends an INSERT statement into the Marketplace Table with various values
    Params: The Book Name (varchar255), Author Name (varchar255), Edition (int11), Course Tag (varchar255)
    Return: Number of how many fields have been inserted (??? Still Not Sure, researching)
*/
export async function insertSale(book_name, course_code, condition, price ){
    const [result] = await pool.query("INSERT INTO Inventory(book_name,course_code, book_condition, book_price) VALUES (?,?,?,?)", [book_name, course_code, condition, price])
    return result.insertId;

}

/*
    Function that sends a SELECT statement into Inventory table
    Params: book_name(varchar255)
    Return: JSON Object that contains all rows that have specified Book Name
*/
export async function getBookNameSales(bookName){
    const [result] = await pool.query("SELECT * from Inventory WHERE book_name = '" + bookName +"'");
    return result;
}
/*
    Function that sends a SELECT statement into Inventory table
    Params: course_code(varchar255)
    Return: JSON Object that contains all rows that have specified Course Code
*/
export async function getCourseCodeSales(courseCode){
    const [result] = await pool.query("SELECT * from Inventory WHERE course_code LIKE '%" + courseCode +"%'");
    return result;
}


/*
    Function that sends a SELECT statement into Inventory table
    Params: condition(varchar255)
    Return: JSON Object that contains all rows that have specified Book Condition
*/
export async function getConditionSales(condition){
    const [result] = await pool.query("SELECT * from Inventory WHERE course_code='" + condition +"'");
    return result;
}

/*
    Function that sends a SELECT statement into Inventory table
    Params: min (decimal 13,2), max (decimal 13,2)
    Return: JSON Object that contains all rows that are within the range of Min and Max
*/
export async function getPriceRangeSales(min, max){
    const [result] = await pool.query("SELECT * from Inventory WHERE book_price BETWEEN "+min+" AND " +max);
    return result;
}
