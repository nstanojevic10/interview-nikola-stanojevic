import React, { useEffect } from "react";
import M from "materialize-css";

const DeleteDone = ({
  selectedTodo,
  setSelectedTodo,
  modalRef,
  todo,
  setLoading,
  getTodos,
}) => {
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
        getTodos();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    M.Modal.init(modalRef);
  }, [modalRef]);

  return (
    <div>
      {/* delete btn - poziva modal */}
      <button
        data-target="modal_delete"
        className="waves-effect waves-light btn button red accent-4 modal-trigger"
        onClick={() => {
          setSelectedTodo(todo);
        }}
      >
        Delete
      </button>

      {/* modal - funkcija delete */}
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

export default DeleteDone;
