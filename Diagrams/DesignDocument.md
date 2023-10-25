# Racoon Bazaar

# Introduction


# System Overview
The purpose for Racoon Bazaar is to have a platform for students to buy and sell their textbooks they no longer need.

# Design Considerations



# Archectural Strategies
The system will be build using Node.js with various modules such as:
    
    - [Body-parser](https://www.npmjs.com/package/body-parser): for processing HTTP request data
    
    - [Dotenv](https://www.npmjs.com/package/dotenv): for creation and use of environment variables for things such as database info, api keys, etc
    
    - [Express](https://www.npmjs.com/package/express): for server handling
    
    - [mysql2](https://www.npmjs.com/package/mysql2): for database handling

    - [bcrypt](https://www.npmjs.com/package/bcrypt): for hashing passwords and all that jazz

    - [Passport](https://www.npmjs.com/package/passport): for persistent login session

# Methods and Instrumentation


# [Scenarios](Scenarios.md)



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
 1. Users of the Racoon Bazaar will be authenticated via bcrypt. 


 ### External Requirements
  1. Little sensitive data will be stored on the database or server
    - Any senstive data will be obfuscated



### Reference
- [Design Document Template](https://bit.ai/templates/software-design-document-template#:~:text=System%20Overview%3A%20Provide%20a%20general,functionality%20of%20the%20software%20system.&text=Assumptions%20and%20Dependencies%3A%20Describe%20any,the%20design%20of%20the%20software.)