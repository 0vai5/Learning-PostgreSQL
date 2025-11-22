import express from "express";
import connectDB, { pool } from "./db/db.js";
import cors from "cors";
import { queryExecutor } from "./helper/db.helper.js";
import {
  createTableQuery,
  deleteQuery,
  getQuery,
  insertQuery,
  updateQuery,
} from "./constants/query.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// C: Create Todo
app.post("/", async (req, res) => {
  const { todo, status } = req.body;

  //   if (!todo || !status) {
  //     return res.status(400).json({
  //       message: "Invalid data",
  //     });
  //   }
  try {
    const createTable = await queryExecutor(createTableQuery);

    const insertTodo = await queryExecutor(insertQuery, [todo, status]);

    return res.status(201).json({
      message: "Todo created successfully",
      todoId: insertTodo.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// R: Read Todos

app.get("/", async (req, res) => {
  try {
    const todos = await queryExecutor(getQuery);

    return res.status(200).json({
      message: "Todos fetched successfully",
      todos: todos.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// U: Update Todos

app.put("/:id", async (req, res) => {
  try {
    const { todo, status } = req.body;
    const { id } = req.params;

    // if (!todo || !status) {
    //   return res.status(400).json({
    //     message: "Invalid data",
    //   });
    // }

    const updatedTodo = await queryExecutor(updateQuery, [todo, status, id]);

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// D: Delete Todos

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await queryExecutor(deleteQuery, [id]);

    return res.status(200).json({
      message: "Todo deleted successfully",
      todo: deletedTodo.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
