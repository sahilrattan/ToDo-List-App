import React, { useState, useRef, useCallback } from 'react';
import TaskInput from './TaskInput';
import ActiveTasks from './ActiveTask';
import CompletedTasks from './CompletedTask';
import EditTaskModal from './EditModalSection';

interface TaskItem {
  text: string;
  done: boolean;
}

const ToDo1: React.FC = () => {
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
    setTasks([...tasks, { text: task, done: false }]);
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
      setTasks(prev =>
        prev.map((t, idx) =>
          idx === editingIndex ? { ...t, text: editedTask } : t
        )
      );
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
    <div className='bg-gray-200 p-5 rounded-lg shadow-md mx-auto mt-0 min-w-90 w-full max-w-4xl'>
      <p className='text-3xl text-black text-center'>ToDo List</p>
      <br />

      {/* Task Input Section */}
      <TaskInput
        task={task}
        onChange={setTask}
        onAddClick={handleClick}
        inputRef={inputRef}
      />
      <br />

      {/* Active Tasks Section */}
      <ActiveTasks
        tasks={activeTasks}
        handleDelete={(index) =>
          handleDelete(tasks.findIndex(task => task.text === activeTasks[index].text && !task.done))
        }
        handleDone={handleDone}
        handleEdit={openEditModal}
        openEditModal={openEditModal}
      />

      {/* Completed Tasks Section */}
      <CompletedTasks
        tasks={completedTasks}
        handleDelete={(index) =>
          handleDelete(tasks.findIndex(task => task.text === completedTasks[index].text && task.done))
        }
      />

      {/* Reset Button */}
      {tasks.length > 0 && (
        <button
          className='mt-4 bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded transition-colors'
          onClick={handleReset}
        >
          Reset All
        </button>
      )}

      {/* Edit Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        editedTask={editedTask}
        onChange={setEditedTask}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleEditConfirm}
      />
    </div>
  );
};

export default ToDo1;
