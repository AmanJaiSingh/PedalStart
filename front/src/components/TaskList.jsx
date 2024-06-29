import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskDetail from "./TaskDetail";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setSelectedTask(null); // Deselect the task to refresh the details
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    if (selectedTask && selectedTask._id === id) {
      setSelectedTask(null); // Deselect the task if it's being deleted
    }
  };

  return (
    <div>
      <div className="task-form-container">
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <div className="task-list-container">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} onClick={() => handleSelectTask(task)}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>
      {selectedTask && (
        <TaskDetail
          key={selectedTask._id}
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskList;
