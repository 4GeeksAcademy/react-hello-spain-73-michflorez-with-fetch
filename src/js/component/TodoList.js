import React, { useState, useEffect } from "react";
import '/workspaces/react-hello-spain-73-michflorez-with-fetch/src/styles/TodoApp.css';

const TodoList = ({tasks,deleteTask,setNewTask,newTask}) => {
 

  

  // const updateTasksOnServer = (updatedTasks) => {
  //   fetch(API_URL, {
  //     method: "PUT",
  //     body: JSON.stringify(updatedTasks),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => setTasks(data))
  //     .catch(error => console.error("Error updating tasks:", error));
  // };

  // const addTask = () => {
  //   if (newTask.trim() === "") return;
  //   const newTasks = [...tasks, { label: newTask, done: false }];
  //   updateTasksOnServer(newTasks);
  //   setNewTask("");
  // };

  // const removeTask = (index) => {
  //   const newTasks = tasks.filter((_, idx) => idx !== index);
  //   updateTasksOnServer(newTasks);
  // };

  // // const clearTasks = () => {
  // //   fetch(API_URL, {
  // //     method: "DELETE",
  // //     headers: {
  // //       "Content-Type": "application/json"
  // //     }
  // //   })
  //     .then(response => {
  //       if (response.ok) setTasks([]);
  //     })
  //     .catch(error => console.error("Error clearing tasks:", error));
  // };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="add-task-button" onClick={()=>console.log("addTask")}>Add Task</button>
      <button className="clear-tasks-button" onClick={()=>console.log("deleteTask")}>Clear All Tasks</button>
    </div>
  );
};

export default TodoList;
