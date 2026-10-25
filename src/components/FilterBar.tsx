import type { Filter } from '../types';

interface FilterBarProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
];

export function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label="Фильтр задач">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={filter === value}
          className={filter === value ? 'active' : undefined}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
