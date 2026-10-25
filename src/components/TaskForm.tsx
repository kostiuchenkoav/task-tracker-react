import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority } from '../types';

interface TaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() === '') {
      return;
    }
    onAdd(title, priority);
    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="task-title">
        Task title
      </label>
      <input
        id="task-title"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label className="visually-hidden" htmlFor="task-priority">
        Priority
      </label>
      <select
        id="task-priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
