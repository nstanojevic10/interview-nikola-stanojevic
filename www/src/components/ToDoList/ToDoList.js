import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ToDoList.scss";
import AddToDo from "../AddToDo/AddToDo";
import DeleteDone from "../DeleteDone/DeleteDone";
import MarkDone from "../MarkDone/MarkDone";

const ToDoList = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  let modalRef = useRef(null);

  const getAllTodos = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/todos")
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
    getAllTodos();
  }, []);

  return (
    <div style={styles}>
      {loading && (
        <div className="progress load">
          <div className="indeterminate"></div>
        </div>
      )}

      <h3>All Todo items</h3>
      <div className="collection collection-task">
        {todos.map((todo) => (
          <div className="collection-item task row" key={todo.id}>
            <div
              className="text col s12 m10 offset-m1 l6"
              style={
                todo.mark === true
                  ? { textDecoration: "none" }
                  : { textDecoration: "line-through" }
              }
            >
              {todo.text}
            </div>

            <div className="buttons col s12 m10 offset-m1 l4 offset-l2">
              <MarkDone
                getTodos={getAllTodos}
                todo={todo}
                setLoading={setLoading}
              />

              {todo.mark === true ? (
                <NavLink
                  to={`/edit/${todo.id}`}
                  className="waves-effect waves-light btn button blue lighten-1"
                >
                  Edit
                </NavLink>
              ) : (
                <NavLink
                  disabled
                  to={`/edit/${todo.id}`}
                  className="waves-effect waves-light btn button blue lighten-1"
                >
                  Edit
                </NavLink>
              )}

              <DeleteDone
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                modalRef={modalRef}
                todo={todo}
                setLoading={setLoading}
                getTodos={getAllTodos}
              />
            </div>
          </div>
        ))}
      </div>

      <AddToDo getAllTodos={getAllTodos} />
    </div>
  );
};

export default ToDoList;
