import {useEffect, useState,useRef } from "react"
import Items from "./Items"
const App = () => {
  const [input, setInput] = useState(" ")
  const [Todos, setTodos] = useState([])
  const isFirstRender = useRef(true);


  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Input Can't be Empty")
      return;
    }
    const newTodo = {
      id: Date.now(),
      data: input
    };
    setTodos([...Todos, newTodo]);
    setInput("")
    console.log("My Todo =", Todos);

  };
  
  useEffect(()=>{
    const savedTodos = JSON.parse(localStorage.getItem("Todos"))
    if(savedTodos) setTodos(savedTodos);
  },[])

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos",JSON.stringify(Todos))
    
  }, [Todos])
  

  const deleteTodo = (id) => {
    setTodos(Todos.filter(todo => todo.id !== id))
  }
  return (
    // <></> This is fragment (empty open & close tage is fragment).
    <>
      <div className="div">
        <div className="app-container">
          <form
            className="input-container"
            onSubmit={addTodo}
          >
            <input
              value={input}
              type="text"
              placeholder="Add A New Todo ..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button>Add</button>
          </form>
          <ul className="items">
            {Todos.map((todo) => (
              <Items
                key={todo.id}
                data={todo.data}
                id={todo.id}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App