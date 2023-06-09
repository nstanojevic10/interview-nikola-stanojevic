import React, { useEffect, useState, useRef } from "react";
import styles from "../ToDoList/ToDoList.scss";
import DeleteDone from "../DeleteDone/DeleteDone";
import MarkDone from "../MarkDone/MarkDone";

const Completed = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  let modalRef = useRef(null);

  const getCompletedTodos = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/todos/completed")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompletedTodos();
  }, []);

  return (
    <div style={styles}>
      {loading && (
        <div className="progress load">
          <div className="indeterminate"></div>
        </div>
      )}
      <h3>Completed</h3>
      <div>
        <div className="collection">
          {todos.map((todo) => (
            <div className="collection-item task row" key={todo.id}>
              <div
                className="text col s12 m10 offset-m1 l6"
                style={{ textDecoration: "line-through" }}
              >
                {todo.text}
              </div>
              <div className="buttons col s12 m10 offset-m1 l4 offset-l2">
                <MarkDone
                  todo={todo}
                  getTodos={getCompletedTodos}
                  setLoading={setLoading}
                />
                <DeleteDone
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  modalRef={modalRef}
                  todo={todo}
                  setLoading={setLoading}
                  getTodos={getCompletedTodos}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Completed;
