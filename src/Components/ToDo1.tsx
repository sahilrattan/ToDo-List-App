import React, { useState, useRef, useCallback } from 'react';

interface ToDo1Props {
    name?: string;
}
 
interface TaskItem {
    text: string;
    done: boolean;
}

const ToDo1: React.FC<ToDo1Props> = () => {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

     const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleClick = useCallback(() => {
        if (task.trim() === '') {
            alert('Please enter a task');
             return;
        }
        setTasks([...tasks, { text: task, done: false  }]);
        setTask('');
        focusInput();
    }, [task, tasks]);

    const handleDelete = (index: number) => {
        const newTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(newTasks);
        focusInput();
    };

    const openEditModal = (index: number) => {
        const taskText = activeTasks[index].text;
        const originalIndex = tasks.findIndex(t => t.text === taskText && !t.done);
        setEditingIndex(originalIndex);
        setEditedTask(taskText);
        setIsModalOpen(true);
    };

    const handleEditConfirm = () => {
        if (editingIndex !== null && editedTask.trim() !== '') {
            setTasks(prev => {
                return prev.map((t, idx) => 
                    idx === editingIndex ? { ...t, text: editedTask } : t 
                );
            });
        }
        setIsModalOpen(false);
        focusInput();
    };

    const handleReset = () => {
        setTasks([]);
        setTask('');
        focusInput();
    };

    const handleDone = (index: number) => {
        const taskText = activeTasks[index].text;
        const originalIndex = tasks.findIndex(t => t.text === taskText && !t.done);
        
        setTasks(prev => {
            const updated = [...prev];
            updated[originalIndex] = { ...updated[originalIndex], done: true };
            return updated;
        });
    };

    const activeTasks = tasks.filter(task => !task.done);
    const completedTasks = tasks.filter(task => task.done);

    return (
        <>
            <div className='bg-gray-200 p-5 rounded-lg shadow-md  mx-auto mt-0 min-w-90 w-full max-w-4xl'>
                <p className='text-3xl text-black text-center'>ToDo List</p>
                <br />
                <input
                    ref={inputRef}
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder='Enter your task'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    
                />
                <br />
                <button 
                    className='mt-3 text-black cursor-pointer bg-green-300 px-4 py-2 rounded hover:bg-green-400 transition-colors' 
                    onClick={handleClick}
                >
                    Add Task
                </button>
                <br />
                <br />
                
                
                <ul className='p-0 list-none'>
                    {activeTasks.map((t, idx) => (
                        <div className='bg-green-100 rounded-md p-3 pt-0 mb-2 shadow-sm transition-colors duration-200' key={idx}>
                            <li className='text-2xl text-black px-0'>
                                <br />
                                {t.text}
                                <button
                                    className='bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm'
                                    onClick={() => handleDelete(tasks.findIndex(task => task.text === t.text && !task.done))}
                                >
                                    Delete
                                </button>
                                <button 
                                    className='ml-3 bg-green-300 cursor-pointer hover:bg-green-200 text-black font-bold py-1 px-2 rounded-full text-sm'
                                    onClick={() => openEditModal(idx)}
                                >
                                    Edit
                                </button>
                                <input
                                    onChange={() => handleDone(idx)}
                                    checked={t.done}
                                    className="ml-5 cursor-pointer"
                                    type="checkbox"
                                />
                            </li>
                        </div>
                    ))}
                </ul>

                {/* Completed Tasks Section */}
                {completedTasks.length > 0 && (
                    <div className='mt-6'>
                        <p className='text-2xl text-black'>Completed Tasks:</p>
                        <ul className='p-0 list-none'>
                            {completedTasks.map((t, idx) => (
                                <div className='bg-green-200 rounded-md p-3 pt-0 mb-2 shadow-sm' key={idx}>
                                    <li className='text-2xl text-black px-0'>
                                        <br />
                                        <s>{t.text}</s>
                                        <button
                                            className='bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm'
                                            onClick={() => handleDelete(tasks.findIndex(task => task.text === t.text && task.done))}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}

                {tasks.length > 0 && (
                    <button 
                        className='mt-4 bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded transition-colors'
                        onClick={handleReset}
                    >
                        Reset All
                    </button>
                )}

                
                {isModalOpen && (
                    <div className="fixed inset-0 bg-blue-300 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Edit Task</h3>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={editedTask}
                                            onChange={(e) => setEditedTask(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            autoFocus
                                            onKeyPress={(e) => e.key === 'Enter' && handleEditConfirm()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    className="mr-3 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700"
                                    onClick={handleEditConfirm}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ToDo1;