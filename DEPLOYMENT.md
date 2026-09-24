# 🚀 راهنمای نصب و هاست سایت کتاب‌فروشی اقرأ

## 📋 فهرست
1. [پیش‌نیازها](#پیش‌نیازها)
2. [نصب محلی (Local)](#نصب-محلی)
3. [MongoDB Setup](#mongodb-setup)
4. [هاست روی VPS](#هاست-روی-vps)
5. [هاست روی MongoDB Atlas](#هاست-روی-mongodb-atlas)
6. [دامنه و SSL](#دامنه-و-ssl)

---

## پیش‌نیازها

- Node.js نسخه 18 یا بالاتر
- MongoDB (Local یا Atlas)
- npm یا yarn
- Git

---

## نصب محلی

### 1. Clone پروژه

```bash
git clone https://github.com/your-username/egra-bookstore.git
cd egra-bookstore
```

### 2. نصب Frontend

```bash
npm install
```

### 3. نصب Backend

```bash
cd server
npm install
cp .env.example .env
```

فایل `.env` را ویرایش کنید:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/egra_bookstore
JWT_SECRET=یک-رمز-امن-و-طولانی-اینجا
ADMIN_USERNAME=admin
ADMIN_PASSWORD=رمز-عبور-امن
FRONTEND_URL=http://localhost:5173
```

### 4. ایجاد دیتابیس

```bash
npm run seed
```

### 5. اجرا

**Backend:**
```bash
cd server
npm run dev
```

**Frontend (ترمینال جدید):**
```bash
npm run dev
```

سایت در `http://localhost:5173` و API در `http://localhost:5000` فعال می‌شود.

---

## MongoDB Setup

### MongoDB Local

**Windows:**
1. از [mongodb.com](https://www.mongodb.com/try/download/community) دانلود کنید
2. نصب کنید
3. به صورت خودکار اجرا می‌شود

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**MongoDB Compass:**
1. از [mongodb.com/compass](https://www.mongodb.com/products/compass) دانلود کنید
2. اتصال: `mongodb://localhost:27017`
3. دیتابیس `egra_bookstore` را مشاهده کنید

### MongoDB Atlas (Cloud - پیشنهادی)

1. در [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register) ثبت‌نام کنید
2. یک Cluster رایگان (M0) بسازید
3. از "Database Access" یک کاربر بسازید
4. از "Network Access" IP خود را whitelist کنید (یا 0.0.0.0/0 برای همه)
5. از "Connect" > "Connect your application" رشته اتصال را کپی کنید
6. در `.env` قرار دهید:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/egra_bookstore?retryWrites=true&w=majority
```

---

## هاست روی VPS

### سرورهای پیشنهادی:
- DigitalOcean ($6/ماه)
- Hetzner (€4/ماه)
- Vultr ($6/ماه)

### مراحل نصب:

```bash
# اتصال به سرور
ssh root@your-server-ip

# آپدیت سیستم
apt update && apt upgrade -y

# نصب Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# نصب MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# نصب Git
apt install git -y

# نصب Nginx
apt install nginx -y

# نصب PM2
npm install -g pm2

# Clone پروژه
cd /var/www
git clone https://github.com/your-username/egra-bookstore.git
cd egra-bookstore

# نصب Frontend
npm install
npm run build

# نصب Backend
cd server
npm install
cp .env.example .env
nano .env  # تنظیمات را وارد کنید
npm run seed

# اجرای Backend با PM2
pm2 start index.js --name egra-backend
pm2 save
pm2 startup
```

### تنظیم Nginx:

```bash
nano /etc/nginx/sites-available/egra-bookstore
```

محتوا:
```nginx
server {
    listen 80;
    server_name egra-book.af www.egra-book.af;

    # Frontend
    location / {
        root /var/www/egra-bookstore/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Uploads
    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

فعال‌سازی:
```bash
ln -s /etc/nginx/sites-available/egra-bookstore /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## هاست روی MongoDB Atlas

### مزایا:
- ✅ رایگان تا 512MB
- ✅ Backup خودکار
- ✅ مانیتورینگ
- ✅ مقیاس‌پذیری آسان

### مراحل:

1. **ساخت Cluster:**
   - وارد [cloud.mongodb.com](https://cloud.mongodb.com) شوید
   - "Build a Database" را بزنید
   - M0 FREE را انتخاب کنید
   - Provider: AWS
   - Region: نزدیک‌ترین به افغانستان (مثلاً Mumbai یا Bahrain)

2. **ساخت Database User:**
   - Database Access > Add New Database User
   - Username: `egra_admin`
   - Password: (یک رمز قوی)
   - Role: Read and write to any database

3. **Network Access:**
   - Network Access > Add IP Address
   - برای تست: `Allow Access from Anywhere` (0.0.0.0/0)
   - برای تولید: IP سرور خود را اضافه کنید

4. **Get Connection String:**
   - Connect > Connect your application
   - کپی کنید: `mongodb+srv://egra_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - در `.env` قرار دهید

---

## دامنه و SSL

### خرید دامنه
- دامنه‌های `.af`: Afghanistan Online
- دامنه‌های بین‌المللی: Namecheap, GoDaddy

### SSL رایگان (Let's Encrypt)

```bash
# نصب Certbot
apt install certbot python3-certbot-nginx -y

# دریافت SSL
certbot --nginx -d egra-book.af -d www.egra-book.af
```

### تنظیم Auto-Renewal:
```bash
certbot renew --dry-run
```

---

## 🔐 امنیت

### چک‌لیست امنیتی:
- [ ] تغییر JWT_SECRET به یک رمز قوی
- [ ] تغییر رمز admin پیش‌فرض
- [ ] فعال‌سازی HTTPS
- [ ] تنظیم Firewall (ufw)
- [ ] محدود کردن Rate Limit
- [ ] Backup منظم از MongoDB
- [ ] MongoDB Atlas: IP Whitelist

### Firewall:
```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

### MongoDB Security:
```bash
# فعال‌سازی احراز هویت
nano /etc/mongod.conf
```
```yaml
security:
  authorization: enabled
```
```bash
systemctl restart mongod
```

---

## 📊 مانیتورینگ

### PM2 Commands:
```bash
pm2 status          # وضعیت
pm2 logs            # لاگ‌ها
pm2 restart all     # ریستارت
pm2 monit           # مانیتور
```

### MongoDB Backup:
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/egra_bookstore" --out=/var/www/backups/egra-$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/egra_bookstore" /var/www/backups/egra-20240101/egra_bookstore

# Cron job (هر روز ساعت 3 صبح)
0 3 * * * mongodump --uri="mongodb://localhost:27017/egra_bookstore" --out=/var/www/backups/egra-$(date +\%Y\%m\%d)
```

### MongoDB Atlas Backup:
- خودکار هر 6 ساعت (رایگان)
- Point-in-time recovery (پولی)

---

## 📞 پشتیبانی

اگر سوالی دارید:
- 📧 info@egra-book.af
- 📱 +93 70 123 4567

---

## 📄 لایسنس

MIT License - کتاب‌فروشی اقرأ © 1403
