import React from 'react'

const Items = ({ data, deleteTodo, id }) => {
  return (
    <>
      <li className="todo-item" >{data}
        <button onClick={() => deleteTodo(id)}>Delete</button>
      </li>
    </>
  );
};

export default Items