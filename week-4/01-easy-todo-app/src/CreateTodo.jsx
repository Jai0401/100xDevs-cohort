import { useState } from "react";


function CreateTodo(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
        const todo = {title, description}
        fetch('http://localhost:3000/todos/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
            }).then(() => {
            // history.go(-1);
            history.push('/');
            })
  }

    return(
        <div className="form">

        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text"
        required
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
         />
        <label htmlFor="description">Description</label>
        <input type="text"
        required
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
         />
        <button>Add TODO</button>

        </form>
        </div>
    )
}

export default CreateTodo;