import { describe, expect, it } from 'vitest';
import { addTask, countActive, filterTasks, removeTask, toggleTask } from './tasks';
import type { Task } from './types';

const base: Task[] = [
  { id: '1', title: 'Write docs', done: false, priority: 'low', createdAt: 1 },
  { id: '2', title: 'Ship release', done: true, priority: 'high', createdAt: 2 },
];

describe('addTask', () => {
  it('adds a trimmed task to the top of the list', () => {
    const result = addTask(base, '  Buy milk  ', 'medium', 'new-id', 100);
    expect(result[0]).toEqual({ id: 'new-id', title: 'Buy milk', done: false, priority: 'medium', createdAt: 100 });
    expect(result).toHaveLength(3);
  });

  it('ignores empty titles', () => {
    expect(addTask(base, '   ', 'low', 'x', 100)).toBe(base);
  });

  it('does not mutate the input array', () => {
    const snapshot = [...base];
    addTask(base, 'Something', 'low', 'x', 100);
    expect(base).toEqual(snapshot);
  });
});

describe('toggleTask', () => {
  it('flips the done flag for the matching task only', () => {
    const result = toggleTask(base, '1');
    expect(result[0].done).toBe(true);
    expect(result[1]).toBe(base[1]);
  });
});

describe('removeTask', () => {
  it('removes the task with the given id', () => {
    expect(removeTask(base, '2').map((task) => task.id)).toEqual(['1']);
  });
});

describe('filterTasks', () => {
  it('returns all, active or done tasks', () => {
    expect(filterTasks(base, 'all')).toHaveLength(2);
    expect(filterTasks(base, 'active').map((task) => task.id)).toEqual(['1']);
    expect(filterTasks(base, 'done').map((task) => task.id)).toEqual(['2']);
  });
});

describe('countActive', () => {
  it('counts tasks that are not done', () => {
    expect(countActive(base)).toBe(1);
  });
});
