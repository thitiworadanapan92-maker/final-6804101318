# Final Exam: Software Testing with Playwright

โครงการนี้เป็นส่วนหนึ่งของการสอบปลายภาควิชา Software Testing โดยใช้ Playwright Test ร่วมกับ TypeScript บนเว็บไซต์เป้าหมาย https://www.saucedemo.com/[cite: 1]

---

## 📝 คำอธิบายทางสถาปัตยกรรมและการทดสอบ (Architecture & Testing Concepts)

ในโปรเจกต์นี้มีการประยุกต์ใช้เทคนิคการทดสอบในรูปแบบต่างๆ ดังนี้:

### 1. Real System Testing (ระบบจริง)
* **การใช้งาน:** ใช้ในการทดสอบระบบส่วนใหญ่ เช่น การทดสอบ UI ทั่วไป (บทที่ 1), การตรวจสอบกระบวนการสั่งซื้อสินค้าแบบ End-to-End ตั้งแต่ต้นจนจบ (บทที่ 3) รวมถึงขั้นตอนการเข้าสู่ระบบปกติ (Real Login)
* **บทบาท:** เป็นการจำลองพฤติกรรมของผู้ใช้งานจริง (User Interaction) ผ่านเบราว์เซอร์จริง เชื่อมต่อกับ Backend และ Database ของเว็บไซต์ SauceDemo จริงๆ เพื่อให้มั่นใจว่าระบบทำงานได้ถูกต้องตาม Business Flow

### 2. Stub ใน Top-Down Integration Testing (ข้อ IT-01)
* **การใช้งาน:** ใช้ในไฟล์ `tests/integration/IT-01.spec.ts`[cite: 1]
* **บทบาท:** 
  - ส่วนที่เป็น **Real**: ทำการ Login ผ่านระบบจริงของเว็บไซต์จนกระทั่งผ่านเข้าสู่ URL หน้า `inventory.html`[cite: 1]
  - ส่วนที่เป็น **Stub**: เนื่องจากต้องการทดสอบการบูรณาการแบบ Top-Down จึงใช้คำสั่ง `page.setContent()` จำลอง DOM ของหน้า Inventory ขึ้นมาใหม่ในระดับเบราว์เซอร์ โดยไม่ดึงข้อมูลสินค้าจริงจากระบบหลังบ้าน[cite: 1]
  - **ข้อดี/ประโยชน์:** ช่วยให้เราสามารถจำลองหน้าตาผลลัพธ์หรือสถานะเฉพาะหน้า (Mock Inventory Ready, Mock Backpack, Mock Bike Light) ได้อย่างรวดเร็ว โดยไม่ต้องพึ่งพิงข้อมูลจริงจาก Server ภายนอกทั้งหมด[cite: 1]

### 3. Driver ใน Bottom-Up Integration Testing (ข้อ IT-02)
* **การใช้งาน:** ใช้ในไฟล์ `tests/integration/IT-02.spec.ts`[cite: 1]
* **บทบาท:** 
  - สร้างฟังก์ชัน Driver (`driverOpenInventory()`) ทำหน้าที่เตรียมสถานะเริ่มต้น (Initial State) ให้กับระบบ โดยการฉีด Cookie (`session-username=standard_user`) เข้าไปในเบราว์เซอร์ผ่าน `BrowserContext.addCookies()` ก่อนที่จะสั่งเปิดหน้า `inventory.html` โดยตรง[cite: 1]
  - **ข้อดี/ประโยชน์:** ข้ามขั้นตอนการกรอกฟอร์ม Login แบบเดิมซ้ำๆ ช่วยประหยัดเวลาในการทดสอบโมดูลย่อยระดับล่าง (เช่น ตะกร้าสินค้า และรายการสินค้าจริงทั้ง 6 รายการ) ได้อย่างมีประสิทธิภาพ ก่อนที่จะนำมารวมเข้ากับระบบหลัก[cite: 1]

---

## 🚀 วิธีการรันทดสอบ (How to Run)
1. ติดตั้งแพ็กเกจ:
   ```bash
   npm install