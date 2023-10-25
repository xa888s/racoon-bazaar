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

# Methods and Instrumentation


# Scenarios
## Scenario: Putting a book up for sale
### Initial Assumption
- A user has a book or a collection of books that they want to put up for sale to the Bazaar service. These books are identified by book title and author. They have been successfully authenticated on to Racoon Bazaar. 

### Normal
- The user chooses to put up a sell order. They are prompted to enter the book name, author, the condition of the book, the major that is related to the book, and the price they are looking for.

- On completion, system will send a confirmation to the user stating that the order has been placed.

### What Can Go Wrong
- User can put in an duplicate order that they already have put in. The system will inform the user that they already have an order for the same item and will notify them to edit it.

- User can put in malicious/unintended input. The server will notify the user that the input is not valid and the server will refuse to send the input to the database. 

### System State on Completion
- User is logged in. The order will be sent to the database and the server will display the updated table.



## Scenario: Searching for a book
### Initial Assumption
- A user is looking for a book related to their major. Each book can be related to a major. They are already authenticated. 


### Normal
- The user chooses to search for a book based of the major. They are prompted to look for a book via major. The input is then sent off to the server.

### What Can Go Wrong
- The user inputs a major that isn't in the database. It would return.

- 

### System State on Completion
- 






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



### Reference
- [Design Document Template](https://bit.ai/templates/software-design-document-template#:~:text=System%20Overview%3A%20Provide%20a%20general,functionality%20of%20the%20software%20system.&text=Assumptions%20and%20Dependencies%3A%20Describe%20any,the%20design%20of%20the%20software.)