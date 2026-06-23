import { defineConfig, devices } from '@playwright/test';

// Dedicated port for test runs so we never collide with the preview harness
// or a manually-started dev server.
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  timeout: 60_000,

  use: {
    baseURL: BASE_URL,
    // Capture artefacts only when something fails.
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
        // Disable Chromium's setuid sandbox. Required in restricted/headless
        // environments (CI, containers, the macOS app sandbox) where the
        // browser otherwise fails to launch with a permission error.
        launchOptions: { chromiumSandbox: false },
      },
    },
  ],

  // Start the Vite dev server for the duration of the run and tear it down
  // afterwards. Reuses an existing server on PORT if one is already up.
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
