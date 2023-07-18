const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json())

let ADMINS = [];
let USERS = [];
let COURSES = [];
// let PURCHASED = [];
let courseId = 0;
let userId = 0;
let adminId =0;


//course={title,description,price,image}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const adminAlreadyExists = false;
  for(let i=0; i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username && ADMINS[i].password === admin.password){
      adminAlreadyExists =true;
      break;
    }
  }
  if(adminAlreadyExists){
    res.sendStatus(400);
  }else{
    adminId =adminId+1;
    ADMINS.push({adminId:adminId,...admin})
    res.status(201).send('Admin created successfully')
  }
  
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin = req.headers;

  let adminFound = null;
  for(let i=0; i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username && ADMINS[i].password === admin.password){
      adminFound = ADMINS[i];
      break;
    }
  }
  if(adminFound){
    res.status(201).send('Logged in successfully')
  }else{
    res.sendStatus(400);
  }
});

// { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  const admin = req.headers;
  const course = req.body;
  let isAdminValid = false;
  for(let i=0; i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username && ADMINS[i].password === admin.password){
      isAdminValid = true;
      break;
    }
  }
  if(isAdminValid){
    courseId = courseId+1;
    COURSES.push({courseId:courseId,...course})
    res.status(201).send(`Course created successfully, courseId: ${courseId}`)
  }else{
    res.sendStatus(401)
  }

});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const courseIndex = COURSES.findIndex(course => course.courseId === parseInt(req.params.courseId))
  const admin = req.headers;
  const courseUpdate = req.body;
  let isAdminValid = false;
  for(let i=0; i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username && ADMINS[i].password === admin.password){
      isAdminValid = true;
      break;
    }
  }
  if(isAdminValid && courseIndex != -1){
    COURSES[courseIndex] = {courseId:parseInt(req.params.courseId),...courseUpdate};
    res.status(201).send('Course updated successfully')
  }else{
    res.sendStatus(401);
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  const admin = req.headers;

  let isAdminValid = false;
  for(let i=0; i<ADMINS.length; i++){
    if(ADMINS[i].username === admin.username && ADMINS[i].password === admin.password){
      isAdminValid = true;
      break;
    }
  }
  if(isAdminValid){
    res.status(201).send(COURSES)
  }
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = req.body;
  let userAlreadyExists = false;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username === user.username && USERS[i].password === user.password){
      userAlreadyExists =true;
      break;
    }
  }
  if(userAlreadyExists){
    res.sendStatus(400);
  }else{
    userId = userId+1;
    USERS.push({userId:userId,...user,purchasedCouses: []})
    res.status(201).send('User created successfully')
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const user = req.headers;
  let validUser = null;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username === user.username && USERS[i].password === user.password){
      validUser = USERS[i];
      break;
    }
  }
  if(validUser){
    res.status(201).send(`Logged in successfully`)
  }else{
    res.sendStatus(401);
  }

});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  const user = req.headers;
  let isUserValid = false;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username === user.username && USERS[i].password === user.password){
      isUserValid =true;
      break;
    }
  }
  if(isUserValid){
    res.status(201).send(COURSES)
  }else{
    res.sendStatus(401)
  }
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const courseIndex = COURSES.findIndex(course => course.courseId === parseInt(req.params.courseId))
  const user = req.headers;
  let validUser = null;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username === user.username && USERS[i].password === user.password){
      validUser =USERS[i];
      break;
    }
  }
  if(validUser && courseIndex != -1){
    validUser.purchasedCouses.push(COURSES[courseIndex])
    res.status(201).json({message: "Course purchased successfully"})
  }else{
    res.sendStatus(401)
  }

});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  const user = req.headers;
  let validUser = null;
  for(let i=0; i<USERS.length; i++){
    if(USERS[i].username === user.username && USERS[i].password === user.password){
      validUser =USERS[i];
      break;
    }
  }
  if(validUser){
    res.status(200).send(validUser.purchasedCouses)
  }else{
    res.sendStatus(400)
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
