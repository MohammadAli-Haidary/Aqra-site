# 🔗 راهنمای اتصال Frontend و Backend

## 📋 وضعیت فعلی

✅ **Backend (MongoDB)**: آماده و کامل
✅ **Frontend (React)**: آماده و کامل  
✅ **API Service**: ساخته شده
✅ **Admin Panel**: ساخته شده

---

## 🚀 مراحل اتصال

### مرحله 1: نصب MongoDB

**گزینه A: MongoDB Local (پیشنهادی برای تست)**

1. دانلود از: https://www.mongodb.com/try/download/community
2. نصب کنید
3. MongoDB Compass را نصب کنید: https://www.mongodb.com/products/compass

**گزینه B: MongoDB Atlas (Cloud)**

1. ثبت‌نام در: https://www.mongodb.com/cloud/atlas/register
2. ساخت Cluster رایگان
3. کپی Connection String

---

### مرحله 2: راه‌اندازی Backend

```bash
# ورود به پوشه Backend
cd server

# نصب وابستگی‌ها
npm install

# کپی فایل محیطی
cp .env.example .env
```

**ویرایش فایل `.env`:**

```env
# Port
PORT=5000

# MongoDB - Local
MONGODB_URI=mongodb://localhost:27017/egra_bookstore

# MongoDB - Atlas (اگر از Atlas استفاده می‌کنید)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/egra_bookstore

# JWT Secret (یک رمز قوی و طولانی)
JWT_SECRET=egra-bookstore-secret-key-2024-very-secure

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**ایجاد داده‌های اولیه:**

```bash
npm run seed
```

**اجرای سرور:**

```bash
npm run dev
```

✅ سرور در `http://localhost:5000` فعال می‌شود

---

### مرحله 3: راه‌اندازی Frontend

```bash
# در ترمینال جدید (از ریشه پروژه)
npm install

# کپی فایل محیطی
cp .env.example .env
```

**ویرایش فایل `.env` در ریشه پروژه:**

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

**اجرای Frontend:**

```bash
npm run dev
```

✅ سایت در `http://localhost:5173` فعال می‌شود

---

### مرحله 4: تست اتصال

1. **بررسی سلامت Backend:**
   - مرورگر: http://localhost:5000/api/health
   - باید پیام "سرور فعال است" را ببینید

2. **بررسی MongoDB:**
   - MongoDB Compass را باز کنید
   - اتصال: `mongodb://localhost:27017`
   - دیتابیس `egra_bookstore` را ببینید

3. **تست Frontend:**
   - سایت را باز کنید: http://localhost:5173
   - دکمه ⚙️ (پایین سمت راست) را بزنید
   - وارد شوید: `admin` / `admin123`
   - داشبورد باید اطلاعات را نشان دهد

---

## 🎯 استفاده از Admin Panel

### ورود:
- دکمه ⚙️ در گوشه پایین سمت راست
- Username: `admin`
- Password: `admin123`

### امکانات:
- ✅ داشبورد با آمار
- ✅ مدیریت کتاب‌ها
- ✅ مدیریت دسته‌بندی‌ها
- ✅ مدیریت گالری
- ✅ مدیریت نظرات
- ✅ مشاهده پیام‌های تماس

---

## 🔧 عیب‌یابی

### مشکل: "خطا در اتصال به سرور"

**علت:** Backend در حال اجرا نیست

**راه‌حل:**
```bash
cd server
npm run dev
```

---

### مشکل: "نام کاربری یا رمز عبور اشتباه است"

**علت:** داده‌های اولیه seed نشده‌اند

**راه‌حل:**
```bash
cd server
npm run seed
```

---

### مشکل: "CORS error"

**علت:** Frontend URL در `.env` Backend تنظیم نشده

**راه‌حل:**
در `server/.env`:
```env
FRONTEND_URL=http://localhost:5173
```

سپس Backend را ریستارت کنید.

---

### مشکل: MongoDB connection failed

**علت:** MongoDB در حال اجرا نیست

**راه‌حل:**

**Windows:**
```bash
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

---

## 📊 ساختار داده‌ها در MongoDB

بعد از `npm run seed`، این Collection ها ایجاد می‌شوند:

| Collection | تعداد | توضیح |
|------------|--------|--------|
| admins | 1 | ادمین پیش‌فرض |
| books | 8 | کتاب‌های نمونه |
| categories | 12 | دسته‌بندی‌ها |
| galleries | 6 | تصاویر گالری |
| testimonials | 3 | نظرات مشتریان |
| sitesettings | 7 | تنظیمات سایت |

---

## 🌐 هاست کردن

### برای هاست واقعی:

1. **Backend:**
   - VPS (DigitalOcean, Hetzner)
   - یا Railway/Render
   - تنظیم `NODE_ENV=production`

2. **MongoDB:**
   - MongoDB Atlas (رایگان تا 512MB)
   - یا MongoDB روی VPS

3. **Frontend:**
   - Build: `npm run build`
   - آپلود `dist/` به هاست
   - یا Vercel/Netlify

### تنظیمات Production:

**Backend `.env`:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very-long-secure-random-string
FRONTEND_URL=https://your-domain.com
```

**Frontend `.env`:**
```env
VITE_API_URL=https://api.your-domain.com/api
```

---

## 📞 پشتیبانی

اگر مشکلی دارید:
- 📧 info@egra-book.af
- 📱 +93 70 123 4567

---

## ✅ چک‌لیست نهایی

- [ ] MongoDB نصب و در حال اجرا
- [ ] Backend: `npm install` انجام شده
- [ ] Backend: `.env` تنظیم شده
- [ ] Backend: `npm run seed` اجرا شده
- [ ] Backend: `npm run dev` در حال اجرا
- [ ] Frontend: `npm install` انجام شده
- [ ] Frontend: `.env` تنظیم شده
- [ ] Frontend: `npm run dev` در حال اجرا
- [ ] تست: http://localhost:5000/api/health
- [ ] تست: Admin Panel با login موفق

---

**موفق باشید! 🎉**
