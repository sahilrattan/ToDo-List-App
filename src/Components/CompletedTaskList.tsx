import React from 'react';

interface TaskItem {
  text: string;
  done: boolean;
}

interface CompletedTaskItemProps {
  task: TaskItem;
  index: number;
  handleDelete: (index: number) => void;
}

const CompletedTaskList: React.FC<CompletedTaskItemProps> = ({
  task,
  index,
  handleDelete,
}) => {
  return (
    <li className='bg-green-200 rounded-md p-3 pt-0 mb-2 shadow-sm list-none'>
      <div className='text-2xl text-black px-0'>
        <br />
        <s>{task.text}</s>
        <button
          className='bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm'
          onClick={() => handleDelete(index)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default CompletedTaskList;
