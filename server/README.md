# کتاب‌فروشی اقرأ - Backend API (MongoDB)
## Egra Bookstore Backend

سرور بک‌اند برای سایت کتاب‌فروشی اقرأ - کابل، افغانستان

**Database: MongoDB**

---

## 🚀 ویژگی‌ها

- ✅ RESTful API کامل
- ✅ **MongoDB Database** (با Mongoose)
- ✅ احراز هویت JWT (Admin Panel)
- ✅ مدیریت کتاب‌ها (CRUD)
- ✅ مدیریت گالری با آپلود تصویر
- ✅ مدیریت دسته‌بندی‌ها
- ✅ مدیریت نظرات مشتریان
- ✅ فرم تماس با ما
- ✅ خبرنامه (Newsletter)
- ✅ تنظیمات سایت
- ✅ Rate Limiting و امنیت
- ✅ MongoDB Atlas Support

---

## 📦 نصب و راه‌اندازی

### پیش‌نیازها

- **Node.js** نسخه 18 یا بالاتر
- **MongoDB** (Local یا MongoDB Atlas)

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
# Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/egra_bookstore

# برای MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/egra_bookstore

# JWT Secret
JWT_SECRET=your-very-secret-key-here

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Upload settings
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. ایجاد داده‌های اولیه (Seed)

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

## 🍃 MongoDB Setup

### MongoDB Local

1. MongoDB را نصب کنید:
   - **Windows:** [دانلود از سایت رسمی](https://www.mongodb.com/try/download/community)
   - **Mac:** `brew install mongodb-community`
   - **Linux:** [راهنمای نصب](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

2. سرویس MongoDB را اجرا کنید:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. MongoDB Compass را باز کنید و به `mongodb://localhost:27017` متصل شوید.

### MongoDB Atlas (Cloud)

1. در [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ثبت‌نام کنید
2. یک Cluster رایگان بسازید
3. از بخش "Connect" رشته اتصال را کپی کنید
4. در `.env` قرار دهید:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/egra_bookstore
   ```

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

## 📁 ساختار پروژه

```
server/
├── index.js              # سرور اصلی
├── package.json          # وابستگی‌ها
├── .env                  # تنظیمات محیطی
├── database/
│   ├── connection.js     # اتصال MongoDB
│   └── seed.js           # داده‌های اولیه
├── models/
│   ├── Admin.js          # مدل ادمین
│   ├── Book.js           # مدل کتاب
│   ├── Category.js       # مدل دسته‌بندی
│   ├── Gallery.js        # مدل گالری
│   ├── Testimonial.js    # مدل نظرات
│   ├── ContactMessage.js # مدل پیام تماس
│   ├── NewsletterSubscriber.js # مدل خبرنامه
│   └── SiteSetting.js    # مدل تنظیمات
├── middleware/
│   ├── auth.js           # احراز هویت
│   └── upload.js         # آپلود فایل
├── routes/
│   ├── auth.js           # احراز هویت
│   ├── books.js          # کتاب‌ها
│   ├── gallery.js        # گالری
│   ├── categories.js     # دسته‌بندی
│   ├── testimonials.js   # نظرات
│   ├── contact.js        # تماس
│   ├── newsletter.js     # خبرنامه
│   └── settings.js       # تنظیمات
└── uploads/              # فایل‌های آپلود شده
    ├── gallery/
    └── books/
```

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

### MongoDB Atlas + VPS

1. **MongoDB Atlas** برای دیتابیس
2. **VPS** (DigitalOcean, Hetzner) برای سرور

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

### Railway / Render

1. پروژه را به GitHub متصل کنید
2. Environment Variables:
   - `MONGODB_URI`: رشته اتصال MongoDB Atlas
   - `JWT_SECRET`: رمز امن
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: رمز عبور
3. Start Command: `npm start`

---

## 🔒 امنیت

- ✅ Helmet.js برای هدرهای امنیتی
- ✅ Rate Limiting
- ✅ CORS Configuration
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Mongoose Validation
- ✅ File Upload Validation

---

## 📞 پشتیبانی

- 📧 Email: info@egra-book.af
- 📱 Phone: +93 70 123 4567
- 📍 Address: کابل، سرک دارالامان

---

## 📄 لایسنس

MIT License - کتاب‌فروشی اقرأ © 1403
