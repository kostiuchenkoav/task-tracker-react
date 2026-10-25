import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Vitest does not enable globals by default, so unmount rendered trees between tests manually.
afterEach(() => {
  cleanup();
});
