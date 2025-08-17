# Dockerfile
FROM python:3.12-slim

# منع بايثون من حفظ الملفات .pyc وتفعيل flush للـ stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# تثبيت بعض الأدوات الأساسية
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# إنشاء مجلد العمل
WORKDIR /code

# نسخ الملفات
COPY requirements.txt /code/

# تثبيت المكتبات
RUN pip install --no-cache-dir -r requirements.txt

# نسخ بقية المشروع
COPY . /code/

# فتح المنفذ
EXPOSE 8000

# أمر التشغيل الافتراضي
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
