import { PRIORITY_LABELS } from '../labels';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onRemove }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty">Задач пока нет.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? 'task done' : 'task'}>
          <label>
            <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
            <span className="task-title">{task.title}</span>
          </label>
          <span className={`priority priority-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
          <button
            type="button"
            className="remove"
            aria-label={`Удалить задачу «${task.title}»`}
            onClick={() => onRemove(task.id)}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
