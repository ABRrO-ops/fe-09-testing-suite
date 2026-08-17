import { test, expect } from '@playwright/test';

test.describe('End-to-End AI Chat Flow', () => {
  test('User completes full prompt submission and receives mocked response', async ({ page }) => {
    // 1. Intercept real API call to isolate E2E test from external network dependency
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ text: 'Mocked E2E AI Analysis Result' }),
      });
    });

    // 2. Navigate to application root
    await page.goto('/');

    // 3. Locate elements via ARIA roles and labels
    const promptInput = page.getByRole('textbox', { name: /your prompt/i });
    const sendButton = page.getByRole('button', { name: /send/i });

    // 4. Execute user interaction
    await promptInput.fill('E2E Test Prompt');
    await sendButton.click();

    // 5. Assert UI update
    await expect(page.getByText('Mocked E2E AI Analysis Result')).toBeVisible();
  });
});