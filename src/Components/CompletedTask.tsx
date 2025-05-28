import React from 'react';

interface TaskItem {
  text: string;
  done: boolean;
}

interface CompletedTasksProps {
  tasks: TaskItem[];
  handleDelete: (index: number) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks, handleDelete }) => {
  if (tasks.length === 0) return null;

  return (
    <div className='mt-6'>
      <p className='text-2xl text-black'>Completed Tasks:</p>
      <ul className='p-0 list-none'>
        {tasks.map((t, idx) => (
          <div
            className='bg-green-200 rounded-md p-3 pt-0 mb-2 shadow-sm'
            key={idx}
          >
            <li className='text-2xl text-black px-0'>
              <br />
              <s>{t.text}</s>
              <button
                className='bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm'
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
