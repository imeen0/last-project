import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TaskManager = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskChanges, setTaskChanges] = useState({});

  // Fetch tasks
  useEffect(() => {
    if (user) {
      axios
        .get(`/tasks/${user._id}`)
        .then((res) => setTasks(res.data.tasks))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [user]);

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const desc = e.target.desc.value.trim();
    if (!title || !desc) return;

    try {
      const res = await axios.post("/tasks/create", {
        userId: user._id,
        title,
        desc,
      });
      setTasks([...tasks, res.data.task]);
      e.target.reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/delete/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start Editing Task
  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setTaskChanges({ title: task.title, desc: task.desc });
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    setTaskChanges({ ...taskChanges, [e.target.name]: e.target.value });
  };

  // Save Task Updates
  const saveTask = async (taskId) => {
    try {
      const res = await axios.put(`/tasks/update/${taskId}`, taskChanges);
      setTasks(tasks.map((task) => (task._id === taskId ? res.data.task : task)));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Cancel Editing
  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Task Manager</h2>

      {/* Task Form */}
      <form onSubmit={addTask}>
        <div className="mb-2">
          <input type="text" className="form-control" name="title" placeholder="Task Title" required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" name="desc" rows="2" placeholder="Task Description" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTaskId === task._id ? (
              // Edit Mode
              <div className="w-100">
                <input type="text" className="form-control mb-2" name="title" value={taskChanges.title} onChange={handleEditChange} />
                <textarea className="form-control" rows="2" name="desc" value={taskChanges.desc} onChange={handleEditChange}></textarea>
              </div>
            ) : (
              // View Mode
              <div>
                <h5>{task.title}</h5>
                <p>{task.desc}</p>
              </div>
            )}

            <div>
              {editingTaskId === task._id ? (
                <>
                  <button className="btn btn-success btn-sm me-2" onClick={() => saveTask(task._id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(task)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
