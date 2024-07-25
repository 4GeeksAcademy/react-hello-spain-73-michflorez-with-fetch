// src/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, deleteTask }) => {
    return (
        <ul className="task-list">
            {tasks.length === 0 ? (
                <li>No tasks, add a task</li>
            ) : (
                tasks.map((task, index) => (
                    <TodoItem key={index} task={task} deleteTask={() => deleteTask(index)} />
                ))
            )}
        </ul>
    );
};

export default TodoList;
