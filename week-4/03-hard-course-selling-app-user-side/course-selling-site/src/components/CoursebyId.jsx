import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';


function CoursebyId() {
    const [course, setCourse] = useState({})
    const {id} = useParams();

    
        const handlePurchase = () => {
            fetch('http://localhost:3000/users/courses/'+id,{
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
            })
            }).then(()=> console.log(`Course Purchased successfully`))
        }


    useEffect(()=>{
        fetch('http://localhost:3000/users/courses/'+id,{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
        })
        })
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.log('Error', err))
    },[id])

    if (Object.keys(course).length > 0) {
        return (
          <div>
            <h2>{course.title}</h2>
            <img src={course.imageLink} alt={"Image of course " + course.courseId} />
            <p>{course.description}</p>
            <span>Price: {course.price}</span>
            <button onClick={handlePurchase}>Purchase</button>
            <br />
          </div>
        );
      } else {
        return ( <><p>Course not found</p> <h1>👻</h1></>); // or render a placeholder or loading state
      }
}

export default CoursebyId;