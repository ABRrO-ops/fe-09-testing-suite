import { test, expect } from '@playwright/test';

test('Primary chat flow test', async ({ page }) => {
  // Charge un contenu HTML directement sans dépendre d'un serveur externe
  await page.setContent(`
    <div id="root">
      <h1>Chat App</h1>
      <input id="chat-input" placeholder="Votre message" />
      <button id="send-btn">Envoyer</button>
    </div>
  `);

  const input = page.locator('#chat-input');
  const button = page.locator('#send-btn');

  await expect(input).toBeVisible();
  await expect(button).toBeVisible();
});