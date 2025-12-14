# 🌟 Roshni Enterprise - AC Repair & Installation Services

> **Professional AC Installation, Repair & Maintenance Services in Vadodara**

A modern, full-stack web application for Roshni Enterprise, providing comprehensive air conditioning services including installation, repair, maintenance, and 24/7 emergency support.

![Roshni Enterprise](https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=400&fit=crop)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 Frontend Features
- **Modern UI/UX** - Built with React, TypeScript, and Tailwind CSS
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Component Library** - Powered by shadcn/ui and Radix UI
- **Dark Mode Support** - Theme switching with next-themes
- **Form Validation** - React Hook Form with Zod schema validation
- **Routing** - Client-side routing with React Router DOM
- **Animations** - Smooth transitions and micro-interactions

### 🔧 Services Offered
- ✅ AC Installation (All Brands)
- ✅ AC Repair & Troubleshooting
- ✅ Regular Maintenance & Servicing
- ✅ Gas Refilling & Leak Detection
- ✅ Annual Maintenance Contracts (AMC)
- ✅ 24/7 Emergency Service
- ✅ Commercial & Residential Solutions

### 🔐 Backend Features
- **RESTful API** - Express.js server with MongoDB
- **Authentication** - JWT-based secure authentication
- **User Management** - Admin and customer role management
- **Email Notifications** - Nodemailer integration
- **Security** - bcrypt password hashing, CORS protection
- **Database** - MongoDB with Mongoose ODM

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3 + TypeScript
- **Build Tool:** Vite 5.4
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router DOM 6.26
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.2
- **Database:** MongoDB with Mongoose 9.0
- **Authentication:** JWT (jsonwebtoken 9.0)
- **Password Hashing:** bcryptjs 3.0
- **Email:** Nodemailer 7.0
- **Environment:** dotenv 17.2
- **CORS:** cors 2.8

### Development Tools
- **Package Manager:** npm / bun
- **Linting:** ESLint 9.9
- **Type Checking:** TypeScript 5.5
- **Dev Server:** Nodemon (backend), Vite (frontend)

---

## 📁 Project Structure

```
Roshni_Enterprise_web/
├── api/
│   └── index.js                 # Vercel serverless function entry
├── backend/
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Error handling middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Booking.js          # Booking schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── bookings.js         # Booking routes
│   ├── .env.example            # Environment variables template
│   ├── create_admin.js         # Admin user creation script
│   ├── server.js               # Express server configuration
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # App entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.ts      # Tailwind configuration
│   └── package.json            # Frontend dependencies
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/urvashivankar/cooling-comfort-connect.git
   cd Roshni_Enterprise_web
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up Environment Variables**
   
   Create `.env` file in the `backend` directory:
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see [Environment Variables](#-environment-variables))

5. **Create Admin User (Optional)**
   ```bash
   cd backend
   node create_admin.js
   ```

### Running the Application

#### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

#### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/roshni_enterprise
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roshni_enterprise

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@roshnienterprise.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment (Optional)

Create `.env` in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/forgot-password` | Request password reset | ❌ |
| POST | `/api/auth/reset-password` | Reset password | ❌ |

### Booking Routes (`/api/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create new booking | ✅ |
| GET | `/api/bookings` | Get all bookings (Admin) | ✅ Admin |
| GET | `/api/bookings/my-bookings` | Get user's bookings | ✅ |
| GET | `/api/bookings/:id` | Get booking by ID | ✅ |
| PATCH | `/api/bookings/:id` | Update booking status | ✅ Admin |
| DELETE | `/api/bookings/:id` | Delete booking | ✅ Admin |

### Request Examples

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "phone": "9876543210"
  }'
```

**Create Booking:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "serviceType": "AC Repair",
    "date": "2024-12-20",
    "time": "10:00 AM",
    "address": "123 Main St, Vadodara",
    "description": "AC not cooling properly"
  }'
```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is configured for Vercel deployment with serverless functions.

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env`

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Manual Deployment

**Backend (Node.js Hosting):**
- Deploy to platforms like Heroku, Railway, Render, or DigitalOcean
- Set environment variables in hosting platform
- Ensure MongoDB connection is accessible

**Frontend (Static Hosting):**
- Build: `npm run build` in frontend directory
- Deploy `dist` folder to Netlify, Vercel, or any static host

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👥 Contact

**Roshni Enterprise**
- 📧 Email: contact@roshnienterprise.com
- 📱 Phone: +91 98765 43210
- 🌐 Website: [roshnienterprise.com](https://roshnienterprise.com)
- 📍 Location: Vadodara, Gujarat, India

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Express.js](https://expressjs.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment Platform

---

<div align="center">
  <p>Made with ❤️ by Roshni Enterprise Team</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
