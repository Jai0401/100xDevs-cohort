import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';


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
          <div className="showcourses">
            <div className="showcourses-list">
            <h2 style={{textAlign:'center'}}>{course.title}</h2>
            <img src={course.imageLink} alt={"Image of course " + course.courseId}  style={{width:'400px'}}/>
            <p>{course.description}</p>
            <span>Price: {course.price}</span>
            <br />
            <Button onClick={handlePurchase} variant="outlined">Purchase</Button>
            
            </div>
          </div>
        );
      } else {
        return ( <><p>Course not found</p> <h1>👻</h1></>); // or render a placeholder or loading state
      }
}

export default CoursebyId;