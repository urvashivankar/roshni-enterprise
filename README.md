# Roshni Enterprise - Cooling Comfort Connect

**Roshni Enterprise** is a modern, responsive website for a professional AC Service provider in Vadodara, Gujarat. Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, it offers a premium user experience for booking air conditioning repair, installation, and maintenance services.

![Roshni Enterprise Demo](/frontend/public/technician.png)

## 🌟 Features

*   **Premium UI/UX:** Royal Blue & Gold theme with smooth animations and glassmorphism effects.
*   **Mobile Responsive:** Fully optimized for all devices with a custom mobile navigation menu.
*   **Booking System:** Integrated booking widget with email notifications and admin dashboard.
*   **Service Showcase:** Detailed cards for AC Repair, Installation, Maintenance, and AMC.
*   **Location Focused:** Customized content targeting the **Vadodara** market.
*   **Contact Integration:** One-click calling, WhatsApp integration, and email links.
*   **Trust Indicators:** "Udhyam Verified" badge, testimonials section, and service guarantee highlights.
*   **Admin Dashboard:** Secure admin panel to manage bookings and customer requests.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **UI Components:** Shadcn UI (Radix Primitives)
*   **Font:** Inter (via Google Fonts)

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (MongoDB Atlas)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Email:** Nodemailer (Gmail)

### Deployment
*   **Platform:** Vercel (Frontend + Serverless Backend)
*   **Database Hosting:** MongoDB Atlas

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   MongoDB Atlas account (for production)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/urvashivankar/cooling-comfort-connect.git
    cd cooling-comfort-connect
    ```

2.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

3.  Install backend dependencies:
    ```bash
    cd ../backend
    npm install
    ```

4.  Set up environment variables:
    
    **Backend** (`backend/.env`):
    ```bash
    cp backend/.env.example backend/.env
    # Edit backend/.env with your actual values
    ```
    
    **Frontend** (`frontend/.env.local`):
    ```bash
    cp frontend/.env.example frontend/.env.local
    # Edit frontend/.env.local with your API URL
    ```

### Running Locally

1.  Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2.  In a new terminal, start the frontend:
    ```bash
    cd frontend
    npm run dev
    ```

The application will be available at `http://localhost:8080`.

### Building for Production

To create a production build:

```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📂 Project Structure

```
.
├── frontend/               # Frontend source code
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── index.css       # Global styles
│   │   └── main.tsx        # Application entry point
│   └── vite.config.ts      # Vite configuration
├── backend/                # Backend source code
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── server.js           # Server entry point
├── api/                    # Vercel serverless functions
└── vercel.json             # Vercel deployment config
```

## 🌐 Deployment

This project is configured for deployment on **Vercel**.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/urvashivankar/cooling-comfort-connect)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- MongoDB Atlas setup
- Environment variable configuration
- Vercel deployment steps
- Custom domain setup
- Troubleshooting guide

### Required Environment Variables

Set these in your Vercel dashboard:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Gmail address for notifications
- `EMAIL_PASS` - Gmail app password
- `NODE_ENV` - Set to "production"

## 🔐 Admin Access

To create an admin user:

```bash
cd backend
node create_admin.js
```

Then login at `/admin` with your credentials.

## 📞 Contact

**Roshni Enterprise**
*   **Phone:** +91 9737652210 / 9510972650
*   **Email:** roshnienterprise01022024@gmail.com
*   **Location:** Vadodara, India
*   **Instagram:** [@roshni_enterprise_](https://www.instagram.com/roshni_enterprise_)

## 📄 License

© 2024 Roshni Enterprise. All rights reserved.

## 🙏 Acknowledgments

- Built with modern web technologies
- UI components from Shadcn UI
- Icons from Lucide React
- Deployed on Vercel

