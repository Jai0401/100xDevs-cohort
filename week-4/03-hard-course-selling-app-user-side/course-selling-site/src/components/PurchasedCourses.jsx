import { useEffect, useState } from "react";

function PurchasedCourses() {
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/users/purchasedCourses',{
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
            })
            }).then(res=> res.json())
            .then( data => setCourses(data))
    },[])

    return ( 
        <div className="purchased">
            <h1>Purchased Courses</h1>
            {courses.map((course)=>{
                return(<>
                    <h2>{course.title}</h2>
                    <img src={course.imageLink} alt={"Image of course"+course.courseId} />
                    <p>{course.description}</p>
                    <span>Price : {course.price}</span>
                    <br />
                    course ID : {course.courseId}
                    </>
                )
            })}
        </div>
     );
}

export default PurchasedCourses;