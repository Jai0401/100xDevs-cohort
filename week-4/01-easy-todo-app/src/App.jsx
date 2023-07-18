import './App.css'
import CreateTodo from './CreateTodo'
import GetTodo from './GetTodo'

function App() {

  return (
      <div className='todoApp'>
      <h1>Easy Todo App</h1>
      <CreateTodo/>
      <GetTodo/>
      </div>
  )
}

// function Todo(props) {
//     // Add a delete button here so user can delete a TODO.
//     return <div>
//         {props.title}
//     </div>
// }

export default App
