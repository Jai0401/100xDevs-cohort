
import  { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    
            return(
            <div className="landing">
            <h1>Welcome to Coursera!</h1>
            </div>)
}

export default Landing;