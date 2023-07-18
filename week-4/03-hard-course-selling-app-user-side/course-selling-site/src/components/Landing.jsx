
import  { useState } from "react";
import { Link } from 'react-router-dom'

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const[token, setToken] = useState(localStorage.getItem('token'))
    
    const handleClick =()=>{
        localStorage.clear();
        setToken(null)
    }

        
        { if(token){
            return(
            <div className="logout">
            <h3>Welcome to course selling website!</h3>
            <button onClick={handleClick}>Logout</button>
            </div>)
        }else{
            return(
            <div className="login">
            <h1>Welcome to course selling website!</h1>
            <Link to='/SignUp'><button>Register</button></Link>
            <br/>
            <Link to='/Login'><button>Login</button></Link>
            </div>
            )
        }
        }
        
}

export default Landing;