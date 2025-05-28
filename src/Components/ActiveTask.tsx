import React from 'react';
import TaskList from './List'
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
         <TaskList
          key={idx}
          task={t}
          index={idx}
          handleDelete={handleDelete}
          openEditModal={openEditModal}
          handleDone={handleDone}
        />
      ))}
    </ul>
  );
};

export default ActiveTasks;

