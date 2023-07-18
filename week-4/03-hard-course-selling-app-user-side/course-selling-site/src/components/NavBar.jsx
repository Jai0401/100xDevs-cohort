import { Link } from 'react-router-dom';


function NavBar() {
    return (  
        <div className="navbar">
            <Link to='/'><h1>Course Site</h1></Link>
            <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/courses'><li>Courses</li></Link>
            <Link to='/courses/purchased'><li>My Courses</li></Link>   
            </ul>
        </div>
    );
}

export default NavBar
