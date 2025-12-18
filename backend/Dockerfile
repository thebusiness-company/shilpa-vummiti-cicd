FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ✅ REQUIRED FOR collectstatic
ENV SECRET_KEY=build-time-secret-key

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --settings=shilpa_vummiti.settings.prod --noinput

CMD ["gunicorn", "shilpa_vummiti.wsgi:application", "--bind", "0.0.0.0:8000"]
