# Roshni Enterprise – Cooling Comfort Connect

## A Comprehensive Digital Ecosystem for AC Service Management

---

**Project Title:** Roshni Enterprise – Cooling Comfort Connect

**Domain:** Full-Stack Web Development (MERN Stack)

**Submitted By:** Urvashi Vankar

**Academic Year:** 2025–2026

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
3. [Problem Statement](#3-problem-statement)
4. [Objectives of the Project](#4-objectives-of-the-project)
5. [Scope of the Project](#5-scope-of-the-project)
6. [System Architecture](#6-system-architecture)
7. [Technology Stack Explanation](#7-technology-stack-explanation)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Modules Description](#10-modules-description)
11. [Database Design](#11-database-design)
12. [Workflow / System Flow](#12-workflow--system-flow)
13. [Security Considerations](#13-security-considerations)
14. [Testing Strategy](#14-testing-strategy)
15. [Advantages of the System](#15-advantages-of-the-system)
16. [Limitations](#16-limitations)
17. [Future Enhancements](#17-future-enhancements)
18. [Conclusion](#18-conclusion)
19. [References](#19-references)

---

## 1. Abstract

**Roshni Enterprise – Cooling Comfort Connect** is a full-stack, real-time web application engineered to digitalize and streamline air conditioning (AC) service management for a local enterprise operating in Vadodara, Gujarat. Built on the MERN technology stack (MongoDB, Express.js, React, Node.js), the platform serves as a bridge between end-customers seeking AC repair, installation, and maintenance services and the administrative team responsible for scheduling, dispatching, and business analytics.

The system features an instant booking engine for customers, a real-time administrative Command Center powered by Socket.io for live operational monitoring, role-based access control (RBAC) for data integrity, and a revenue intelligence dashboard for strategic decision-making. A dedicated corporate inquiry module further extends the platform's reach to B2B clients requiring bulk service contracts. The application follows modern software engineering best practices including input validation, rate limiting, audit logging, and graceful error handling, making it a production-grade solution suitable for deployment on cloud platforms such as Vercel and Render.

**Keywords:** MERN Stack, Real-Time Web Application, Service Management, Socket.io, JWT Authentication, Role-Based Access Control, Revenue Analytics.

---

## 2. Introduction

### 2.1 Background

The Heating, Ventilation, and Air Conditioning (HVAC) industry is one of the fastest growing service sectors in India, driven by rising temperatures, urbanization, and increased disposable income. In Tier-2 cities like Vadodara, the demand for reliable AC servicing—including installation, repair, gas refilling, and annual maintenance contracts (AMC)—has surged significantly. However, the operational management of most local service providers remains deeply rooted in manual, paper-based, or phone-call-driven workflows.

### 2.2 About Roshni Enterprise

Roshni Enterprise is a Vadodara-based AC service provider catering to both residential and commercial customers. The company offers a comprehensive suite of services including AC installation, repair and troubleshooting, gas refilling, deep cleaning, and annual maintenance contracts. Prior to this project, the business relied on manual booking registers, phone-call-based scheduling, and spreadsheet-driven revenue tracking.

### 2.3 Motivation

The motivation behind this project stems from the need to:
- Eliminate the inefficiencies of manual service booking and tracking.
- Provide customers with a modern, self-service booking experience.
- Empower administrators with real-time operational intelligence.
- Create a scalable digital platform that can grow alongside the business.

### 2.4 Purpose of the Report

This report presents a complete technical and functional overview of the Cooling Comfort Connect platform. It covers the system architecture, technology choices, module design, database structure, security measures, testing approach, and future roadmap. The document is intended for academic evaluation as well as serving as a technical reference for future development.

---

## 3. Problem Statement

Local AC service providers in Vadodara, including Roshni Enterprise, face the following challenges:

| # | Problem | Impact |
|---|---------|--------|
| 1 | **Manual Booking Process** | Customers must call during business hours to schedule a service, leading to missed bookings and lost revenue. |
| 2 | **Lack of Service Tracking** | Once a booking is placed, customers have no visibility into its status (Pending, Confirmed, or Completed), resulting in frequent follow-up calls. |
| 3 | **No Centralized Dashboard** | Administrators manage bookings through handwritten logs or basic spreadsheets, making it difficult to monitor daily operations at a glance. |
| 4 | **Absence of Revenue Analytics** | Financial performance tracking is ad-hoc, with no data-driven insights into service trends, revenue patterns, or customer metrics. |
| 5 | **No Corporate Client Management** | B2B inquiries from offices, hospitals, and commercial spaces are handled through the same informal phone-call process, lacking structure and professionalism. |
| 6 | **No Audit Trail** | Administrative actions (status changes, cancellations) are not logged, making accountability and dispute resolution difficult. |
| 7 | **Poor Scalability** | The existing manual workflow cannot scale as the customer base grows, leading to operational bottlenecks. |

These challenges collectively hinder customer satisfaction, operational efficiency, and business growth. There is a clear need for a digital platform that addresses each of these pain points through a modern, integrated solution.

---

## 4. Objectives of the Project

The primary objectives of the Cooling Comfort Connect platform are as follows:

1. **Digitalize Service Booking:** Develop an intuitive, web-based booking engine that allows customers to schedule AC services at any time, without the need for phone calls.

2. **Enable Real-Time Tracking:** Implement a status lifecycle (Pending → Confirmed → Completed / Cancelled) that customers can monitor through their personal dashboards.

3. **Build an Administrative Command Center:** Create a comprehensive, real-time admin dashboard that provides a "Mission Control" view of all active bookings, enabling efficient scheduling and dispatch.

4. **Implement Role-Based Access Control:** Enforce strict access hierarchies ensuring that customer data is protected and administrative functions are restricted to authorized personnel.

5. **Deliver Revenue Intelligence:** Provide financial analytics including daily/weekly/monthly revenue trends, service-wise breakdowns, customer metrics, and hourly distribution patterns.

6. **Support Corporate Clients:** Design a dedicated corporate inquiry module with structured forms for B2B clients requiring bulk service contracts and quotations.

7. **Maintain Audit Compliance:** Log every administrative action (login, status change, cancellation) with timestamp, IP address, and user agent information for full accountability.

8. **Ensure Production-Grade Quality:** Implement industry-standard security (JWT, BCrypt, Helmet), performance optimization (rate limiting, indexed queries), and error handling throughout the application.

---

## 5. Scope of the Project

### 5.1 In Scope

The following features and capabilities are within the scope of this project:

- **Customer-Facing Features:**
  - User Registration and Login (email + phone + password)
  - Service Booking with date, time, and area selection
  - Personal booking history and status tracking ("My Bookings")
  - Post-service review and rating system (1–5 stars)
  - Guest booking (without mandatory registration)
  - Corporate inquiry form for B2B clients

- **Administrative Features:**
  - Secure Admin Login with RBAC enforcement
  - Live Command Center Dashboard with real-time updates
  - Booking status management (Pending / Confirmed / Completed / Cancelled)
  - Revenue Intelligence with visual analytics
  - Predictive Analytics module
  - Audit Log Viewer with filtering capabilities
  - Corporate inquiry management with quotation support

- **Technical Features:**
  - Real-time event broadcasting via Socket.io
  - RESTful API architecture
  - Input validation on both client and server side
  - Global rate limiting to prevent API abuse
  - Centralized error handling
  - SEO optimization with dynamic meta tags
  - Responsive design for mobile and desktop

### 5.2 Out of Scope

The following are explicitly outside the scope of the current version:

- Payment gateway integration (online payments)
- Native mobile application (iOS / Android)
- Technician mobile app for field operations
- GPS-based technician tracking
- Multi-language / internationalization support
- SMS / WhatsApp notifications
- Inventory management for spare parts

---

## 6. System Architecture

### 6.1 Architectural Overview

The application follows a **three-tier client-server architecture** consistent with modern full-stack web applications:

```
┌─────────────────────────────────────────────────┐
│                  CLIENT TIER                    │
│         React 18 + TypeScript + Vite            │
│    (Shadcn UI, Tailwind CSS, Framer Motion)     │
│         TanStack Query for data fetching        │
└──────────────────────┬──────────────────────────┘
                       │  HTTP (REST API)
                       │  WebSocket (Socket.io)
                       ▼
┌─────────────────────────────────────────────────┐
│                 SERVER TIER                     │
│           Node.js + Express.js                  │
│   Middleware: Auth, Admin, Validation,          │
│   Rate Limiter, Error Handler, Helmet, Morgan   │
│         Controllers → Business Logic            │
│         Socket.io → Real-Time Events            │
└──────────────────────┬──────────────────────────┘
                       │  Mongoose ODM
                       ▼
┌─────────────────────────────────────────────────┐
│                  DATA TIER                      │
│              MongoDB (Atlas)                    │
│   Collections: Users, Bookings, Inquiries,      │
│   Reviews, Analytics, AuditLogs                 │
└─────────────────────────────────────────────────┘
```

### 6.2 Communication Patterns

The system employs two distinct communication patterns:

1. **Request-Response (REST):** Standard HTTP requests for CRUD operations such as creating bookings, fetching user data, and updating statuses.

2. **Event-Driven (WebSocket):** Socket.io is used for real-time event broadcasting. When a new booking is created or a booking status is updated, the server emits events (`newBooking`, `bookingStatusUpdated`) that are received instantly by all connected admin clients, eliminating the need for polling.

### 6.3 Deployment Architecture

- **Frontend:** Deployed on Vercel as a static site with server-side routing via `vercel.json` configuration.
- **Backend:** Deployed on Render (or similar PaaS) as a Node.js web service.
- **Database:** MongoDB Atlas (cloud-hosted, managed database).

---

## 7. Technology Stack Explanation

### 7.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | Core UI library for building component-based user interfaces with a virtual DOM for efficient rendering. |
| **TypeScript** | 5.x | Superset of JavaScript providing static type checking, improving code reliability and developer experience. |
| **Vite** | 5.x | Next-generation build tool providing instant hot module replacement (HMR) and optimized production builds. |
| **Tailwind CSS** | 3.x | Utility-first CSS framework for rapid, consistent, and responsive styling without writing custom CSS. |
| **Shadcn UI** | Latest | A collection of re-usable, accessible UI components built on Radix UI primitives, providing production-ready form inputs, cards, buttons, dialogs, and more. |
| **TanStack Query** | 5.x | Powerful data-fetching library for managing server state, caching, background refetching, and optimistic updates. |
| **Framer Motion** | Latest | Animation library for React, used for smooth page transitions, skeleton loading states, and micro-interactions. |
| **Lucide React** | Latest | Modern icon library providing clean, consistent SVG icons throughout the interface. |
| **Recharts** | Latest | Composable charting library for revenue and analytics visualizations. |

### 7.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x+ | JavaScript runtime built on Chrome's V8 engine, enabling server-side JavaScript execution. |
| **Express.js** | 4.x | Minimal, flexible web application framework providing robust routing, middleware support, and HTTP utility methods. |
| **Socket.io** | 4.x | Enables real-time, bidirectional, event-based communication between the server and connected clients. |
| **Mongoose** | 7.x | Elegant MongoDB object data modeling (ODM) library providing schema-based data validation, type casting, and query building. |
| **JSON Web Tokens (JWT)** | 9.x | Industry-standard token-based authentication mechanism for stateless user session management. |
| **BCrypt.js** | 2.x | Library for hashing passwords using the BCrypt algorithm, protecting stored credentials against brute-force attacks. |
| **Helmet** | 7.x | Security middleware that sets various HTTP headers to protect against well-known web vulnerabilities (XSS, clickjacking, etc.). |
| **Morgan** | 1.x | HTTP request logger middleware for development and production debugging. |
| **dotenv** | 16.x | Loads environment variables from a `.env` file into `process.env`, enabling secure configuration management. |

### 7.3 Database

| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud-hosted, fully managed NoSQL document database. Chosen for its flexible schema design, horizontal scalability, and natural fit with the JavaScript/JSON ecosystem of the MERN stack. |

### 7.4 DevOps and Tooling

| Tool | Purpose |
|------|---------|
| **Git & GitHub** | Version control and collaborative development. |
| **Vercel** | Frontend deployment with automatic CI/CD from GitHub. |
| **Render** | Backend deployment as a managed Node.js web service. |
| **VS Code** | Primary integrated development environment. |
| **Postman** | API testing and documentation during development. |

---

## 8. Functional Requirements

### 8.1 Customer Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-01 | User Registration | Customers can register using email, phone number, and password. Duplicate email and phone are rejected. |
| FR-02 | User Login | Registered users can log in with email and password to access their personal dashboard. |
| FR-03 | Service Booking | Customers can book an AC service by selecting service type, preferred date, time slot, name, phone, and area. |
| FR-04 | Guest Booking | Non-registered users can place bookings without creating an account. |
| FR-05 | My Bookings | Logged-in users can view a chronological list of all their past and current bookings with real-time status. |
| FR-06 | Service Review | After a booking is completed, customers can leave a rating (1–5 stars) and written review. |
| FR-07 | Corporate Inquiry | B2B clients can submit structured inquiry forms with company name, contact person, phone, requirements (service type + units), and additional notes. |

### 8.2 Administrative Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-08 | Admin Login | Administrators access the system through a dedicated, secure login portal with RBAC enforcement. |
| FR-09 | Command Center | A real-time dashboard displaying all active bookings, sortable and filterable by status, date, and service type. |
| FR-10 | Booking Status Update | Admins can transition bookings through the lifecycle: Pending → Confirmed → Completed / Cancelled. |
| FR-11 | Real-Time Notifications | New bookings and status changes are broadcast in real time to all connected admin sessions via Socket.io. |
| FR-12 | Revenue Intelligence | Visual analytics dashboard showing revenue trends, service-wise breakdowns, hourly distribution, and customer metrics. |
| FR-13 | Predictive Analytics | Data-driven insights for operational planning and demand forecasting. |
| FR-14 | Audit Log | Complete, filterable log of all administrative actions including login, status changes, and cancellations. |
| FR-15 | Corporate Inquiry Management | View, respond to, and manage corporate inquiries with quotation support (amount, notes, PDF). |

---

## 9. Non-Functional Requirements

| Category | Requirement | Specification |
|----------|-------------|---------------|
| **Performance** | Page Load Time | Initial page load under 2 seconds on 4G connections. |
| **Performance** | API Response Time | All REST API endpoints respond within 500ms under normal load. |
| **Performance** | Real-Time Latency | Socket.io event propagation under 100ms for connected clients. |
| **Security** | Authentication | JWT-based stateless authentication with token expiration. |
| **Security** | Password Storage | BCrypt hashing with salt rounds, no plaintext passwords stored. |
| **Security** | HTTP Headers | Helmet middleware enforcing security headers (CSP, X-Frame-Options, etc.). |
| **Security** | Rate Limiting | Global API rate limiting to prevent brute-force and DDoS attacks. |
| **Scalability** | Database | MongoDB Atlas with indexed queries for efficient data retrieval. |
| **Scalability** | Deployment | Stateless backend design enabling horizontal scaling. |
| **Usability** | Responsive Design | Fully responsive UI across mobile, tablet, and desktop viewports. |
| **Usability** | Loading States | Skeleton shimmer loading effects for improved perceived performance. |
| **Reliability** | Error Handling | Centralized error handler providing consistent JSON error responses. |
| **Reliability** | Graceful Shutdown | SIGINT handler for clean MongoDB connection closure. |
| **Maintainability** | Code Quality | TypeScript on frontend, structured MVC pattern on backend. |
| **Availability** | Health Check | Dedicated `/api/health` endpoint for uptime monitoring. |

---

## 10. Modules Description

### 10.1 Authentication Module

The Authentication module manages user identity throughout the platform. It handles user registration (signup), login, and session management using JSON Web Tokens (JWT).

- **Registration:** Validates email format, enforces 10-digit phone number pattern, hashes password using BCrypt, checks for duplicate email/phone, and stores the user in the `Users` collection.
- **Login:** Accepts email (identifier) and password, verifies credentials against stored hash, generates a JWT containing user ID and role, and returns the token to the client.
- **Token Management:** The JWT is stored in the browser's localStorage. Protected routes on both frontend (via `ProtectedRoute` component) and backend (via `auth` middleware) verify the token before granting access.
- **Role Assignment:** Users are assigned the `customer` role by default. Admin accounts are created via a dedicated `create_admin.js` script.

### 10.2 Booking Module

The Booking module is the core functionality of the platform, enabling customers to schedule AC services.

- **Booking Creation:** Captures service type, preferred date, time slot, customer name, phone number, and service area/address. Supports both authenticated and guest bookings.
- **Status Lifecycle:** Each booking progresses through defined states: `Pending` → `Confirmed` → `Completed` or `Cancelled`. Status transitions are restricted to admin users.
- **Real-Time Broadcasting:** Upon creation or status update, the booking data is emitted via Socket.io to all connected admin clients, ensuring the Command Center always reflects the latest state.
- **User Association:** If a logged-in user creates a booking, the booking is linked to their `userId`, enabling the "My Bookings" feature.

### 10.3 Admin Command Center Module

The Command Center is the operational hub for administrators, providing complete visibility and control over service operations.

- **Live Dashboard:** Displays all bookings in a real-time, sortable view with status indicators, customer details, and action buttons.
- **Status Management:** One-click status transitions with immediate Socket.io broadcast.
- **Skeleton Loading:** Premium shimmer-effect loading states provide a polished user experience during data fetching.
- **Protected Access:** The entire module is gated behind RBAC middleware, ensuring only admin-role users can access it.

### 10.4 Revenue Intelligence Module

This module transforms raw booking data into actionable business insights.

- **Financial Metrics:** Total revenue, average booking value, completed vs. cancelled ratios.
- **Service-Wise Breakdown:** Revenue and booking count analysis per service type (installation, repair, AMC, etc.).
- **Temporal Analysis:** Hourly distribution patterns showing peak demand hours, enabling optimized technician scheduling.
- **Customer Metrics:** Tracks new vs. returning customer ratios to measure customer retention.

### 10.5 Predictive Analytics Module

Extends the Revenue Intelligence module with forward-looking data analysis.

- **Demand Forecasting:** Analyzes historical booking patterns to predict future demand.
- **Trend Visualization:** Interactive charts showing booking trends over configurable time ranges.

### 10.6 Corporate Inquiry Module

A dedicated module for handling B2B client relationships.

- **Structured Inquiry Form:** Captures company name, contact person, phone, email, itemized requirements (service type + number of units), and additional notes.
- **Quotation Management:** Admins can attach quotation details including amount, notes, and PDF documents.
- **Status Tracking:** Inquiries progress through: `Pending` → `Quotation Sent` → `Contacted` → `Closed`.
- **Admin Notes:** Internal notes for team coordination on each inquiry.

### 10.7 Review and Rating Module

Enables post-service customer feedback collection.

- **Star Rating:** 1–5 star rating system linked to specific bookings.
- **Written Review:** Free-text comment field for detailed feedback.
- **One Review Per Booking:** Enforced at the database level via a unique constraint on `bookingId`.

### 10.8 Audit Log Module

Provides full administrative accountability and compliance.

- **Action Logging:** Records every administrative action including LOGIN, LOGOUT, BOOKING_STATUS_CHANGE, BOOKING_CANCEL, USER_CREATE, USER_DELETE, REPORT_GENERATE, and SETTINGS_UPDATE.
- **Metadata Capture:** Each log entry records admin ID, admin email, target type (Booking/User/Report/Settings/System), target ID, details, IP address, user agent, and timestamp.
- **Indexed Queries:** Compound indexes on `(adminId, timestamp)` and `(action, timestamp)` for efficient filtering and retrieval.
- **Viewer UI:** The `AuditLogViewer` frontend component provides a filterable, searchable interface for reviewing administrative activity.

### 10.9 SEO and Branding Module

- **Dynamic Meta Tags:** The `SEOHead` component dynamically sets page titles, meta descriptions, and Open Graph tags for each route.
- **Brand Consistency:** The `BrandLogo` component ensures consistent brand presentation across all pages.
- **Sticky Call Button:** A persistent call-to-action button (`StickyCallButton`) enables instant phone contact from any page.
- **Mobile Menu:** Responsive navigation via the `MobileMenu` component for small-screen devices.

---

## 11. Database Design

### 11.1 Overview

The application uses MongoDB, a NoSQL document-oriented database, accessed through Mongoose ODM. The database consists of six primary collections, each represented by a Mongoose schema with built-in validation.

### 11.2 Collection Schemas

#### Users Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `email` | String | Required, Unique, Lowercase, Email format validation |
| `phoneNumber` | String | Required, Unique, 10-digit pattern |
| `password` | String | Required (stored as BCrypt hash) |
| `role` | String | Enum: `customer`, `admin` (Default: `customer`) |
| `createdAt` | Date | Auto-generated (timestamps: true) |
| `updatedAt` | Date | Auto-generated (timestamps: true) |

#### Bookings Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `service` | String | Required, Trimmed |
| `date` | String | Required |
| `time` | String | Required |
| `name` | String | Required, 2–30 characters, Trimmed |
| `phone` | String | Required, 10-digit pattern |
| `area` | String | Required, 5–100 characters, Trimmed |
| `status` | String | Enum: `Pending`, `Confirmed`, `Completed`, `Cancelled` (Default: `Pending`) |
| `userId` | ObjectId | Reference to Users collection (optional for guest bookings) |
| `createdAt` | Date | Default: `Date.now` |

#### Inquiries Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `userId` | ObjectId | Reference to Users (optional) |
| `companyName` | String | Required, Max 100 characters |
| `contactPerson` | String | Required, Max 30 characters |
| `email` | String | Email format, Max 25 characters |
| `phone` | String | Required, 10-digit pattern |
| `requirements` | Array | Objects with `type` (String, required) and `units` (Number, min: 1) |
| `additionalNotes` | String | Max 500 characters |
| `quotation` | Object | `amount` (Number), `notes` (String), `pdfUrl` (String), `sentAt` (Date) |
| `adminNotes` | String | Internal notes |
| `status` | String | Enum: `Pending`, `Quotation Sent`, `Contacted`, `Closed` |
| `createdAt` | Date | Default: `Date.now` |

#### Reviews Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `bookingId` | ObjectId | Required, Unique (one review per booking) |
| `userId` | ObjectId | Required, Reference to Users |
| `userName` | String | Required |
| `rating` | Number | Required, Range: 1–5 |
| `comment` | String | Required |
| `createdAt` | Date | Default: `Date.now` |

#### Analytics Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `date` | Date | Required, Indexed |
| `totalBookings` | Number | Default: 0 |
| `completedBookings` | Number | Default: 0 |
| `canceledBookings` | Number | Default: 0 |
| `pendingBookings` | Number | Default: 0 |
| `revenue` | Number | Default: 0 |
| `avgResponseTime` | Number | In minutes, Default: 0 |
| `serviceBreakdown` | Array | Objects: `service`, `count`, `revenue` |
| `hourlyDistribution` | Array | Objects: `hour` (0–23), `bookingCount` |
| `customerMetrics` | Object | `newCustomers`, `returningCustomers` |

#### AuditLogs Collection

| Field | Type | Constraints |
|-------|------|-------------|
| `adminId` | ObjectId | Required, Indexed, Ref: Users |
| `adminEmail` | String | Required |
| `action` | String | Required, Enum: LOGIN, LOGOUT, BOOKING_STATUS_CHANGE, BOOKING_CANCEL, USER_CREATE, USER_DELETE, REPORT_GENERATE, SETTINGS_UPDATE, OTHER |
| `targetType` | String | Enum: Booking, User, Report, Settings, System |
| `targetId` | String | Identifier of affected resource |
| `details` | Mixed | Flexible JSON for action-specific metadata |
| `ipAddress` | String | Client IP for traceability |
| `userAgent` | String | Browser/client identification |
| `timestamp` | Date | Default: `Date.now`, Indexed |

### 11.3 Indexing Strategy

- **AuditLogs:** Compound indexes on `(adminId, timestamp)` and `(action, timestamp)` for efficient filtered queries.
- **Analytics:** Single-field index on `date` for fast date-range aggregations.
- **Users:** Unique indexes on `email` and `phoneNumber` for duplicate prevention and fast lookups.

### 11.4 Entity Relationships

```
Users ──────┐
  │         │
  │ 1:N     │ 1:N
  ▼         ▼
Bookings   Inquiries
  │
  │ 1:1
  ▼
Reviews

Users (admin) ──── 1:N ───→ AuditLogs
```

- A **User** can have many **Bookings** (one-to-many).
- A **Booking** can have exactly one **Review** (one-to-one).
- A **User** can submit multiple **Inquiries** (one-to-many).
- An **Admin User** generates multiple **AuditLog** entries (one-to-many).
- **Analytics** records are independent, date-based aggregation snapshots.

---

## 12. Workflow / System Flow

### 12.1 Customer Booking Flow

```
Customer visits website
        │
        ▼
Browses services & pricing
        │
        ▼
Clicks "Book Now" ──→ BookingWidget opens
        │
        ▼
Fills: Service, Date, Time, Name, Phone, Area
        │
        ▼
Submits form ──→ Client-side validation
        │
        ▼ (Valid)
POST /api/bookings ──→ Server-side validation
        │
        ▼ (Success)
Booking saved to MongoDB
        │
        ├──→ Socket.io emits "newBooking" to all admins
        │
        └──→ HTTP 201 response to customer
                │
                ▼
        Success toast notification displayed
```

### 12.2 Admin Operations Flow

```
Admin navigates to /admin/login
        │
        ▼
Enters email + password
        │
        ▼
POST /api/auth/login ──→ JWT returned
        │
        ▼
Token decoded: role === 'admin' verified
        │
        ▼
Redirected to /admin/dashboard (Command Center)
        │
        ├──→ GET /api/bookings (fetch all bookings)
        │
        ├──→ Socket.io connection established
        │         │
        │         ├── Listens for "newBooking"
        │         └── Listens for "bookingStatusUpdated"
        │
        ▼
Admin views live booking dashboard
        │
        ▼
Clicks status button on a booking
        │
        ▼
PATCH /api/bookings/:id/status
        │
        ▼
Status updated in MongoDB
        │
        ├──→ AuditLog entry created
        ├──→ Socket.io emits "bookingStatusUpdated"
        └──→ Customer sees updated status on "My Bookings"
```

### 12.3 Corporate Inquiry Flow

```
Corporate client visits website
        │
        ▼
Opens Corporate Inquiry Form
        │
        ▼
Fills: Company Name, Contact Person, Phone,
       Email, Requirements (Type + Units), Notes
        │
        ▼
POST /api/bookings/inquiry ──→ Validation
        │
        ▼
Inquiry saved with status "Pending"
        │
        ▼
Admin reviews in Command Center
        │
        ├──→ Prepares quotation (amount + notes + PDF)
        ├──→ Updates status to "Quotation Sent"
        └──→ Follows up → "Contacted" → "Closed"
```

---

## 13. Security Considerations

### 13.1 Authentication Security

- **JWT (JSON Web Tokens):** The application uses JWTs for stateless authentication. Upon successful login, a signed token is issued containing the user's ID and role. The token is verified by the `auth` middleware on every protected API request.
- **BCrypt Password Hashing:** All user passwords are hashed using the BCrypt algorithm with configurable salt rounds before storage. Plaintext passwords are never stored in the database.
- **Token Validation:** The `auth` middleware decodes and verifies the JWT on each request, rejecting expired or tampered tokens with a `401 Unauthorized` response.

### 13.2 Authorization Security

- **Role-Based Access Control (RBAC):** The `admin` middleware checks the authenticated user's role field. Only users with `role: 'admin'` can access administrative endpoints. Unauthorized access attempts receive a `403 Forbidden` response.
- **Protected Routes (Frontend):** The `ProtectedRoute` React component checks for a valid token and admin role before rendering administrative views, providing a client-side guard in addition to server-side enforcement.

### 13.3 HTTP Security Headers

- **Helmet Middleware:** Automatically sets critical HTTP security headers including:
  - `Content-Security-Policy` – Prevents XSS attacks
  - `X-Frame-Options` – Prevents clickjacking
  - `X-Content-Type-Options` – Prevents MIME-type sniffing
  - `Strict-Transport-Security` – Enforces HTTPS
  - `X-XSS-Protection` – Legacy XSS filter

### 13.4 Rate Limiting

- A global rate limiter middleware is applied to all API routes, restricting the number of requests per IP address within a configurable time window. This protects against brute-force login attempts, denial-of-service (DoS) attacks, and API abuse.

### 13.5 Input Validation

- **Server-Side:** The `validation` middleware provides comprehensive request body validation using custom rules for email format, phone number patterns (10-digit), string lengths, and required fields. Invalid inputs receive detailed error messages.
- **Client-Side:** React forms implement real-time validation feedback with visual error indicators before submission.
- **Mongoose Schema Validation:** The Mongoose schemas enforce data integrity at the database level with required fields, enum constraints, regex patterns, and min/max length validators.

### 13.6 CORS Configuration

- Explicit origin whitelisting for known frontend domains (localhost variations and Vercel deployments).
- Manual CORS middleware implementation for precise control over allowed origins, methods, and headers.
- Proper handling of preflight `OPTIONS` requests.

### 13.7 Audit Trail

- All administrative actions are logged to the `AuditLogs` collection with IP address and user agent information, providing a complete forensic trail for security investigations and compliance.

---

## 14. Testing Strategy

### 14.1 Manual Testing

| Area | Test Cases |
|------|------------|
| **Registration** | Valid signup, duplicate email rejection, duplicate phone rejection, invalid email format, short password. |
| **Login** | Valid credentials, wrong password, non-existent email, admin vs. customer role routing. |
| **Booking** | All fields valid, missing required fields, phone number format validation, past date handling, guest vs. authenticated booking. |
| **Admin Access** | Admin login, customer login rejection at admin portal, expired token handling, direct URL access without token. |
| **Status Updates** | Pending → Confirmed, Confirmed → Completed, Pending → Cancelled, real-time broadcast verification. |
| **Corporate Inquiry** | Valid submission, missing company name, invalid phone, requirements array validation. |
| **Reviews** | Valid review submission, duplicate review prevention, rating range validation. |

### 14.2 API Testing (Postman)

- All 5 route groups (`/api/auth`, `/api/bookings`, `/api/reviews`, `/api/analytics`, `/api/audit-logs`) tested individually using Postman collections.
- Authentication headers validated for protected endpoints.
- Error response format consistency verified across all endpoints.
- Rate limiting behavior verified under sustained request loads.

### 14.3 Browser Compatibility Testing

| Browser | Tested |
|---------|--------|
| Google Chrome (Latest) | ✅ |
| Microsoft Edge (Latest) | ✅ |
| Mozilla Firefox (Latest) | ✅ |
| Safari (Mobile) | ✅ |

### 14.4 Responsive Design Testing

- Mobile (320px – 480px): Layout, touch targets, booking form usability.
- Tablet (768px – 1024px): Navigation, dashboard readability.
- Desktop (1280px+): Full dashboard layout, analytics charts.

---

## 15. Advantages of the System

1. **24/7 Service Booking:** Customers can book services at any time, eliminating the constraint of business hours and reducing missed revenue opportunities.

2. **Real-Time Operational Visibility:** The Socket.io-powered Command Center gives administrators instant awareness of new bookings and status changes without page refreshes.

3. **Data-Driven Decision Making:** The Revenue Intelligence module transforms raw booking data into actionable insights for pricing strategy, technician allocation, and demand planning.

4. **Professional B2B Management:** The Corporate Inquiry module with structured forms and quotation management elevates the company's professional standing with commercial clients.

5. **Full Accountability:** The Audit Log module ensures that every administrative action is traceable, supporting internal compliance and customer dispute resolution.

6. **Production-Grade Security:** Multi-layered security with JWT, BCrypt, Helmet, RBAC, rate limiting, and input validation provides enterprise-level protection for a small business application.

7. **Scalable Architecture:** The MongoDB + Node.js stack, combined with stateless token-based authentication, allows the system to scale horizontally as the business grows.

8. **Modern User Experience:** Skeleton loading states, smooth animations (Framer Motion), responsive design, and accessible UI components (Shadcn UI) provide a premium, app-like experience.

9. **Reduced Operational Overhead:** Automating booking management eliminates manual register-keeping, reduces phone call volume, and frees administrative time for higher-value tasks.

10. **Guest-Friendly Design:** The optional (not mandatory) registration for booking ensures a low-friction experience for first-time customers.

---

## 16. Limitations

1. **No Online Payment Integration:** The current version does not support online payments. Transaction settlement occurs offline, which may cause delays or disputes.

2. **No Native Mobile Application:** The platform is a responsive Progressive Web Application (PWA-ready) but does not have dedicated native apps for iOS or Android, which may limit engagement for mobile-first users.

3. **No Technician Management:** The system does not manage individual technician profiles, assignments, or field tracking. Dispatch remains a manual process.

4. **No SMS/WhatsApp Notifications:** Booking confirmations and status updates are limited to in-app notifications. Customers must actively check the website for updates.

5. **WebSocket Limitations on Serverless:** Vercel's free tier does not support persistent WebSocket connections, meaning real-time features require a separate backend host (e.g., Render) in production.

6. **Single-Language Support:** The platform currently supports only English content, which may exclude a segment of the local customer base in Vadodara that prefers Gujarati or Hindi.

7. **No Offline Functionality:** The application requires an active internet connection for all operations. There is no progressive offline support for areas with poor connectivity.

8. **Manual Admin Creation:** Admin accounts must be created via a backend script (`create_admin.js`) rather than through a UI-based admin management panel.

---

## 17. Future Enhancements

### 17.1 Short-Term (Next 3 Months)

- **Payment Gateway Integration:** Integrate Razorpay or Stripe for online payment collection, enabling prepaid bookings and reducing no-show rates.
- **SMS/WhatsApp Notifications:** Integrate Twilio or Meta Business API for automated booking confirmation, reminder, and completion notifications.
- **Admin User Management UI:** Build an administrative interface for creating, editing, and deactivating admin accounts without backend scripts.

### 17.2 Medium-Term (3–6 Months)

- **Technician Mobile App:** Develop a lightweight mobile application (React Native) for field technicians to receive assignments, update job status, and capture completion photos.
- **GPS-Based Tracking:** Integrate real-time GPS tracking for assigned technicians, allowing customers to see estimated arrival times.
- **Inventory Management:** Track spare parts and consumables (filters, gas canisters) to optimize procurement and reduce service delays.
- **Multi-Language Support:** Add Gujarati and Hindi translations using i18n (internationalization) libraries.

### 17.3 Long-Term (6–12 Months)

- **AI-Powered Predictive Maintenance:** Use machine learning models trained on historical service data to predict when AC units are likely to require maintenance, enabling proactive outreach to customers.
- **Customer Loyalty Program:** Implement a points-based loyalty system rewarding repeat customers with discounts and priority scheduling.
- **Franchise Support:** Extend the platform to support multi-location operations with location-based routing and consolidated analytics.
- **IoT Integration:** Explore integration with smart AC units for remote diagnostics and automated service requests based on sensor data.

---

## 18. Conclusion

The **Roshni Enterprise – Cooling Comfort Connect** platform successfully addresses the core operational challenges faced by local AC service providers through a thoughtfully designed and well-implemented digital solution. By leveraging the MERN stack alongside real-time communication (Socket.io), robust security practices (JWT + BCrypt + Helmet + RBAC), and modern frontend technologies (React 18, TypeScript, Tailwind CSS, Shadcn UI), the system delivers a production-grade application that significantly improves both customer experience and administrative efficiency.

The platform transforms a traditionally phone-call-dependent, paper-based business into a data-driven, real-time, digitally managed operation. Customers benefit from 24/7 self-service booking and transparent status tracking, while administrators gain instant operational visibility, revenue intelligence, and full audit compliance.

With a clear roadmap for future enhancements—including payment integration, technician mobile apps, AI-powered predictive maintenance, and multi-language support—the platform is positioned not just as a project deliverable but as a living, evolving business asset for Roshni Enterprise.

The project demonstrates the practical application of full-stack web development, real-time systems design, database modeling, security engineering, and user experience design—skills that are essential and highly valued in the contemporary software industry.

---

## 19. References

1. MongoDB Documentation Team. *MongoDB Manual.* [https://www.mongodb.com/docs/manual/](https://www.mongodb.com/docs/manual/)

2. Express.js Contributors. *Express.js API Reference – Version 4.x.* [https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html)

3. Meta Platforms, Inc. *React Documentation – Version 18.* [https://react.dev/](https://react.dev/)

4. Socket.io Contributors. *Socket.io Documentation.* [https://socket.io/docs/v4/](https://socket.io/docs/v4/)

5. Auth0. *Introduction to JSON Web Tokens (JWT).* [https://jwt.io/introduction](https://jwt.io/introduction)

6. OWASP Foundation. *OWASP Top Ten Web Application Security Risks.* [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)

7. Tailwind Labs. *Tailwind CSS Documentation – Version 3.* [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

8. Shadcn. *shadcn/ui: Re-usable Components.* [https://ui.shadcn.com/](https://ui.shadcn.com/)

9. TanStack Contributors. *TanStack Query Documentation.* [https://tanstack.com/query/latest](https://tanstack.com/query/latest)

10. Mongoose Contributors. *Mongoose ODM v7.x Guide.* [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)

11. Helmetjs Contributors. *Helmet.js – Help Secure Express Apps.* [https://helmetjs.github.io/](https://helmetjs.github.io/)

12. Node.js Contributors. *Node.js Documentation – Version 18.x.* [https://nodejs.org/docs/latest-v18.x/api/](https://nodejs.org/docs/latest-v18.x/api/)

13. Vercel, Inc. *Vercel Documentation – Deployment.* [https://vercel.com/docs](https://vercel.com/docs)

14. GitHub, Inc. *GitHub Documentation.* [https://docs.github.com/en](https://docs.github.com/en)

---

**© 2026 Roshni Enterprise. All Rights Reserved.**

*This document was prepared as part of the academic submission for the Cooling Comfort Connect project.*
