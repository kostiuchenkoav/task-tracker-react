import type { Filter, Priority, Task } from './types';

/**
 * Pure task operations. They never mutate their input and return new arrays,
 * which keeps them easy to test and safe to use with React state.
 */

export function addTask(
  tasks: Task[],
  title: string,
  priority: Priority,
  id: string = crypto.randomUUID(),
  now: number = Date.now(),
): Task[] {
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return tasks;
  }
  const task: Task = { id, title: trimmed, done: false, priority, createdAt: now };
  return [task, ...tasks];
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.done);
    case 'done':
      return tasks.filter((task) => task.done);
    case 'all':
      return tasks;
  }
}

export function countActive(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length;
}
