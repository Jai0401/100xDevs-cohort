import { useEffect, useState } from "react"

function GetTodo() {
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/todos/')
        .then(res => {
            return res.json()
        })
        .then(data => {
            setTodos(data)
    })
    },[todos])
    const handleClickDelete=(id)=>{
        fetch('http://localhost:3000/todos/'+id,{
            method:'DELETE'
        }).then(()=>{
            console.log("Deleted successfully")
        }).catch((err)=>{
            console.log(err)
        })
    }
    // const handleClickUpdate =(id)=>{
    //     fetch('http://localhost:3000/todos/'+id,{
    //         method : 'PUT',

    //     })
    // }
    
    return ( 
    <div className="todoList">
        <h1>Todo list</h1>
        {todos.map((todo)=>{
            return(<>
                <h2>{todo.title}</h2>
                {todo.description}
                <div className="editButtons">
                    <button onClick={()=>handleClickDelete(todo.id)}>Delete</button>
                    {/* <button onClick={()=>handleClickUpdate(todo.id)}>Update</button> */}
                </div>
                <br />
            </>
            )
        })}
    </div>
     );
}

export default GetTodo;