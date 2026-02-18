const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const { rateLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

const app = express();
app.use(helmet({
    crossOriginResourcePolicy: false, // Required for static uploads to work if on same domain
}));
app.use(morgan('dev'));
app.use(rateLimiter); // Apply global rate limiting
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


// Ultimate CORS Fix - Manual Middleware for absolute control
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://cooling-comfort-connect.vercel.app',
    'https://roshni-enterprise.vercel.app',
    'https://roshni-enterprise-urvashivankars-projects.vercel.app'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Check if origin is allowed
    const isAllowed = !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost');

    if (isAllowed && origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        // No origin usually means server-to-server or non-browser request
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');

    // Handle Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Simple Request Logger
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    next();
});

const io = new Server(server, {
    cors: {
        origin: true, // This reflects the origin
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true // Backward compatibility
});

// Store io in app to use in routes
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const analyticsRoutes = require('./routes/analytics');
const auditLogRoutes = require('./routes/auditLog');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/audit-logs', auditLogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Basic Route
app.get('/', (req, res) => {
    res.json({
        message: 'Roshni Enterprise API with Real-time support',
        version: '1.1.0',
        endpoints: {
            health: '/api/health',
            bookings: '/api/bookings',
            auth: '/api/auth'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database Connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI is not defined');

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err;
    }
};

// Initialize database connection
connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
    }
});

// Export the app for Vercel serverless (Vercel won't support WebSockets on free tier though)
module.exports = app;

// Start Server only if running directly
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Real-time server is running on port ${PORT}`);
    });
}
