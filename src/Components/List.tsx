import React from 'react';

interface TaskItem {
  text: string;
  done: boolean;
}

interface TaskItemComponentProps {
  task: TaskItem;
  index: number;
  handleDelete: (index: number) => void;
  openEditModal: (index: number) => void;
  handleDone: (index: number) => void;
}

const TaskList: React.FC<TaskItemComponentProps> = ({
  task,
  index,
  handleDelete,
  openEditModal,
  handleDone,
}) => {
  return (
    <>
      <br />
      <li className="bg-green-100 rounded-md p-3 pt-0 mb-2 shadow-sm transition-colors duration-200 list-none">
        <div className="text-2xl text-black px-0">
          <br />
          {task.text}
          <button
            className="bg-green-300 cursor-pointer hover:bg-green-200 ml-5 text-black font-bold py-1 px-2 rounded-full text-sm"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
          <button
            className="ml-3 bg-green-300 cursor-pointer hover:bg-green-200 text-black font-bold py-1 px-2 rounded-full text-sm"
            onClick={() => openEditModal(index)}
          >
            Edit
          </button>
          <input
            onChange={() => handleDone(index)}
            checked={task.done}
            className="ml-5 cursor-pointer"
            type="checkbox"
          />
        </div>
      </li>
    </>
  );
};

export default TaskList;
