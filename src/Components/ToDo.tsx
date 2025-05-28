import React, { useState, useRef, useCallback } from "react";
import TaskInput from "./Input";
import ActiveTasks from "./ActiveTask";
import CompletedTasks from "./CompletedTask";
import EditTaskModal from "./Modal";

interface TaskItem {
  text: string;
  done: boolean;
}

const ToDo: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = useCallback(() => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    setTasks((prev) => [...prev, { text: task, done: false }]);
    setTask("");
    focusInput();
  }, [task, focusInput]);

  const handleDelete = useCallback(
    (index: number) => {
      setTasks((prev) => prev.filter((_, i) => i !== index));
      focusInput();
    },
    [focusInput]
  );

  const handleDeleteFromActiveTasks = useCallback(
    (taskIndex: number) => {
      handleDelete(taskIndex);
    },
    [handleDelete]
  );

  const handleDone = useCallback((taskIndex: number) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[taskIndex] = { ...updated[taskIndex], done: true }; 
      return updated;
    });
  }, []);

  const openEditModal = useCallback(
    (taskIndex: number) => {
      setEditingIndex(taskIndex);
      setEditedTask(tasks[taskIndex].text);
      setIsModalOpen(true);
    },
    [tasks]
  );

  const handleEditConfirm = useCallback(() => {
    if (editingIndex !== null && editedTask.trim() !== "") {
      setTasks((prev) =>
        prev.map((t, idx) =>
          idx === editingIndex ? { ...t, text: editedTask } : t
        )
      );
    }
    setIsModalOpen(false);
    focusInput();
  }, [editingIndex, editedTask, focusInput]);

  const handleReset = useCallback(() => {
    setTasks([]);
    setTask("");
    focusInput();
  }, [focusInput]);

  const activeTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .filter((task) => !task.done);

  const completedTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .filter((task) => task.done);

  return (
    <div className="bg-gray-200 p-5 rounded-lg shadow-md mx-auto mt-0 min-w-90 w-full max-w-4xl">
      <p className="text-3xl text-black text-center">ToDo List</p>
      <br />

      {/* Task Input Section */}
      <TaskInput
        task={task}
        onChange={setTask}
        onAddClick={handleClick}
        inputRef={inputRef}
      />

      <button
        className="mt-3 text-black cursor-pointer bg-green-300 px-4 py-2 rounded hover:bg-green-400 transition-colors"
        onClick={handleClick}
      >
        Add Task
      </button>
      <br />

      {/* Active Tasks Section */}
      <ActiveTasks
        tasks={activeTasks}
        handleDelete={(i) => handleDeleteFromActiveTasks(activeTasks[i].index)}
        handleDone={(i) => handleDone(activeTasks[i].index)}
        handleEdit={(i) => openEditModal(activeTasks[i].index)}
        openEditModal={(i) => openEditModal(activeTasks[i].index)}
      />

      {/* Completed Tasks Section */}
      <CompletedTasks
        tasks={completedTasks}
        handleDelete={(i) => handleDelete(completedTasks[i].index)}
      />

      {/* Reset Button */}
      {tasks.length > 0 && (
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded transition-colors"
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

export default ToDo;
