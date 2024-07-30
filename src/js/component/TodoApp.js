// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoList from '../component/TodoList'
import '/workspaces/react-hello-spain-73-michflorez/src/styles/TodoApp.css'

const apiUrl = 'https://playground.4geeks.com/todo/users/alesanchezr';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
       
          setTasks(data.todos);
        
      } else if (response.status === 404) {
         createUser();
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify([]),
      });
      if (response.ok) {
        console.log('User created successfully');
        fetchTasks()
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateTasks = async (updatedTasks) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(updatedTasks.map(label => ({ label, done: false }))),
      });
      if (response.ok) {
        //setTasks(updatedTasks);
        console.log('Tasks updated successfully');
      } else {
        console.error('Error updating tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };

  const addTask = async (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      const updatedTasks = [...tasks, newTask];
      await updateTasks(updatedTasks);
      setNewTask('');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/todos/'+ id, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks()
        console.log('tarea eliminada');
      } else {
        console.error('Error clearing tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  const clearAllTasks = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks([]);
        console.log('All tasks cleared successfully');
      } else {
        console.error('Error clearing tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  return (
    <div className="todo-app">
      <h1>todos</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={addTask}
        placeholder="What needs to be done?"
      />
      <TodoList tasks={tasks} deleteTask={deleteTask} newTask={newTask} setNewTask={setNewTask} />
      <button onClick={clearAllTasks}>Clear All Tasks</button>
    </div>
  );
};

export default TodoApp;
