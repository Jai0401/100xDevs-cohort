import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ShowCourses from './components/ShowCourses';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Landing from './components/Landing';
import CoursebyId from './components/CoursebyId';
import PurchasedCourses from './components/PurchasedCourses'
import NavBar from './components/NavBar'

function App() {

  return (
    <Router>
    <div className="App">
      <NavBar/>
    <div className="content">
      <Routes>
        <Route exact path = '/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/courses' element={<ShowCourses/>}/>
        <Route path='/courses/:id' element={<CoursebyId/>}/>
        <Route path='/courses/purchased' element={<PurchasedCourses/>}/>
        </Routes>
    </div>
    </div>
    </Router>
  )
}

export default App
