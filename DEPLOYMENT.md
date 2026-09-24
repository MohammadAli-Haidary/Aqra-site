# 🚀 راهنمای نصب و هاست سایت کتاب‌فروشی اقرأ

## 📋 فهرست
1. [پیش‌نیازها](#پیش‌نیازها)
2. [نصب محلی (Local)](#نصب-محلی)
3. [هاست روی VPS](#هاست-روی-vps)
4. [هاست روی cPanel](#هاست-روی-cpanel)
5. [هاست روی سرویس‌های ابری](#هاست-روی-سرویس-های-ابری)
6. [دامنه و SSL](#دامنه-و-ssl)

---

## پیش‌نیازها

- Node.js نسخه 18 یا بالاتر
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

## هاست روی VPS

### سرورهای پیشنهادی:
- DigitalOcean ($6/ماه)
- Hetzner (€4/ماه)
- Vultr ($6/ماه)
- سرورهای افغانستان (Afghan Wireless, MTN)

### مراحل نصب:

```bash
# اتصال به سرور
ssh root@your-server-ip

# آپدیت سیستم
apt update && apt upgrade -y

# نصب Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

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

## هاست روی cPanel

### 1. آپلود فایل‌ها

- فایل‌های `dist/` را در `public_html` آپلود کنید
- فولدر `server/` را در `public_html/server` آپلود کنید

### 2. نصب Backend در Terminal cPanel

```bash
cd ~/public_html/server
npm install
cp .env.example .env
nano .env
npm run seed
```

### 3. ایجاد Node.js App در cPanel

1. وارد cPanel شوید
2. به بخش "Setup Node.js app" بروید
3. "Create Application" را بزنید
4. تنظیمات:
   - Node version: 18.x
   - Application mode: Production
   - Application root: public_html/server
   - Application URL: egra-book.af
   - Application startup file: index.js

### 4. تنظیم .htaccess

```apache
RewriteEngine On
RewriteRule ^api/(.*)$ http://127.0.0.1:5000/api/$1 [P,L]
RewriteRule ^uploads/(.*)$ http://127.0.0.1:5000/uploads/$1 [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## هاست روی سرویس‌های ابری

### Railway.app

1. پروژه را به GitHub push کنید
2. در Railway یک پروژه جدید بسازید
3. Repository را متصل کنید
4. Root Directory: `server`
5. Environment Variables:
   - `PORT`: 5000
   - `JWT_SECRET`: your-secret
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: your-password
6. Deploy!

### Render.com

1. New Web Service
2. Connect GitHub
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Environment Variables تنظیم کنید

### Fly.io

```bash
# نصب Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Init
fly launch

# Deploy
fly deploy
```

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
- [ ] Backup منظم از دیتابیس

### Firewall:
```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
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

### Backup دیتابیس:
```bash
# Backup
cp server/database/egra.db server/database/egra-backup-$(date +%Y%m%d).db

# Cron job (هر روز ساعت 3 صبح)
0 3 * * * cp /var/www/egra-bookstore/server/database/egra.db /var/www/backups/egra-$(date +\%Y\%m\%d).db
```

---

## 📞 پشتیبانی

اگر سوالی دارید:
- 📧 info@egra-book.af
- 📱 +93 70 123 4567

---

## 📄 لایسنس

MIT License - کتاب‌فروشی اقرأ © 1403
