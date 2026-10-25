import type { Priority } from './types';

/** Подписи приоритетов для интерфейса. Сами значения в данных остаются латиницей. */
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};
