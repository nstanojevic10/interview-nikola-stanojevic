import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "../ToDoList/ToDoList.scss";
import MarkDone from "../MarkDone/MarkDone";
import DeleteDone from "../DeleteDone/DeleteDone";

const Uncompleted = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  let modalRef = useRef(null);

  const getUncompletedTodos = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/todos/uncompleted")
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
    getUncompletedTodos();
  }, []);

  return (
    <div style={styles}>
      {loading && (
        <div className="progress load">
          <div className="indeterminate"></div>
        </div>
      )}
      <h3>Uncompleted</h3>
      <div>
        <div className="collection">
          {todos.map((todo) => (
            <div
              className="collection-item task row"
              key={todo.id}
              style={{ textDecoration: "line-through" }}
            >
              <div className="text col s12 m10 offset-m1 l6">{todo.text}</div>
              <div className="buttons col s12 m10 offset-m1 l4 offset-l2">
                <MarkDone
                  todo={todo}
                  getTodos={getUncompletedTodos}
                  setLoading={setLoading}
                />

                <NavLink
                  to={`/edit/${todo.id}`}
                  className="waves-effect waves-light btn button blue lighten-1"
                >
                  Edit
                </NavLink>

                <DeleteDone
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  modalRef={modalRef}
                  todo={todo}
                  setLoading={setLoading}
                  getTodos={getUncompletedTodos}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uncompleted;
