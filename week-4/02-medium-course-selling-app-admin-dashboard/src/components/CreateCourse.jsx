import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageLink, setImagelink] = React.useState(""); 
    const [published, setPublished] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = {title, description, price, imageLink, published};
        fetch('http://localhost:3000/admin/courses',{
            method : 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
        }),
            body: JSON.stringify(course)
        }).then(()=>{
            console.log("Course posted successfully")
        }).catch((err)=>{
            console.log("error : ",err);
        })

    }
    return <div>
        <h1>Create Course Page</h1>
        <form onSubmit={handleSubmit}>
        <label >Title</label>
        <input type={"text"} value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <label >Description</label>
        <input type={"text"} value={description} onChange={e => setDescription(e.target.value)} />
        <br />
        <label >Price</label>
        <input type={"text"} value={price} onChange={e => setPrice(e.target.value)} />
        <br />
        <label >Image</label>
        <input type={"text"} value={imageLink} onChange={e => setImagelink(e.target.value)} />
        <br />
        <input type="checkbox" name="Published" value={published} onClick={()=> setPublished(!published) } id="publish"/>
        <label htmlFor="publish">Publish</label>
        <br />
        <button>Create Course</button>
        </form>
        
    </div>
}
export default CreateCourse;