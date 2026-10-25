import { useState } from 'react';
import type { FormEvent } from 'react';
import { PRIORITY_LABELS } from '../labels';
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
        Название задачи
      </label>
      <input
        id="task-title"
        type="text"
        placeholder="Что нужно сделать?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label className="visually-hidden" htmlFor="task-priority">
        Приоритет
      </label>
      <select
        id="task-priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
      >
        <option value="low">{PRIORITY_LABELS.low}</option>
        <option value="medium">{PRIORITY_LABELS.medium}</option>
        <option value="high">{PRIORITY_LABELS.high}</option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  );
}
