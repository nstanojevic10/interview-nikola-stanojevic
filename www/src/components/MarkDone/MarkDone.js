import React from "react";

const MarkDone = ({ todo, setLoading, getTodos }) => {
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
      .then((data) => {
        getTodos();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <button
      className="waves-effect waves-light btn button yellow accent-4"
      onClick={() => {
        onMarkDone(todo);
      }}
    >
      {todo.mark === true ? "Mark" : "Unmark"}
    </button>
  );
};

export default MarkDone;
