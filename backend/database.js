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
    const [result] = await pool.query("SELECT * FROM Marketplace")
    return result;
}

/*
    Function that sends an INSERT statement into the Marketplace Table with various values
    Params: The Book Name (varchar255), Author Name (varchar255), Edition (int11), Course Tag (varchar255)
    Return: Number of how many fields have been inserted (??? Still Not Sure, researching)
*/
export async function insertSale(name, author, edition, course ){
    const [result] = await pool.query('INSERT INTO Marketplace(name,author, edition, course) VALUES (?,?,?,?)', [name, author, edition, course])
    return result.insertId;

}

/*
    Function that sends a SELECT statement into Marketplace Table
    Params: Course Tag(varchar255)
    Return: JSON Object that contains all rows that have specified Course Tag
*/
export async function getCertainSale(category){
    const [result] = await pool.query("SELECT * from Marketplace WHERE COURSE=?",[category]);
    return result;
}


