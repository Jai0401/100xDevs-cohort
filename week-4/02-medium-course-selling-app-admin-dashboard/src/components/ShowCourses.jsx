import React, { useEffect } from "react";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
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
    },[courses])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Course Page</h1>
        {courses.map((course)=>{
            return(<>
                <h1>{course.title}</h1>
                <img src={course.imageLink} alt={"Image of course"+course.courseId} />
                <p>{course.description}</p>
                <span>Price : {course.price}</span>
                <br />
                course ID : {course.courseId}
                </>
            )
        })}
        
        {/* {courses.map(c => <Course title={c.title} />)} */}
    </div>
}

// function Course({title}) {
//     return <div>
//         <h1>{title}</h1>
//     </div>
// }

export default ShowCourses;