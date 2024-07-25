
import React from 'react';

export const TodoItem = ({ task, deleteTask }) => {
    return (
        <li>
            {task}
            <span className="delete" onClick={deleteTask}>
                X
            </span>
        </li>
    );
};

export default TodoItem;