const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const secretKey = 'your-secret-key';
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const { isUtf8 } = require('buffer');
app.use(cors());
app.use(express.json());

const admins = path.basename('03-course-app-medium/admins.json');
const users = path.basename('03-course-app-medium/users.json');
const courses = path.basename('03-course-app-medium/courses.json')

let ADMINS = [], USERS = [], COURSES = [];
fs.readFile(admins, 'utf8', (err,data)=>{
  if(err){
    console.log(err)
  }else{
    ADMINS = JSON.parse(data)
  }
});
fs.readFile(users, 'utf8', (err,data)=>{
  if(err){
    console.log(err)
  }else{
     USERS = JSON.parse(data)
  }
});
fs.readFile(courses, 'utf8', (err,data)=>{
  if(err){
    console.log(err)
  }else{
    COURSES = JSON.parse(data)
  }
});

let courseId =0;

function adminAuthentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Admin token not found' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid admin token' });
    }

    // Assuming the decoded payload contains the admin information
    req.admin = decoded; // Store the admin data for further use
    next();
  });
}

function userAuthentication(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(403).json({ message : `User token not found` });
  }

  jwt.verify(token, secretKey, (err, decoded)=>{
    if (err) {
      return res.status(403).json({ message: `Invalid user token`});
    }

    req.user = decoded;
    next();
  })
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  console.log(ADMINS)
  const admin = ADMINS.find(a=> a.username === username && a.password === password)
  if(admin){
    res.status(403).json({message : `admin already exists`})
  }else{
    const token = jwt.sign(req.body, secretKey);
    ADMINS.push(req.body);
    fs.writeFile(admins, JSON.stringify(ADMINS), (err)=> 
    { if(err){ console.log('Error ',err) }else{
      res.status(200).json({message: `admin created successfully`, token : token})
    }
  })
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = ADMINS.find(a=> a.username === username && a.password === password)

  if(admin){
    const token = jwt.sign(req.headers, secretKey);
    // ADMINS.push(req.body);
    res.status(200).json({message: `Logged in successfully`, token : token})
  }else{
    res.sendStatus(403)
  }
});

app.post('/admin/courses',adminAuthentication, (req, res) => {
  // logic to create a course
  COURSES.push({courseId: COURSES.length+1,...req.body})
  fs.writeFile(courses, JSON.stringify(COURSES), (err)=> 
    { if(err){ console.log('Error ',err) }else{
      res.status(201).json({message : `Course cretaed successfully`, courseId: COURSES.length})
    }
  })

});

app.put('/admin/courses/:courseId',adminAuthentication, (req, res) => {
  // logic to edit a course
  console.log(COURSES)
  const courseIndex = COURSES.findIndex(a => a.courseId === parseInt(req.params.courseId))
  if(courseIndex === -1){
    res.json({message : `Course not found :(`})
  }else{
    COURSES[courseIndex] = { courseId: req.params.courseId, ...req.body };

    res.status(201).json({message : `Course updated successfully`})
  }
});

app.get('/admin/courses',adminAuthentication, (req, res) => {
  // logic to get all courses
  res.status(201).send(COURSES)
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = USERS.find(a=> a.username === username && a.password === password)
  if(user){
    res.status(403).json({message : `User already exists`})
  }else{
    const token = jwt.sign(req.body, secretKey);
    USERS.push({...req.body, purchasedCourses: []});
    fs.writeFile(users, JSON.stringify(USERS), (err)=> 
    { if(err){ console.log('Error ',err) }else{
      res.status(200).json({message: `User created successfully`, token : token})
    }
  })
  }
  
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const {username, password} = req.headers;

  console.log(username, password)
  const user = USERS.find(a=> a.username === username && a.password === password)
 

  if(user){
    const token = jwt.sign(req.headers, secretKey);
    res.status(200).json({message: `Logged in successfully`, token : token})
  }else{
    res.sendStatus(403)
  }

});

app.get('/users/courses',userAuthentication, (req, res) => {
  // logic to list all courses
  const courses = COURSES.filter(a => a.published === true);
  res.status(201).send(courses);
});

app.post('/users/courses/:courseId',userAuthentication, (req, res) => {
  // logic to purchase a course
  
  const userIndex = USERS.findIndex(a => a.username === req.user.username && a.password === req.user.password);
  const courseFound = USERS[userIndex].purchasedCourses.filter(a => parseInt(a.courseId) === parseInt(req.params.courseId) )
  const purchasedCourse = COURSES.find( a => parseInt(a.courseId) === parseInt(req.params.courseId))


  if(purchasedCourse){
    if(courseFound.length >= 1){
      return res.status(403).json({ message : 'Course already exists'})
    }
    USERS[userIndex].purchasedCourses.push(purchasedCourse)
    fs.writeFile(users, JSON.stringify(USERS), (err)=> 
    { if(err){ console.log('Error ',err) }else{
      res.status(201).json({ message : 'Course purchased successfully'})
    }
  })
  }else{
    res.status(404).json({ message : 'Course not found'})
  }

});

app.get('/users/courses/:courseId',userAuthentication, (req, res) => {
  // logic to get a course by id
  const courseIndex = COURSES.findIndex(a => parseInt(a.courseId) === parseInt(req.params.courseId))

  if(courseIndex !== -1){
    res.status(201).send(COURSES[courseIndex])
  }else{
    res.status(404)
  }

});

app.get('/users/purchasedCourses',userAuthentication, (req, res) => {
  // logic to view purchased courses
  const userIndex = USERS.findIndex(a => a.username === req.user.username && a.password === req.user.password);

  res.status(201).send(USERS[userIndex].purchasedCourses)

});

app.get('/user/me', userAuthentication,(req,res)=>{
  console.log('inside me')
  res.json({username})
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
