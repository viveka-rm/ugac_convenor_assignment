# UGAC Convenor Assignment - Course Registration Portal

## Project Overview

This project is a full-stack Course Registration Portal developed using:

- React.js (Frontend)
- Django (Backend)
- Django REST Framework
- SQLite Database

The portal supports separate dashboards for Admins and Students with authentication and role-based access control.

---

# Features

## Authentication System
- Login functionality
- Persistent login using localStorage
- Separate Admin and Student dashboards
- Logout functionality

---

# Student Features

Students can:

- Login to the portal
- View available courses
- Register/enroll for courses
- View registration status
- Check whether registrations are:
  - Pending
  - Approved
  - Rejected

---

# Admin Features

Admins can:

- Login to admin dashboard
- View all student registrations
- Approve registrations
- Reject registrations
- Add new courses
- Edit existing courses
- Delete courses
- View course details

---

# Tech Stack

## Frontend
- React.js
- Axios
- CSS

## Backend
- Django
- Django REST Framework

## Database
- SQLite

---

# Folder Structure

```bash
UGAC_Convenor_Assignment/
│
├── backend/
│
├── frontend/
│
├── README.md
```

---

# Backend Setup

## Step 1: Create Virtual Environment

```bash
python -m venv venv
```

---

## Step 2: Activate Virtual Environment

### Windows PowerShell

```bash
.\venv\Scripts\Activate
```

---

## Step 3: Install Dependencies

```bash
pip install django djangorestframework django-cors-headers
```

---

## Step 4: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Step 5: Create Superuser

```bash
python manage.py createsuperuser
```

---

## Step 6: Run Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```bash
http://127.0.0.1:8000/
```

---

# Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Frontend Server

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173/
```

---

# API Endpoints

## Courses

| Method | Endpoint | Description |
|---|---|---|
| GET | /courses/ | Get all courses |
| POST | /courses/add/ | Add course |
| PUT | /courses/edit/<id>/ | Edit course |
| DELETE | /courses/delete/<id>/ | Delete course |

---

## Registrations

| Method | Endpoint | Description |
|---|---|---|
| GET | /registrations/all/ | Get all registrations |
| POST | /registrations/register/ | Register course |
| PUT | /registrations/update/<id>/ | Approve/Reject registration |

---

## Users

| Method | Endpoint | Description |
|---|---|---|
| POST | /users/login/ | User login |

---

# Admin Credentials

Admin user is created using:

```bash
python manage.py createsuperuser
```

# Author

Viveka R M
