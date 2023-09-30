//js file where database queries will be made


import mysql from 'mysql2'
//import dotenv from 'dotenv'
//dotenv.config()


const pool = mysql.createPool({
    //host: process.env.MYSQL_HOST,
    //user: process.env.MYSQL_USER,
    //password: process.env.MYSQL_PASSWORD,
    //database: process.env.MYSQL_DATABASE

    host:'sql3.freesqldatabase.com',
    user:'sql3649600',
    password:'miJvGUuQeL',
    database:'sql3649600'
}).promise()

//gets all the sales in the database
export async function getSells(){
    const [result] = await pool.query("SELECT * FROM MarketplaceSell")
    return result;
}

//inserts a data entry into MarketplaceSell table
export async function createSale(buyerID, name, author, edition, course ){
    const [result] = await pool.query('INSERT INTO MarketplaceSell(buyerID,name,author, edition, course) VALUES (?,?,?,?)', [buyerID, name, author, edition, course])
    return result.insertId;

}

//searchs the database based of one criterion and returns it
export async function getCertainSale(category){
    const [result] = await pool.query("SELECT * from MarketplaceSell WHERE COURSE=?",[category]);
    
    return result;
}


