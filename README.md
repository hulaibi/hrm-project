# HRM – Human Resources Management (Django + React)

A full‑stack Human Resources Management (HRM) system built with **Django** (Backend) and **React + Vite** (Frontend).

> English comes first. Scroll down for the **Arabic version**.

---

## Table of Contents
- [Requirements](#requirements)
- [Quick Start](#quick-start)
  - [Backend (Django)](#backend-django)
  - [Frontend (React + Vite)](#frontend-react--vite)
  - [Run with Docker (optional)](#run-with-docker-optional)
- [CORS Notes](#cors-notes)
- [When to Split Repositories?](#when-to-split-repositories)
- [If You Split Later](#if-you-split-later)
- [Screenshots](#screenshots)
- [Project Structure (suggested)](#project-structure-suggested)

---

## Requirements
- **Python** 3.12+
- **Node.js** 18+
- **Docker** & **Docker Compose** (optional, recommended for parity)

---

## Quick Start

### Backend (Django)
```bash
# 1) Go to backend
cd backend

# 2) Create & activate virtualenv
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows (PowerShell):
# .venv\Scripts\Activate.ps1

# 3) Install dependencies
pip install -r requirements.txt

# 4) Copy env and edit values
cp .env.example .env

# (Optional) Example .env keys
# DJANGO_SECRET_KEY=your-secret
# DEBUG=True
# ALLOWED_HOSTS=localhost,127.0.0.1
# CORS_ALLOWED_ORIGINS=http://localhost:5173
# DATABASE_URL=sqlite:///db.sqlite3

# 5) Apply migrations
python manage.py migrate

# 6) Run dev server
python manage.py runserver
# -> http://localhost:8000
```

### Frontend (React + Vite)
```bash
# 1) New terminal, go to frontend
cd frontend

# 2) Install deps
npm install

# 3) Copy env and edit values
cp .env.example .env

# (Optional) Example .env
# VITE_API_URL=http://localhost:8000

# 4) Run dev server
npm run dev
# -> http://localhost:5173
```

### Run with Docker (optional)
Make sure you are in the project root (where `docker-compose.yml` exists).
```bash
# Build & run
docker compose up --build

# Or run detached
docker compose up --build -d
```
- Backend → `http://localhost:8000`
- Frontend → `http://localhost:5173`

> Tip: Update any environment variables in the compose file or referenced `.env` files as needed.

---

## CORS Notes
When backend and frontend run on different ports, browsers enforce **CORS**. Allow your frontend origin in Django settings:

```python
# backend/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Frontend dev server
    # Add other allowed origins if needed
]
```

> **Development only**: Keep the list tight and explicit in production.

---

## When to Split Repositories?
Consider separate repos for **frontend** and **backend** when:
- **Independent deployments** (e.g., Frontend → Vercel/Netlify, Backend → VPS/Cloud Run/EC2).
- **Separate teams** with different release cycles and access controls.
- **Project growth/complexity** makes a single monorepo heavy to build/test/deploy.

---

## If You Split Later
- Create two repos, e.g. `hrm-backend` and `hrm-frontend`.
- Each repo gets its own `README.md`, CI/CD, and versioning.
- Keep versions in sync using:
  - **Release tags** (`v1.2.0`) to mark compatible pairs.
  - **Git submodules** if one repo needs to embed the other.
- Document compatible versions in both READMEs.

---

## Screenshots
Add your images to a folder (e.g., `docs/screenshots/`) and reference them here.

```md
## Screenshots

![Home](docs/screenshots/home.png)
![Submit Case](docs/screenshots/submit-case.png)
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
```

> Tip: For GitHub, you can drag-and-drop images into PRs or issues to get hosted URLs, then paste them here.

---

## Project Structure (suggested)
```
hrm/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── <django apps...>
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
├── docs/
│   └── screenshots/
│       ├── home.png
│       ├── submit-case.png
│       └── admin-dashboard.png
├── docker-compose.yml
└── README.md
```

---

# 🚀 **النسخة العربية**

نظام إدارة الموارد البشرية (HRM) مبني باستخدام **Django** للواجهة الخلفية و**React + Vite** للواجهة الأمامية.

---

## الفهرس
- [المتطلبات](#المتطلبات)
- [دليل التشغيل](#دليل-التشغيل)
  - [الواجهة الخلفية (Django)](#الواجهة-الخلفية-django)
  - [الواجهة الأمامية (React + Vite)](#الواجهة-الأمامية-react--vite)
  - [التشغيل عبر Docker (اختياري)](#التشغيل-عبر-docker-اختياري)
- [ملاحظات CORS](#ملاحظات-cors)
- [متى نفصل المستودعات؟](#متى-نفصل-المستودعات)
- [إن قررت الفصل لاحقًا](#إن-قررت-الفصل-لاحقًا)
- [السكرين شوت](#السكرين-شوت)
- [هيكلية المشروع (مقترح)](#هيكلية-المشروع-مقترح)

---

## المتطلبات
- **Python** 3.12+
- **Node.js** 18+
- **Docker** و **Docker Compose** (اختياريان)

---

## دليل التشغيل

### الواجهة الخلفية (Django)
```bash
# 1) ادخل مجلد backend
cd backend

# 2) أنشئ وفعّل بيئة افتراضية
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows (PowerShell):
# .venv\Scripts\Activate.ps1

# 3) ثبّت الحزم
pip install -r requirements.txt

# 4) انسخ ملف البيئة ثم عدّل القيم
cp .env.example .env

# (اختياري) مثال لمفاتيح .env
# DJANGO_SECRET_KEY=secret
# DEBUG=True
# ALLOWED_HOSTS=localhost,127.0.0.1
# CORS_ALLOWED_ORIGINS=http://localhost:5173
# DATABASE_URL=sqlite:///db.sqlite3

# 5) طبّق الترحيلات
python manage.py migrate

# 6) شغّل الخادم
python manage.py runserver
# -> http://localhost:8000
```

### الواجهة الأمامية (React + Vite)
```bash
# 1) افتح طرفية جديدة وادخل frontend
cd frontend

# 2) ثبّت الحزم
npm install

# 3) انسخ ملف البيئة ثم عدّل القيم
cp .env.example .env

# (اختياري) مثال .env
# VITE_API_URL=http://localhost:8000

# 4) شغّل خادم التطوير
npm run dev
# -> http://localhost:5173
```

### التشغيل عبر Docker (اختياري)
تأكد أنك في مجلد المشروع الرئيسي (حيث يوجد `docker-compose.yml`).
```bash
# بناء وتشغيل
docker compose up --build

# أو في الخلفية
docker compose up --build -d
```
- الواجهة الخلفية → `http://localhost:8000`
- الواجهة الأمامية → `http://localhost:5173`

> ملاحظة: حدّث متغيرات البيئة في ملف الـ compose أو ملفات `.env` حسب الحاجة.

---

## ملاحظات CORS
عند تشغيل الواجهة الأمامية والخلفية على منافذ مختلفة، قد تواجه قيود **CORS**. أضِف عنوان الواجهة الأمامية في إعدادات Django:

```python
# backend/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # عنوان واجهة التطوير
    # أضف عناوين أخرى عند الحاجة
]
```

> **خاص بالتطوير**: في الإنتاج يجب تضييق القائمة لتكون أكثر أمانًا.

---

## متى نفصل المستودعات؟
فكّر بفصل مستودعات الواجهة الأمامية والخلفية عندما:
- **النشر مستقل** (مثلاً: الواجهة الأمامية على Vercel/Netlify، والخلفية على خادم منفصل أو خدمة سحابية).
- **فرق عمل منفصلة** بدورات إصدار وصلاحيات مختلفة.
- **كبر المشروع وتعقيده** يجعل monorepo أثقل في البناء والاختبارات والنشر.

---

## إن قررت الفصل لاحقًا
- أنشئ مستودعين جديدين: `hrm-backend` و `hrm-frontend`.
- لكل مستودع ملف `README.md` خاص، وإعدادات CI/CD وإصدارات منفصلة.
- حافظ على التوافق بين الإصدارات باستخدام:
  - **وسوم الإصدارات** (Release tags) لتحديد الإصدارات المتوافقة.
  - **Git submodules** إذا احتجت تضمين مشروع داخل آخر.
- وثّق الإصدارات المتوافقة في كلا المستودعين.

---

## السكرين شوت
ضع الصور داخل مجلد مثل: `docs/screenshots/` ثم أشر إليها هنا:

```md
## Screenshots

![الصفحة الرئيسية](docs/screenshots/home.png)
![إرسال قضية](docs/screenshots/submit-case.png)
![لوحة الإدارة](docs/screenshots/admin-dashboard.png)
```

> تلميح: في GitHub، يمكنك سحب وإفلات الصور للحصول على روابط جاهزة للصق هنا.

---

## هيكلية المشروع (مقترح)
```
hrm/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── <django apps...>
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
├── docs/
│   └── screenshots/
│       ├── home.png
│       ├── submit-case.png
│       └── admin-dashboard.png
├── docker-compose.yml
└── README.md
```
