import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]); // State to hold the list of tasks
  const [newTask, setNewTask] = useState(''); // State to hold the new task input value

  const API_URL = 'https://playground.4geeks.com/todo/user/alesanchezr'; // API endpoint URL

  // Fetch tasks from API on component mount
  useEffect(() => {
    fetch(API_URL) // Make a GET request to the API
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`); // Handle HTTP errors
        }
        return resp.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log('Initial data from server:', data); // Log the initial data received from the server
        setTodos(data); // Set the tasks to the fetched data
      })
      .catch(error => {
        console.error('Failed to fetch initial data:', error); // Log any errors that occur during the fetch
      });
  }, []);

  // Function to add a task
  const addTask = () => {
    if (newTask.trim() === '') return; // Check if the new task input is empty

    const newTodos = [...todos, { label: newTask, done: false }]; // Add the new task to the existing list
    setTodos(newTodos); // Update the state with the new list
    setNewTask(''); // Clear the input field

    syncWithServer(newTodos); // Sync the updated list with the server
  };

  // Function to remove a specific task
  const removeTask = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index); // Remove the task at the specified index
    setTodos(newTodos); // Update the state with the new list

    syncWithServer(newTodos); // Sync the updated list with the server
  };

  // Function to clear all tasks
  const clearAllTasks = () => {
    setTodos([]); // Clear all tasks from the state

    fetch(API_URL, {
      method: "DELETE", // Use the DELETE method to remove all tasks
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`); // Handle HTTP errors
      }
      console.log('User and all tasks deleted from server'); // Log success message
    })
    .catch(error => {
      console.error('Failed to delete user from server:', error); // Log any errors that occur during the fetch
    });
  };

  // Function to sync tasks with server
  const syncWithServer = (tasks) => {
    fetch(API_URL, {
      method: "PUT", // Use the PUT method to update tasks
      body: JSON.stringify(tasks), // Send the updated list of tasks as JSON
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`); // Handle HTTP errors
      }
      return resp.json(); // Parse the response as JSON
    })
    .then(data => {
      console.log('Synced with server:', data); // Log the response data
    })
    .catch(error => {
      console.error('Failed to sync with server:', error); // Log any errors that occur during the fetch
    });
  };

  return (
    <div className="todo-app" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em', color: '#f5a5a5', margin: '0' }}>todos</h1>
      <h2 style={{ fontSize: '1.5em', color: '#f5a5a5', margin: '10px 0' }}>Todo List</h2>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask} // Bind the input value to the newTask state
        onChange={(e) => setNewTask(e.target.value)} // Update the state when the input value changes
        style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '10px' }}
      />
      <button onClick={addTask} style={{ marginBottom: '10px', padding: '10px 15px', cursor: 'pointer' }}>
        Add Task
      </button>
      <button onClick={clearAllTasks} style={{ marginBottom: '10px', padding: '10px 15px', cursor: 'pointer' }}>
        Clear All Tasks
      </button>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span>{todo.label}</span>
            <button
              onClick={() => removeTask(index)} // Call the removeTask function with the index of the task to remove
              style={{ float: 'right', cursor: 'pointer', color: 'red', background: 'none', border: 'none' }}
            >
              Clear Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
