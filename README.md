# ❄️ Roshni Enterprise - Next-Gen Cooling Solutions Platform

**Roshni Enterprise** is a sophisticated, full-stack web application designed to modernize the HVAC service industry in Vadodara. It combines a premium, cinematic frontend with a powerful Admin Intelligence System for real-time business management.

![Roshni Enterprise](https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop)

## 🚀 Key Features

### 🏢 Customer Experience
- **Cinematic Landing Page**: High-performance React frontend with Framer Motion animations and glassmorphism UI.
- **Instant Booking Engine**: "Uber-style" service booking with real-time status tracking.
- **Corporate Inquiry System**: Specialized B2B portal for bulk maintenance (AMC) and institutional projects.
- **Localized Content**: Vadodara-centric services with integrated Google Maps and direct contact hotlines.
- **Mobile-First Design**: Fully responsive interface optimized for all devices.

### 🧠 Admin Intelligence & Business Control
- **Live Booking Command Center**: Real-time dashboard to manage bookings with one-click status updates (Pending → In Progress → Completed).
- **Revenue Intelligence**: Visual analytics for daily/monthly revenue, service popularity, and average order value.
- **Predictive Analytics**: Demand forecasting to identify peak hours and cancellation risk detection.
- **Security & Audit**: Comprehensive audit logging for all admin actions with IP tracking and role-based access control.

### 🔒 Security & Performance
- **JWT Authentication**: Secure, token-based session management.
- **Role-Based Access Control**: Strict separation between Customer and Admin portals.
- **Data Encryption**: Secure password hashing and sensitive data handling.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion, CSS Keyframes
- **State Management**: React Hooks (Context API)
- **Visualization**: Recharts (Analytics & Trends)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JSON Web Tokens (JWT), Bcrypt

### DevOps & Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman / Thunder Client
- **Linting**: ESLint

---

## 🔧 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/urvashivankar/roshni-enterprise.git
    cd roshni-enterprise
    ```

2.  **Install Dependencies**
    ```bash
    # Install Backend Dependencies
    cd backend
    npm install

    # Install Frontend Dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secure_jwt_secret
    ```

4.  **Run the Application**
    ```bash
    # Terminal 1: Start Backend Server
    cd backend
    npm start

    # Terminal 2: Start Frontend Development Server
    cd frontend
    npm run dev
    ```

5.  **Access the App**
    - **Client Portal**: `http://localhost:8080`
    - **Admin Portal**: `http://localhost:8080/admin/login`

---

## 📁 Project Structure

```
roshni-enterprise/
├── backend/                # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose Schemas (User, Booking, Analytics)
│   ├── routes/             # API Endpoints (Auth, Bookings, Analytics)
│   └── utils/              # Helper functions (Sync, Logger)
│
├── frontend/               # React + Vite Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Cards, Modals)
│   │   ├── pages/          # Application Pages (Home, Dashboard, Admin)
│   │   ├── lib/            # Utilities
│   │   └── assets/         # Images and static files
│   └── public/             # Static public assets
```

---

## 👥 Contributors

- **Urvashi Vankar** - Lead Developer & Architect

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

© 2026 Roshni Enterprise. All rights reserved.
