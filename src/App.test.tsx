import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { STORAGE_KEY } from './storage';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a task and shows it in the list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название задачи'), 'Write tests');
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Осталось задач: 1')).toBeInTheDocument();
  });

  it('marks a task as done and filters the list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название задачи'), 'First');
    await user.click(screen.getByRole('button', { name: 'Добавить' }));
    await user.type(screen.getByLabelText('Название задачи'), 'Second');
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    await user.click(screen.getByRole('checkbox', { name: /First/ }));
    await user.click(screen.getByRole('button', { name: 'Активные' }));

    const list = screen.getByRole('list');
    expect(within(list).getByText('Second')).toBeInTheDocument();
    expect(within(list).queryByText('First')).not.toBeInTheDocument();
  });

  it('restores tasks saved in localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: 'a', title: 'Saved task', done: false, priority: 'high', createdAt: 1 }]),
    );
    render(<App />);
    expect(screen.getByText('Saved task')).toBeInTheDocument();
  });
});
