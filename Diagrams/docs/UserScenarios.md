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
