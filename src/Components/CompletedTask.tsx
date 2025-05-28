import React from 'react';
import CompletedTaskItemComponent from './CompletedTaskList';

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
        {tasks.map((task, idx) => (
          <CompletedTaskItemComponent
            key={idx}
            task={task}
            index={idx}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
