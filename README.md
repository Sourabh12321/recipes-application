# recipes-application

Recipe app is application where you find the list of recipes and there details and add those recipes in your list

## Deployed link :- https://recipes-application-bve8.vercel.app/
## Demo video Link :- https://vimeo.com/854395651?share=copy

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Routes](#routes)

## Features

- User registration and login with JSON Web Token (JWT) authentication.
- Get the details of the recipes.
- My-items management: Add, remove, items in my-items
- Search recipes
- 
## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js.
- **MySQL**: A NoSQL database for storing data.
- **JWT**: JSON Web Tokens for authentication.
- **Other Dependencies**: Various Node.js libraries and modules.


### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Sourabh12321/recipes-application.git
   ```
   
2. Navigate to the project directory:
   ```
   cd recipes-application
   npm init -y
   ```
   
3. Install dependencies:
   ```
   npm install 
   ```

4. Application Start 
   ```
   npm run serve
   ```



## Usage
### Authentication
To access protected routes, you need to authenticate by obtaining a JWT token. You can achieve this by making a POST request to the /users/login route to log in and obtain the token.


## Routes
### User Routes
```
User Registration: POST /users/signup
User Login: POST /users/login
```
### Recipes Routes
```
Get Recipes : GET /recipes/data/{page}
Get Details of the Recipes : GET /recipes/{id}
Add to My-items : POST /recipes/
Serch Recipes : GET /recipes?query={data}
```
### My-items Routes
```
Get My-items : GET /recipes/userRecipes/

```


### Home-Page
![Screenshot 2023-09-13 190618](https://github.com/Sourabh12321/recipes-application/assets/112754483/2f5ae618-c30b-455d-8359-487a1d4d2c90)


### Recipes-Page

![Screenshot 2023-09-13 190651](https://github.com/Sourabh12321/recipes-application/assets/112754483/07c39564-c41c-4e37-9a06-8e60309696f1)




### My-items-Page

![Screenshot 2023-09-13 190734](https://github.com/Sourabh12321/recipes-application/assets/112754483/8612d7ac-8eab-486c-9a8c-505b31eadb50)



### Login-Signup-Page

![Screenshot 2023-09-13 190815](https://github.com/Sourabh12321/recipes-application/assets/112754483/a1e32128-5036-42f9-ac5c-1ce93af9ed7f)


