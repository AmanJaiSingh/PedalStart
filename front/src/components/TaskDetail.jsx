import React, { useState } from "react";
import axios from "axios";

const TaskDetail = ({ task, onUpdateTask, onDeleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/api/tasks/${task._id}`, {
        title,
        description,
        dueDate,
        completed,
      })
      .then((response) => onUpdateTask(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/tasks/${task._id}`)
      .then(() => onDeleteTask(task._id))
      .catch((error) => console.error(error));
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="task-detail">
      <h2>Task Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={dueDate ? dueDate.substring(0, 10) : ""}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label>
          Completed
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Update Task</button>
        <button type="button" onClick={handleDelete}>
          Delete Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetail;
