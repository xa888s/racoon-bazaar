# Racoon Bazaar

## System Overview
The purpose for Racoon Bazaar is to have a platform for students to buy and sell their textbooks they no longer need

## Design Considerations
The system is designed to be used by university students, who we can assume are more well-versed with dealing with online platforms such as this when compared the greater population.


## Archectural Strategies
The system will be build using Node.js with various modules such as:

- [Body-parser](https://www.npmjs.com/package/body-parser): for processing HTTP request data
- [Dotenv](https://www.npmjs.com/package/dotenv): for creation and use of environment variables for things such as database info, api keys, etc
- [Express](https://www.npmjs.com/package/express): for server handling
- [Express-session](https://www.npmjs.com/package/express-session): for creating a session storing account information    
- [mysql2](https://www.npmjs.com/package/mysql2): for database handling
- [bcrypt](https://www.npmjs.com/package/bcrypt): for hashing passwords and all that jazz


[Requirements](backend/docs/Requirements.md)


## Analysis
#### User Stories & Use Cases
<details><summary> Stories </summary>

I as a student, want to have a service where I can buy and sell books, so I don't have to advertise it myself

I as a student, want to find the cheapest books for my courses, so I can buy them and save money

I as a student, want to find another student who can buy my textbooks, so I can make some money back.

I as a student, want to see how much textbooks cost for certain courses, so I can determine how expensive my education could get

I as a student, want to put a buy order for a book that is sold out, so I can be notified when the book I want is for sale

</details>

<details><summary> Use Cases </summary>
##### Student Selling a book
A student can put their books for sale on the app. They navigate to the Sell Your Books tab. They are prompted to enter 
the name of the book, the author of the book, the course code that the book is assigned to, the current condition of the book and the price that the person wants to sell it for. Once the input fields have been verified to be filled, the database will hold that users book and then send it to the server so it can be shown to anyone who is browsing for books. 

</details>


### Scenarios
<details>

<summary>Scenario: Putting a book up for sale</summary>

##### Initial Assumption
- A user has a book or a collection of books that they want to put up for sale to the Bazaar service. These books are identified by book title and author. They have been successfully authenticated on to Racoon Bazaar. 

##### Normal
- The user chooses to put up a sell order. They are prompted to enter the book name, author, the condition of the book, the major that is related to the book, and the price they are looking for.

- On completion, system will send a confirmation to the user stating that the order has been placed.

##### What Can Go Wrong
- User can put in an duplicate order that they already have put in. The system will inform the user that they already have an order for the same item and will notify them to edit it.

- User can put in malicious/unintended input. The server will notify the user that the input is not valid and the server will refuse to send the input to the database. 

##### System State on Completion
- User is logged in. The order will be sent to the database and the server will display the updated table.
</details>

<details>
<summary>Scenario: Searching for a book </summary>

##### Initial Assumption
- A user is looking for a book related to their major. Each book can be related to a major. They are already authenticated. 


##### Normal
- The user chooses to search for a book based of the major. They are prompted to look for a book via major. The input is then sent off to the server.

##### What Can Go Wrong
- 

- 

##### System State on Completion
- 
</details>



<details>
<summary>Scenario: Buying a book </summary>

##### Initial Assumption
-  


##### Normal
-

##### What Can Go Wrong
- 

- 

##### System State on Completion
- 
</details>

<details>
<summary>Scenario: Login </summary>

##### Initial Assumption
- 


##### Normal
- 

##### What Can Go Wrong
- 

- 

##### System State on Completion
- 

</details>

<details>
<summary>Scenario: Registering an account </summary>

##### Initial Assumption
- 


##### Normal
- 

##### What Can Go Wrong
- 

- 

##### System State on Completion
- 

</details>




## Design

#### Class Diagrams
<details><summary> Iteration 1 </summary>

![Iteration 1 Class Diagram](<Diagrams/Bazaar Iteration 1.png>)

</details>



![Iteration 2 Class Diagram](</Diagrams/Iteration2ClassDiagramPlaceholder.jpg>)


#### Sequence Diagrams

<details><summary>Iteration 1</summary>
![Iteration 1 Sequence Diagram](</Diagrams/RacoonBazaarIteration1Sequence.png>)
</details>

Iteration 2
![Iteration 2 Sequence Diagram](</Diagrams/SequenceDiagramIteration2.png>)






#### Reference
- [Design Document Template](https://bit.ai/templates/software-design-document-template#:~:text=System%20Overview%3A%20Provide%20a%20general,functionality%20of%20the%20software%20system.&text=Assumptions%20and%20Dependencies%3A%20Describe%20any,the%20design%20of%20the%20software.)
