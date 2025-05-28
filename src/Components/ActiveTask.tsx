import React from 'react';

interface TaskItem {
  text: string;
  done: boolean;
}
interface ActiveTasksProps {
  tasks: TaskItem[];
  handleDelete: (index: number) => void;
  openEditModal: (index: number) => void;
  handleDone: (index: number) => void;
    handleEdit: (index: number) => void;

}
const ActiveTasks: React.FC<ActiveTasksProps> = ({
  tasks,
  handleDelete,
  openEditModal,
  handleDone,
}) => {
  return (
    <ul className='p-0 list-none'>
      {tasks.map((t, idx) => (
        <div
          className='bg-green-100 rounded-md p-3 pt-0 mb-2 shadow-sm transition-colors duration-200'
          key={idx}
        >
          <li className='text-2xl text-black px-0'>
            <br />
            {t.text}
            <button
              className='bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm'
              onClick={() => handleDelete(idx)}
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
  );
};

export default ActiveTasks;
