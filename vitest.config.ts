import { defineConfig } from 'vitest/config'

// Unit tests cover the pure data modules (benchmark maths, layer config
// invariants); nothing here needs a DOM.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
