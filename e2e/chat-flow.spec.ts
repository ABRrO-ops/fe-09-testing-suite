import { test, expect } from '@playwright/test';

test.describe('Flux de conversation E2E - ChatEngine', () => {
  test('L\'utilisateur peut envoyer un message et recevoir une réponse simulée', async ({ page }) => {
    await page.goto('/');

    const input = page.getByLabel('Votre message');
    const sendButton = page.getByRole('button', { name: /envoyer/i });

    await expect(sendButton).toBeDisabled();

    await input.fill('Analyse ce problème de code.');
    await expect(sendButton).toBeEnabled();

    await sendButton.click();

    await expect(page.getByRole('status')).toBeVisible();
    await expect(page.getByText('user: Analyse ce problème de code.')).toBeVisible();
    await expect(page.getByText('assistant: Réponse générée par l\'IA')).toBeVisible({ timeout: 5000 });
  });
});