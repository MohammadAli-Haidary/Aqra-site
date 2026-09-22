# کتاب‌فروشی اقرأ - Backend API
## Egra Bookstore Backend

سرور بک‌اند برای سایت کتاب‌فروشی اقرأ - کابل، افغانستان

---

## 🚀 ویژگی‌ها

- ✅ RESTful API کامل
- ✅ احراز هویت JWT (Admin Panel)
- ✅ مدیریت کتاب‌ها (CRUD)
- ✅ مدیریت گالری با آپلود تصویر
- ✅ مدیریت دسته‌بندی‌ها
- ✅ مدیریت نظرات مشتریان
- ✅ فرم تماس با ما
- ✅ خبرنامه (Newsletter)
- ✅ تنظیمات سایت
- ✅ Rate Limiting و امنیت
- ✅ SQLite Database (سبک و ساده)

---

## 📦 نصب و راه‌اندازی

### 1. نصب وابستگی‌ها

```bash
cd server
npm install
```

### 2. تنظیم فایل محیطی

```bash
cp .env.example .env
```

سپس فایل `.env` را ویرایش کنید:

```env
PORT=5000
JWT_SECRET=your-very-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
DB_PATH=./database/egra.db
FRONTEND_URL=http://localhost:5173
```

### 3. ایجاد دیتابیس و داده‌های اولیه

```bash
npm run seed
```

### 4. اجرای سرور

**حالت توسعه (Development):**
```bash
npm run dev
```

**حالت تولید (Production):**
```bash
npm start
```

سرور در آدرس `http://localhost:5000` فعال می‌شود.

---

## 📚 مستندات API

### احراز هویت

| متد | آدرس | توضیح |
|------|-------|--------|
| POST | `/api/auth/login` | ورود ادمین |
| GET | `/api/auth/me` | اطلاعات ادمین فعلی |
| POST | `/api/auth/change-password` | تغییر رمز عبور |

### کتاب‌ها

| متد | آدرس | توضیح |
|------|-------|--------|
| GET | `/api/books` | دریافت همه کتاب‌ها |
| GET | `/api/books/:id` | دریافت یک کتاب |
| GET | `/api/books/filter/bestsellers` | کتاب‌های پرفروش |
| GET | `/api/books/filter/new-arrivals` | تازه‌وارد‌ها |
| POST | `/api/books` | افزودن کتاب 🔒 |
| PUT | `/api/books/:id` | ویرایش کتاب 🔒 |
| DELETE | `/api/books/:id` | حذف کتاب 🔒 |

### گالری

| متد | آدرس | توضیح |
|------|-------|--------|
| GET | `/api/gallery` | دریافت تصاویر |
| GET | `/api/gallery/categories` | دسته‌بندی‌های گالری |
| POST | `/api/gallery` | افزودن تصویر 🔒 |
| PUT | `/api/gallery/:id` | ویرایش تصویر 🔒 |
| DELETE | `/api/gallery/:id` | حذف تصویر 🔒 |

### دسته‌بندی‌ها

| متد | آدرس | توضیح |
|------|-------|--------|
| GET | `/api/categories` | دریافت دسته‌بندی‌ها |
| GET | `/api/categories/:id` | دریافت یک دسته‌بندی |
| POST | `/api/categories` | افزودن 🔒 |
| PUT | `/api/categories/:id` | ویرایش 🔒 |
| DELETE | `/api/categories/:id` | حذف 🔒 |

### نظرات

| متد | آدرس | توضیح |
|------|-------|--------|
| GET | `/api/testimonials` | نظرات تأیید شده |
| POST | `/api/testimonials` | ارسال نظر (عمومی) |
| POST | `/api/testimonials/admin` | افزودن نظر 🔒 |
| PUT | `/api/testimonials/:id` | ویرایش 🔒 |
| PATCH | `/api/testimonials/:id/approve` | تأیید نظر 🔒 |
| DELETE | `/api/testimonials/:id` | حذف 🔒 |

### تماس با ما

| متد | آدرس | توضیح |
|------|-------|--------|
| POST | `/api/contact` | ارسال پیام |
| GET | `/api/contact` | دریافت پیام‌ها 🔒 |
| PATCH | `/api/contact/:id/read` | علامت خوانده‌شدن 🔒 |
| DELETE | `/api/contact/:id` | حذف پیام 🔒 |

### خبرنامه

| متد | آدرس | توضیح |
|------|-------|--------|
| POST | `/api/newsletter/subscribe` | عضویت |
| POST | `/api/newsletter/unsubscribe` | لغو عضویت |
| GET | `/api/newsletter/subscribers` | لیست مشترکین 🔒 |

### تنظیمات

| متد | آدرس | توضیح |
|------|-------|--------|
| GET | `/api/settings` | دریافت تنظیمات |
| PUT | `/api/settings` | ویرایش تنظیمات 🔒 |
| GET | `/api/settings/dashboard/stats` | آمار داشبورد 🔒 |

🔒 = نیاز به توکن JWT

---

## 🔐 احراز هویت

برای دسترسی به API‌های محافظت‌شده، توکن JWT را در هدر ارسال کنید:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### نمونه ورود:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🌐 هاست کردن

### گزینه 1: VPS (DigitalOcean, Hetzner, و...)

```bash
# نصب Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# کلون پروژه
git clone your-repo-url
cd project/server

# نصب و اجرا
npm install
npm run seed
pm2 start index.js --name egra-backend
pm2 save
pm2 startup
```

### گزینه 2: cPanel / DirectAdmin

1. فایل‌های server را آپلود کنید
2. در Terminal cPanel:
```bash
cd ~/public_html/server
npm install
npm run seed
```
3. با Node.js App ایجاد کنید

### گزینه 3: Railway / Render / Fly.io

1. پروژه را به GitHub متصل کنید
2. Environment Variables تنظیم کنید
3. Start Command: `npm start`

### گزینه 4: هاست اشتراکی (با Node.js support)

بسیاری از هاست‌های افغانستان از Node.js پشتیبانی می‌کنند.

---

## 📁 ساختار پروژه

```
server/
├── index.js              # سرور اصلی
├── database.js           # تنظیمات دیتابیس
├── package.json          # وابستگی‌ها
├── .env                  # تنظیمات محیطی
├── database/             # فایل SQLite
├── uploads/              # فایل‌های آپلود شده
│   ├── gallery/
│   └── books/
├── middleware/
│   ├── auth.js           # احراز هویت
│   └── upload.js         # آپلود فایل
└── routes/
    ├── auth.js           # احراز هویت
    ├── books.js          # کتاب‌ها
    ├── gallery.js        # گالری
    ├── categories.js     # دسته‌بندی
    ├── testimonials.js   # نظرات
    ├── contact.js        # تماس
    ├── newsletter.js     # خبرنامه
    └── settings.js       # تنظیمات
```

---

## 🔒 امنیت

- ✅ Helmet.js برای هدرهای امنیتی
- ✅ Rate Limiting
- ✅ CORS Configuration
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Input Validation
- ✅ File Upload Validation

---

## 📞 پشتیبانی

- 📧 Email: info@egra-book.af
- 📱 Phone: +93 70 123 4567
- 📍 Address: کابل، سرک دارالامان

---

## 📄 لایسنس

MIT License - کتاب‌فروشی اقرأ © 1403
