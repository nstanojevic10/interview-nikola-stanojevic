import React, { useState } from "react";
import styles from "./AddToDo.scss";

const AddToDo = ({ getAllTodos }) => {
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [newToDo, setNewToDo] = useState("");

  const onAddNew = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newToDo,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setNewToDo("");
        getAllTodos();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onValidateForm = () => {
    if (newToDo) {
      setFormIsValid(true);
      onAddNew();
      setFormIsValid(false);
    } else {
      setFormIsValid(false);
    }
  };

  return (
    <div style={styles}>
      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      <h4>Add new todo</h4>
      <div>
        <form>
          <div className="input-field">
            <input
              id="new_todo"
              placeholder="New todo"
              type="text"
              className={formIsValid ? "valid" : "invalid"}
              value={newToDo}
              onChange={(e) => {
                if (e.target.value) {
                  setFormIsValid(true);
                } else {
                  setFormIsValid(false);
                }
                setNewToDo(e.target.value);
              }}
            />

            <span
              className="helper-text"
              data-error="Invalid"
              data-success="Valid"
            />
          </div>

          <div>
            <button
              className="btn btn-add"
              onClick={() => {
                onValidateForm();
              }}
              type="button"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToDo;
