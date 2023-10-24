import {getSells, insertSale, getBookNameSales,getCourseCodeSales, getConditionSales,
    getPriceRangeSales, createUser, loginUser, getHashedPassword} from './database.js'
import bcrypt from "bcrypt";
import {Strategy as LocalStrategy} from "passport-local";


module.exports = function(passport){
    passport.use(
        new LocalStrategy((username, password, done)=>{
            //find username in database
            //err if something happens
            //if result length ==== 0, user name wasn't and no error
        })
    )

    passport.seralizeUser((user,done)=>{
        done(null, user.id)
    })

    passport.deseralize((id, done)=>{
        //find username in database
        //id from cookie, matches with database
        //if err throw it,
    })
}