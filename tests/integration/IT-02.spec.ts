import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // Driver ตั้งค่า Cookie เพื่อจำลองสถานะ Login
    await context.addCookies([{
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/'
    }]);
    await page.goto('/inventory.html');
  });
  await test.step('ตรวจสอบ Inventory จริง', async () => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });
  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  await context.close();
});