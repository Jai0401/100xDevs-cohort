import React from "react";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

  
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user = {username, password};
        fetch('http://localhost:3000/users/login',{
            method : 'POST',
            headers:new Headers({
                'Content-Type': 'text/plain',
                'username': user.username,
                'password': user.password,
        }),
            // body: JSON.stringify(admin)
        }).then((res)=>{
            console.log("User logged in successfully");
            return res.json();
        })
        .then((data)=>{
            const token = data.token;
            localStorage.setItem('token', JSON.stringify(token))

        })
        .catch((err)=>{
            console.log("error : ",err);
        })
    }
    return <div>
        <h1>User Login</h1>
        <br/>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username : </label>
        <input type={"text"} required value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password : </label>
        <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} />
        <br />
        <button>Login</button>
        </form>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}
export default Login;