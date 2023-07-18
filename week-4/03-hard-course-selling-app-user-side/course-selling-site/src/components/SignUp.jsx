import React from "react";

/// File is incomplete. You need to add input boxes to take input for users to register.
function SignUp() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
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

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username : </label>
        <input type={"text"} required value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password : </label>
        <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} />
        <br />
        <button>Register</button>
        </form>
        
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default SignUp;