import React, { useEffect, useState, useRef } from "react";
import styles from "../ToDoList/ToDoList.scss";
import M from "materialize-css";

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

  const onMarkDone = (todo) => {
    setLoading(true);
    fetch(`http://localhost:3001/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mark: !todo.mark,
        text: todo.text,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(() => {
        getCompletedTodos();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onDelete = (todo) => {
    setLoading(true);
    fetch(`http://localhost:3001/api/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(() => {
        getCompletedTodos();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompletedTodos();

    M.Modal.init(modalRef);
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
                <button
                  className="waves-effect waves-light btn button yellow accent-4"
                  onClick={() => {
                    onMarkDone(todo);
                  }}
                >
                  Unmark
                </button>
                <button
                  data-target="modal_delete"
                  className="waves-effect waves-light btn button red accent-4 modal-trigger"
                  onClick={() => {
                    setSelectedTodo(todo);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="modal_delete"
        className="modal"
        ref={(Modal) => (modalRef = Modal)}
      >
        <div className="modal-content center-align">
          <h4>Delete</h4>
          <p>Are you sure? {selectedTodo?.text} will be deleted</p>
        </div>

        <div className="modal-footer">
          <div className="buttons">
            <button
              className="waves-effect waves-light btn button red accent-4 modal-close"
              onClick={() => {
                onDelete(selectedTodo);
              }}
            >
              Yes, Delete
            </button>

            <button
              data-target="modal_delete"
              className="waves-effect waves-light btn button blue accent-4 modal-close"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
