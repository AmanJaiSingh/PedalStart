import React from "react";
import TaskList from "./components/TaskList";
import "./index.css";
// import { config } from "dotenv";
// config();

const App = () => {
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="task-form-container">
        <TaskList />
      </div>
    </div>
  );
};

export default App;
