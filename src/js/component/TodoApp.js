// src/TodoApp.js
import React, { useState } from 'react';
import TodoList from './TodoList';
import '/workspaces/react-hello-spain-73-michflorez/src/styles/TodoApp.css';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        if (e.key === 'Enter' && newTask.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
            <TodoList tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
};

export default TodoApp;
