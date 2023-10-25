Racoon Bazaar

# Introduction


# System Overview
The purpose for Racoon Bazaar is to have a platform for students to buy and sell their textbooks they no longer need

# Design Considerations
The system 


# Archectural Strategies
The system will be build using Node.js with various modules such as:
    
    - [Body-parser](https://www.npmjs.com/package/body-parser): for processing HTTP request data
    
    - [Dotenv](https://www.npmjs.com/package/dotenv): for creation and use of environment variables for things such as database info, api keys, etc
    
    - [Express](https://www.npmjs.com/package/express): for server handling
    
    - [mysql2](https://www.npmjs.com/package/mysql2): for database handling

    - [bcrypt](https://www.npmjs.com/package/bcrypt): for hashing passwords and all that jazz

    - [Passport](https://www.npmjs.com/package/passport): for persistent login session

# Policies & Tactics



# Detailied System Design





# Requirements

## Functional 
 1. A user should be able to search for all books that are being sold
 2. The system shall display all available books that are in inventory
 
 3. Each student will be identified by an account they created, uniquely identified by their email
 -e.g All users will access the system via user & passwords


## Non-Functional
### Product Requirements
 1. Senstive information will be encrypted vs bcrypt
 2. Data being requested from the server will only contain data pertained to the request, nothing more.

### Organizational Requirements
 1. Users of the Racoon Bazaar will be authenticated via bcrypt


 ### External Requirements
  1. Little sensitive data will be stored on the database or server
    - Any senstive data will be obfuscated