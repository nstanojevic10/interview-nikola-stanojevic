import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

let todos = [
  { text: "Learn HTML", mark: true, id: 1 },
  { text: "Learn CSS", mark: true, id: 2 },
  { text: "Learn JavaScript", mark: true, id: 3 },
  { text: "Learn React", mark: true, id: 4 },
  { text: "Learn Git", mark: true, id: 5 },
];

// dohtanje svih Todo elemenata
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/uncompleted", (req, res) => {
  const uncompleted = todos.filter((el) => el.mark === true);
  res.json(uncompleted);
});

app.get("/api/todos/completed", (req, res) => {
  const completed = todos.filter((el) => el.mark === false);
  res.json(completed);
});

// dohvatanje pojedinog Todo elementa po ID-u
app.get("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// azuriranje postojeceg Todo elementa
app.put("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.mark = req.body.mark;
    todo.text = req.body.text;
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// dodavanje novog Todo elementa
app.post("/api/todos", (req, res) => {
  const newTodo = req.body;
  newTodo.mark = true;
  const lastId = todos.length === 0 ? 1 : todos[todos.length - 1].id;
  newTodo.id = lastId + 1;
  todos.push(newTodo);
  res.json(newTodo);
});

// brisanje postojeceg Todo elementa
app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.json({ message: "Todo deleted" });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
