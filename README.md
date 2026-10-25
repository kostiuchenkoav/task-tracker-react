# Task Tracker

A small task manager built with React, TypeScript and Vite. Tasks can be added with a priority, marked as done, filtered and deleted. The list is saved in `localStorage`, so it survives page reloads.

## Features

- Add tasks with a title and priority (low, medium, high)
- Mark tasks as done and filter by All, Active or Done
- Delete tasks
- Persistence in `localStorage`, with safe fallback for corrupted data
- Keyboard-accessible controls with labels and `aria-pressed` filter buttons
- Responsive layout

## Tech stack

- React 18 with function components and hooks
- TypeScript in strict mode
- Vite for development and builds
- Vitest and Testing Library for unit and component tests
- GitHub Actions for CI (build and tests on every push and pull request)

## Getting started

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build
npm test         # run the test suite
```

## Project structure

```
src/
  components/     Presentational components (TaskForm, TaskList, FilterBar)
  tasks.ts        Pure functions for adding, toggling, removing and filtering tasks
  storage.ts      localStorage read and write with validation
  App.tsx         Application state and composition
  tasks.test.ts   Unit tests for the pure task logic
  App.test.tsx    Integration tests for user flows
```

## Design decisions

- **Pure task logic.** All state transitions live in `tasks.ts` and return new arrays. This keeps them easy to test without rendering anything.
- **Validated persistence.** `loadTasks` checks every stored item against the expected shape and drops invalid entries, so a corrupted value cannot crash the app.
- **Accessibility first.** Inputs have associated labels, icon-like actions have descriptive `aria-label` values, and the filter group uses `aria-pressed` so screen readers announce the active filter.

## License

MIT
