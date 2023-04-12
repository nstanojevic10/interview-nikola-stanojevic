import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./EditTodo.scss";

function EditTodo() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [edited, setEdited] = useState("");
  const [todo, setTodo] = useState("");

  const onSaveClick = () => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mark: todo.mark,
        text: edited,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/todos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
        setEdited(data.text);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles}>
      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      <div className="edit col s10 offset-s1 m10 offset-m1 l10 offset-l1">
        <input
          type="text"
          className="form-control"
          placeholder="Input name"
          value={edited}
          onChange={(e) => {
            setEdited(e.target.value);
          }}
        />
        <div className="text-center mt-4">
          <NavLink
            to="/success"
            className="btn blue lighten-1"
            onClick={onSaveClick}
          >
            Save
          </NavLink>
        </div>
        <div className="btn-back">
          <NavLink to="/list">Back</NavLink>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
