/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */


//todo={id, title, description}


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;
const cors = require('cors')
app.use(cors())

const todos =[];
let id =0;

app.get('/todos', (req,res)=>{
    res.status(200).send(todos);
})

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let found = false;

  for (let i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      res.status(200).json({
        id: todos[i].id,
        title: todos[i].title,
        description: todos[i].description
      });
      found = true;
      break;
    }
  }

  if (!found) {
    res.status(404).send('Not Found');
  }
});

app.post('/todos', (req,res)=>{
  id = id+1;
  const title = req.body.title
  const description = req.body.description
  const todoObject = {
    id:id,
    title:title,
    description:description
  }
  todos.push(todoObject);
  console.log(todos)
  res.status(201).json({
    id:id
  })
})

app.delete('/todos/:id', (req,res)=>{
    const id = parseInt(req.params.id,10);
    for(let i = 0; i<todos.length; i++){
      if(id === todos[i].id){
        todos.splice(i,1)
        res.status(200).send(`OK`)
        found = true;
        break;
      }
      
    }
    if(!found){
      res.status(404).send(`Not Found`)
    }
})

app.put('/todos/:id',(req,res)=>{
  const id = parseInt(req.params.id,10);
  const newtitle= req.body.title
  const newDescription= req.body.description
  for(let i=0; i<todos.length; ){
    if(id === todos[i].id){
      todos[i].title = newtitle;
      todos[i].description = newDescription;
      res.status(200).send(`OK`)

      found = true;
      break;
    }
  }
  if(!found){
    res.status(404).send(`Not Found`)
  }

})

app.listen(port,()=>{
  console.log(`Server is lisening on port ${port}`);
})

module.exports = app;
