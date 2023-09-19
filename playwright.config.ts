import {devices, type PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	webServer: process.env.CI
		? {
				command: 'bun --bun run build && bun --bun run preview',
				port: 4173,
		  }
		: {
				command: 'bun --bun run dev',
				port: 5173,
				reuseExistingServer: true,
		  },
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',

		launchOptions: {
			slowMo: parseInt(process.env.SLOW_MO || '0'),
		},

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		video: 'retain-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{name: 'setup', testMatch: /.*\.setup\.ts/},
		{
			name: 'chromium',
			use: {...devices['Desktop Chrome']},
			dependencies: ['setup'],
		},

		{
			name: 'firefox',
			use: {...devices['Desktop Firefox']},
			dependencies: ['setup'],
		},

		// {
		//   name: 'webkit',
		//   use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		{
			name: 'Mobile Safari',
			use: {...devices['iPhone 12']},
			dependencies: ['setup'],
		},

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],
}

export default config
