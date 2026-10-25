export type Priority = 'low' | 'medium' | 'high';

export type Filter = 'all' | 'active' | 'done';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  createdAt: number;
}
