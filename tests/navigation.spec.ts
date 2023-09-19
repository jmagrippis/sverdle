import {expect, test} from '@playwright/test'

test('about page has expected h1', async ({page}) => {
	await page.goto('/')
	await expect(
		page.getByRole('heading', {
			name: 'Welcome to your new SvelteKit app',
			level: 1,
		}),
	).toBeVisible()

	await page.getByRole('link', {name: 'About'}).click()
	await expect(
		page.getByRole('heading', {name: 'About this app', level: 1}),
	).toBeVisible()

	await page
		.getByRole('navigation')
		.getByRole('link', {name: 'Sverdle'})
		.click()
	await expect(
		page.getByRole('heading', {name: 'Sverdle', level: 1}),
	).toBeVisible()
})
