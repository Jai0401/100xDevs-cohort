import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/users/courses',{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
        })
        })
        .then(res=> res.json())
        .then(data => {
            setCourses(data)
        })
    },[])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div className="showcourses">
    
        <div className="showcourses-list">
        <h1 style={{textAlign:'center' }}>Course Page</h1>
        <hr style={{width:'250px'}}/>
        <br />
        {courses.map((course)=>{
            return(<>
                <h2 style={{textAlign:'center'}}>{course.title}</h2>
                <img src={course.imageLink}
                 alt={"Image of course"+course.courseId}
                 style={{width:'400px', border:'1px solid black'}} />
                <p>{course.description}</p>
                <span>Price : {course.price}</span>
                <br />
                <Link to={'/courses/'+course.courseId}><Button variant="outlined">Show more</Button></Link>
                {/* course ID : {course.courseId} */}
                </>
            )
        })}
        </div>
        {/* {courses.map(c => <Course title={c.title} />)} */}
    </div>
}

// function Course({title}) {
//     return <div>
//         <h1>{title}</h1>
//     </div>
// }

export default ShowCourses;