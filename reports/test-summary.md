# Test Summary Report - Software Testing Final Exam

**รหัสนักศึกษา:** [6804101318]  
**ชื่อ-นามสกุล:** [ฐิติวรดา นาปัน]  
**วันที่ทดสอบ:** [16/10/26]  

---

## 1. ผลการรันทดสอบภาพรวม (Test Results Overview)

| บทที่ | รหัสข้อสอบ | หัวข้อทดสอบ (Test Topic) | ผลลัพธ์ (Result) | หมายเหตุ / Error (ถ้ามี) |
| :---: | :---: | :--- | :---: | :--- |
| บทที่ 1 | UT-01 | Login Form Validation (3 Cases) | **Passed** | ผ่านครบทุกกรณี (Empty, Missing, Invalid) |
| บทที่ 1 | UT-02 | Product Button State (Add -> Remove) | **Passed** | ปุ่มและ Cart Badge เปลี่ยนแปลงถูกต้อง |
| บทที่ 2 | IT-01 | Top-Down Integration (Real Login + Stub) | **Passed** | จำลองหน้า Inventory ด้วย `page.setContent()` สำเร็จ |
| บทที่ 2 | IT-02 | Bottom-Up Integration (Driver + Real Inventory) | **Passed** | ใช้ Cookie ข้ามหน้า Login และตรวจสอบสินค้าได้ครบ |
| บทที่ 3 | ST-01 | Complete Purchase Flow (2 Products) | **Passed** | สั่งซื้อสำเร็จและแสดง Thank you for your order! |
| บทที่ 3 | ST-02 | Checkout Validation & Recovery | **Passed** | ตรวจสอบ Error ครบทุกช่องและแก้ไขจนสั่งซื้อสำเร็จ |

**สรุปผลรวม:** ผ่านทั้งหมด 6 ข้อ (Passed: 6 / Failed: 0)

---

## 2. บันทึกเพิ่มเติมจากการรันจริง
- การรันทดสอบทั้งหมดใช้คำสั่ง `npx playwright test` ภายในโปรเจกต์
- ผลลัพธ์ HTML Report ถูกบันทึกไว้ที่ `playwright-report/index.html` และ JSON Report ถูกบันทึกไว้ที่ `reports/results.json` เรียบร้อยแล้ว