const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const secretKey = 'your-secret-key';
const cors = require('cors')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
app.use(cors());
app.use(express.json());

//Define mongoose schemas
const adminSchema = new Schema({
  username : String,
  password : String
});

const userSchema = new Schema({
  username : String,
  password : String,
  purchasedCourses : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

const courseSchema = new Schema({
  title : String,
  description : String,
  price : String,
  imageLink : String,
  published : String
})

//Define mongoose models
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

//connection with database
mongoose.connect('mongodb+srv://jaimingodhani:4bhn4TQvim5MGLMu@cluster0.bnnadoa.mongodb.net/course-selling-site')

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
      return res.status(403).jason({ message: `Invalid user token`});
    }

    req.user = decoded;
    next();
  })
}


// Admin routes
app.post('/admin/signup', async(req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = await Admin.findOne({username})
  if(admin){
    res.status(403).json({message : `admin already exists`})
  }else{
    const newAdmin = new Admin({username, password})
    await newAdmin.save()
    const token = jwt.sign({username, role: 'admin'}, secretKey);
    res.status(200).json({message: `admin created successfully`, token})
  }
});

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username})
  if(admin){
    const token = jwt.sign(req.headers, secretKey);
    // ADMINS.push(req.body);
    res.status(200).json({message: `Logged in successfully`, token : token})
  }else{
    res.sendStatus(403)
  }
});

app.post('/admin/courses',adminAuthentication, async(req, res) => {
  // logic to create a course
  const newCourse = new Course(req.body);
  const course = await newCourse.save()
  
  res.status(201).json({message : `Course cretaed successfully`, courseId: course._id})
});

app.put('/admin/courses/:courseId',adminAuthentication, async(req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if(course){
    res.json({message : `Course not found :(`})
  }else{
    res.status(201).json({message : `Course updated successfully`})
  }
});

app.get('/admin/courses',adminAuthentication, async(req, res) => {
  // logic to get all courses
  const course = await Course.find({})
  res.status(201).send(course);
});

// User routes
app.post('/users/signup', async(req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = await User.findOne({username})
  if(user){
    res.status(403).json({message : `User already exists`})
  }else{
    const newUser = new User({username, password});
    await newUser.save();
    const token = jwt.sign(req.body, secretKey);
    res.status(200).json({message: `User created successfully`, token : token})
  }
});

app.post('/users/login', async(req, res) => {
  // logic to log in user
  const {username, password} = req.headers;
  const user = await User.findOne({username})
  if(user){
    const token = jwt.sign(req.headers, secretKey);
    res.status(200).json({message: `Logged in successfully`, token : token})
  }else{
    res.sendStatus(403)
  }
});

app.get('/users/courses',userAuthentication, async(req, res) => {
  // logic to list all courses
  const courses = await Course.find({});
  res.status(201).send(courses);
});

app.post('/users/courses/:courseId',userAuthentication, async(req, res) => {
  // logic to purchase a course
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  res.status(201).send(user)
});

app.get('/users/purchasedCourses',userAuthentication, async(req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  res.status(201).send(user)
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
