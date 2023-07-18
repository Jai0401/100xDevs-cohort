import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

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

    return <div className="showcourses">
    
    <div className="showcourses-list">
    <h1 style={{textAlign:'center' }}>Purchased Courses</h1>
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
            {/* course ID : {course.courseId} */}
            </>
        )
    })}
    </div>
    {/* {courses.map(c => <Course title={c.title} />)} */}
</div>
}


export default PurchasedCourses;