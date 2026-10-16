import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
  });
  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
  await test.step('ตรวจสอบ Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('#item_0_title_link')).toHaveText('Sauce Labs Bike Light');
  });
  await test.step('กรอก Checkout Information', async () => {
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('10100');
    await page.locator('#continue').click();
  });
  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
    await page.locator('#finish').click();
  });
  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});