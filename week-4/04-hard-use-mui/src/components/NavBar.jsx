import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';


function NavBar() {
    const[token, setToken] = useState(localStorage.getItem("token"))

    const handleLogout =()=>{
            localStorage.clear();
            // setToken()
            window.location='/'
    }

    if(token){
        return (  
            <div className="navbar">
                <div className="navbar-logo"><Link to='/' style={{textDecoration:'none'}}><h1>Coursera</h1></Link></div>
                <div className="navbar-links">
                <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/courses'><li>Courses</li></Link>
                <Link to='/courses/purchased'><li>My Courses</li></Link> 
                 
                </ul>
                </div>
                <div className="logout-btn">
                <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        );
    }

    return (  
        <div className="navbar">
            <div className="navbar-logo"><Link to='/' style={{textDecoration:'none'}}><h1>CourseWeb</h1></Link></div>
            <div className="navbar-links">
            <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/courses'><li>Courses</li></Link>
            <Link to='/courses/purchased'><li>My Courses</li></Link> 
             
            </ul>
            </div>
            <div className="login-btn">
            <Link to='/SignUp'><Button variant="outlined"> Sign in/Sign up</Button></Link> 
            </div>
        </div>
    );
}

export default NavBar
