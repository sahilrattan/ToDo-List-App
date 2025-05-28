import React from "react";

interface TaskInputProps {
  task: string;
  onChange: (value: string) => void;
  onAddClick: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TaskInput: React.FC<TaskInputProps> = ({ task, onChange, inputRef }) => {
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your task"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <br />
    </div>
  );
};

export default TaskInput;
