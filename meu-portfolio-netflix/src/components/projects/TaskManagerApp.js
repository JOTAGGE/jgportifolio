// src/components/projects/TaskManagerApp.js

import React, { useState, useEffect } from 'react';
import uuidv4 from '../../utils/uuidv4'; // Importa a função uuidv4

const TaskManagerApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Gerenciador de Tarefas</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-grow p-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Adicionar nova tarefa..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') addTask(); }}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-r-lg transition duration-200"
                        onClick={addTask}
                    >
                        Adicionar
                    </button>
                </div>
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${task.completed ? 'bg-gray-700' : 'bg-gray-600'} transition duration-200`}
                        >
                            <span
                                className={`text-white text-lg ${task.completed ? 'line-through text-gray-400' : ''} cursor-pointer`}
                                onClick={() => toggleTaskCompletion(task.id)}
                            >
                                {task.text}
                            </span>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-200 text-sm"
                                onClick={() => deleteTask(task.id)}
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                    {tasks.length === 0 && (
                        <p className="text-gray-400 text-center py-4">Nenhuma tarefa adicionada ainda!</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskManagerApp;
