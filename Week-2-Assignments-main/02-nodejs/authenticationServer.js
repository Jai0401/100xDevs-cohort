/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

//Done

  const express = require("express")
  const bodyParser = require("body-parser")
  const jwt = require('jsonwebtoken');
  const PORT = 3000;
  const app = express();
  
  app.use(bodyParser.json())


  function generateAuthToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      // Add any additional data you want to include in the token
    };
  
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const options = {
      expiresIn: '1h', // Set the token expiration time as per your requirement
    };
  
    const token = jwt.sign(payload, secretKey, options);
    return token;
  }

  const users = [];
  let id = 0;
  app.post('/signup',(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        return res.status(400).send("Username already exists");
      }
    }

    id = id+1;
    const userObject={
      id:id,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }
    console.log(userObject);
    users.push(userObject);
    console.log(users)
    res.status(201).send("Signup successful")
  })



  app.get('/data', (req, res) => {
    const email = req.headers.email;
    const password = req.headers.password;
  
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email && password === users[i].password) {
        res.status(200).json({
          users: users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          })),
        });
        return;
      }
    }
  
    res.status(401).send("Unauthorized");
  });
  
  
  
  app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        if (password === users[i].password) {
          // Assuming you want to send the user object as the response
          const token = generateAuthToken(users[i]);
          res.status(200).json({
            id: users[i].id,
            email:users[i].email,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            token: token,
          });
          return; // Return after sending the response
        } else {
          // Password doesn't match
          res.status(401).send("Incorrect password");
          return; // Return after sending the response
        }
      }
    }
    
    // Username not found
    res.status(404).send("User not found");
  });

  // app.listen(PORT,()=>{
  //   console.log(`Server is running on port ${PORT}`)
  // })

  // write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
  
  module.exports = app;
  




  // function middleware1(req, res, next) {
  //   const username = req.body.username;
  
  //   for (let i = 0; i < users.length; i++) {
  //     if (username === users[i].username) {
  //       return res.status(400).send("Username already exists");
  //     }
  //   }
  
  //   next();
  // }

  // app.use(middleware1)