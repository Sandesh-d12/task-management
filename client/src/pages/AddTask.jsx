import React, { useState } from 'react';
import {useCreateTask} from "../api/task"

function AddTask() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { handleCreateTask, loading, error } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateTask({title, content}); 
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl text-red-900 font-bold underline">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
      {error && <p>Error adding task.</p>}
    </form>
  );
}

export default AddTask;
