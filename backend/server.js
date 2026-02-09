const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const analyticsRoutes = require('./routes/analytics');
const auditLogRoutes = require('./routes/auditLog');
const errorHandler = require('./middleware/errorHandler');

// Environment variable validation
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`FATAL ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:8080',
            'http://localhost:5173',
            'http://localhost:3000',
            'https://cooling-comfort-connect.vercel.app' // Add your production domain here
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        // or if original origin is in local allowed list
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
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
        message: 'Roshni Enterprise API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            bookings: '/api/bookings',
            auth: '/api/auth',
            reviews: '/api/reviews'
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
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI is not defined');

        await mongoose.connect(uri, options);
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
    console.log('⚠️  Server will continue without MongoDB. Admin fallback login is available.');
    // Don't exit - allow server to run with fallback admin login
});

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    isConnected = false;
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
    isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
    }
});

// Export the app for Vercel serverless
module.exports = app;

// Start Server only if running directly (not in Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
