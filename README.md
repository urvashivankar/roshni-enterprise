# ❄️ Roshni Enterprise - The Future of Cooling Comfort

**Roshni Enterprise** is a comprehensive digital ecosystem designed to revolutionize AC service management in Vadodara. Bridging the gap between customers and service professionals, we offer a seamless, premium experience for booking, tracking, and managing air conditioning services.

---

##  Key Features

### For Customers
*   **Instant Booking Engine**: Schedule repairs, installations, or maintenance in seconds.
*   **Real-Time Tracking**: Monitor service status from *Pending* to *Completed* via a personal dashboard.
*   **Transparent Pricing**: Clear service bundles and estimates with no hidden costs.
*   **Corporate Portals**: Specialized inquiry forms and management for B2B clients.

### For Administrators (Command Center)
*   **Live Operations Dashboard**: value-packed "Mission Control" view of all active bookings.
*   **Role-Based Access Control (RBAC)**: Secure, tiered access ensuring data privacy and operational integrity.
*   **Real-Time Updates**: Instant notifications for new bookings and status changes via Socket.io.
*   **Revenue Intelligence**: Visual analytics for financial performance and service trends.
*   **Skeleton Loading UI**: Premium, shimmer-effect loading states for a polished user experience.

---

##  Technology Stack

Built with a focus on performance, security, and scalability.

*   **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, TanStack Query.
*   **Backend**: Node.js, Express.js, Socket.io (Real-time).
*   **Database**: MongoDB (Atlas ready).
*   **Security**: JWT Authentication, BCrypt password hashing, RBAC middleware.

---

##  Local Developement Setup

Prerequisites: Node.js (v18+) and MongoDB installed locally or an Atlas URI.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/urvashivankar/roshni-enterprise.git
    cd roshni-enterprise
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file based on .env.example
    # npm run seed (Optional: Seed initial admin user)
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```


##  Project Structure

*   `frontend/`: React application with distinct `pages/`, `components/`, and `hooks/`.
*   `backend/`: Express server with `routes/`, `models/`, `middleware/`, and `controllers/`.
*   `backend/middleware/admin.js`: RBAC implementation.

---

© 2026 Roshni Enterprise. All rights reserved.
