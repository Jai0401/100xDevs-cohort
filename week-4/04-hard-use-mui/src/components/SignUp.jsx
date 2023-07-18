import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/// File is incomplete. You need to add input boxes to take input for users to register.
function SignUp() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e)=>{
        // e.preventDefault();
        const user = {username, password};
        fetch('http://localhost:3000/users/signup',{
            method : 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        }).then(()=>{
            console.log("user created successfully")
        }).catch((err)=>{
            console.log("error : ",err);
        })
    }

    return <div className="signup">

        <div className="signup-card">
        <h1 style={{textAlign:'center'}}>Register</h1>
        <label htmlFor="email">Username : </label>
        <input type={"text"} required value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password : </label>
        <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} />
        <br />
        <Button variant="outlined" onClick={handleSubmit}>Register</Button>
        <br />
        <div style={{textAlign:'center'}}>Already a user? <Link to="/login">Login</Link></div>
        </div>

    </div>
}

export default SignUp;