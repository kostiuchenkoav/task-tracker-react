import { useEffect, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { loadTasks, saveTasks } from './storage';
import { addTask, countActive, filterTasks, removeTask, toggleTask } from './tasks';
import type { Filter, Priority, Task } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <main className="app">
      <h1>Трекер задач</h1>
      <TaskForm onAdd={(title: string, priority: Priority) => setTasks((prev) => addTask(prev, title, priority))} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        onToggle={(id) => setTasks((prev) => toggleTask(prev, id))}
        onRemove={(id) => setTasks((prev) => removeTask(prev, id))}
      />
      <footer className="summary">Осталось задач: {countActive(tasks)}</footer>
    </main>
  );
}
