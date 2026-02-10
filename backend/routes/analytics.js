const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/analytics/revenue
// @desc    Get revenue metrics
// @access  Private (Admin only)
router.get('/revenue', auth, admin, async (req, res) => {
    try {
        const { period = 'month' } = req.query;

        let startDate = new Date();
        if (period === 'today') {
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate.setDate(startDate.getDate() - 30);
        }

        const analytics = await Analytics.find({
            date: { $gte: startDate }
        }).sort({ date: 1 });

        const totalRevenue = analytics.reduce((sum, day) => sum + day.revenue, 0);
        const totalBookings = analytics.reduce((sum, day) => sum + day.totalBookings, 0);
        const avgOrderValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

        res.json({
            period,
            totalRevenue,
            totalBookings,
            avgOrderValue,
            dailyData: analytics.map(a => ({
                date: a.date,
                revenue: a.revenue,
                bookings: a.totalBookings
            }))
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/analytics/trends
// @desc    Get historical trends
// @access  Private (Admin only)
router.get('/trends', auth, admin, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const analytics = await Analytics.find({
            date: { $gte: thirtyDaysAgo }
        }).sort({ date: 1 });

        res.json({
            trends: analytics.map(a => ({
                date: a.date,
                totalBookings: a.totalBookings,
                completedBookings: a.completedBookings,
                canceledBookings: a.canceledBookings,
                revenue: a.revenue
            }))
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/analytics/services
// @desc    Get service popularity
// @access  Private (Admin only)
router.get('/services', auth, admin, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const analytics = await Analytics.find({
            date: { $gte: thirtyDaysAgo }
        });

        // Aggregate service data
        const serviceMap = {};
        analytics.forEach(day => {
            day.serviceBreakdown.forEach(service => {
                if (!serviceMap[service.service]) {
                    serviceMap[service.service] = { count: 0, revenue: 0 };
                }
                serviceMap[service.service].count += service.count;
                serviceMap[service.service].revenue += service.revenue;
            });
        });

        const services = Object.keys(serviceMap).map(name => ({
            service: name,
            count: serviceMap[name].count,
            revenue: serviceMap[name].revenue
        })).sort((a, b) => b.count - a.count);

        res.json({ services });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard summary
// @access  Private (Admin only)
router.get('/dashboard', auth, admin, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisWeek = new Date();
        thisWeek.setDate(thisWeek.getDate() - 7);

        const thisMonth = new Date();
        thisMonth.setDate(thisMonth.getDate() - 30);

        // Get today's analytics
        const todayAnalytics = await Analytics.findOne({ date: today });

        // Get week analytics
        const weekAnalytics = await Analytics.find({ date: { $gte: thisWeek } });
        const weekRevenue = weekAnalytics.reduce((sum, day) => sum + day.revenue, 0);
        const weekBookings = weekAnalytics.reduce((sum, day) => sum + day.totalBookings, 0);

        // Get month analytics
        const monthAnalytics = await Analytics.find({ date: { $gte: thisMonth } });
        const monthRevenue = monthAnalytics.reduce((sum, day) => sum + day.revenue, 0);
        const monthBookings = monthAnalytics.reduce((sum, day) => sum + day.totalBookings, 0);

        // Get total bookings count
        const totalBookings = await Booking.countDocuments();

        res.json({
            today: {
                revenue: todayAnalytics?.revenue || 0,
                bookings: todayAnalytics?.totalBookings || 0
            },
            week: {
                revenue: weekRevenue,
                bookings: weekBookings
            },
            month: {
                revenue: monthRevenue,
                bookings: monthBookings
            },
            total: {
                bookings: totalBookings
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
