import type { Priority, Task } from './types';

export const STORAGE_KEY = 'task-tracker.tasks';

const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high'];

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.done === 'boolean' &&
    typeof candidate.createdAt === 'number' &&
    typeof candidate.priority === 'string' &&
    PRIORITIES.includes(candidate.priority as Priority)
  );
}

/** Reads tasks from localStorage. Corrupted or missing data falls back to an empty list. */
export function loadTasks(storage: Storage = localStorage): Task[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTask) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[], storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
