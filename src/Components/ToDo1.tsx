import React, { useImperativeHandle } from 'react';
import { useState,useRef } from 'react';


// type inputProps={
//     placeholder?: string;
// }

interface ToDo1Props {
    name?:string;
}
const ToDo1:React.FC <ToDo1Props>= () => {

    const [task, setTask] = useState<string>(''); 
    const [tasks, setTasks] = useState<string[]>([]); 

    const inputRef = React.useRef<HTMLInputElement>(null);
    const focusInput = () => {
        if (inputRef.current) { 
            inputRef?.current.focus();
        }
    };

      


    const handleClick = () => {
        if (task.trim() === '') {
            alert('Please enter a task');
            focusInput();
            return;
            
        }
        setTasks([...tasks, task]);
        setTask('');
    }
    const handleDelete = (index: number) => {
        const newTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(newTasks);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleEdit = (index: number) => {
        const newTask = prompt('Edit your task', tasks[index]);
        if (newTask !== null && newTask.trim() !== '') {
            const newTasks = tasks.map((t, idx) => (idx === index ? newTask : t)); 
            setTasks(newTasks);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    const handleReset = () => {
        setTasks([]);
        
       
    };
    
const [doneTasks, setDoneTasks] = useState<boolean[]>([]);

const handleDone = (index: number) => {
    setDoneTasks((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
    });
};

return (
    <>
        <p className='text-3xl text-align:center'>ToDo List</p>
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
        <button className='mt-3 mr-21 bg-green-300' onClick={handleClick}>
            Add Task
        </button>
        <br />
        <ul>
            {tasks.map((t, idx) => (
                <li className='text-2xl' key={idx}>
                    <br />
                    {doneTasks[idx] ? <s>{t}</s> : t}
                    <button
                        className='bg-green-500 btn-sm hover:bg-green-700 ml-5 text-black font-bold py-2 px-4 rounded-full'
                        onClick={() => handleDelete(idx)}
                    >
                        Delete Task
                    </button>
                    <button className='ml-3' onClick={() => handleEdit(idx)}>
                        Edit Task
                    </button>
                    <button className='ml-3' onClick={() => handleDone(idx)}>
                        Done
                    </button>
                </li>
            ))}
            <br />
            <button className='ml-100' onClick={() => handleReset()}>
                Reset
            </button>
        </ul>
    </>
);
}
export default ToDo1;
