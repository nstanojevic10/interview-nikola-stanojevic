import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ToDoList from "./components/ToDoList/ToDoList";
import "./assets/css/styles.scss";
import "./App.scss";
import EditTodo from "./components/EditTodo/EditTodo";
import { NavLink } from "react-router-dom";
import Uncompleted from "./components/Uncompleted/Uncompleted";
import Completed from "./components/Completed/Completed";
import Success from "./components/Success/Success";

const App = () => {
  return (
    <BrowserRouter>
      <div className="row app">
        <div className="col s12 navbar">
          <ul id="tabs-swipe-demo" className="tabs">
            <li className="col s4 m4 l2 offset-l3 tab-li">
              <NavLink to="list" className="#test-swipe-1 black-text nav-link">
                All ToDo Lists
              </NavLink>
            </li>

            <li className="col s4 m4 l2 tab-li">
              <NavLink
                to="uncompleted"
                className="#test-swipe-2 black-text nav-link"
              >
                Uncompleted
              </NavLink>
            </li>

            <li className="col s4 m4 l2 tab-li">
              <NavLink
                to="completed"
                className="#test-swipe-3 black-text nav-link"
              >
                Completed
              </NavLink>
            </li>
          </ul>
        </div>

        <Routes>
          <Route
            path="list"
            element={
              <div id="test-swipe-1" className="col s10 offset-s1">
                <ToDoList />
              </div>
            }
          ></Route>
          <Route
            path="uncompleted"
            element={
              <div id="test-swipe-2" className="col s10 offset-s1">
                <Uncompleted />
              </div>
            }
          ></Route>
          <Route
            path="completed"
            element={
              <div id="test-swipe-3" className="col s10 offset-s1">
                <Completed />
              </div>
            }
          ></Route>
          <Route path={`/edit/:id`} element={<EditTodo />}></Route>
          <Route path="success" element={<Success />}></Route>

          <Route path="*" element={<Navigate to="list" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
