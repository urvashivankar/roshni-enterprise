const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
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
    origin: process.env.NODE_ENV === 'production'
        ? [
            'https://your-domain.vercel.app', // Replace with your actual Vercel domain
            /\.vercel\.app$/ // Allow all Vercel preview deployments
        ]
        : ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
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
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(process.env.MONGO_URI, options);
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

// Initialize database connection
connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
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
