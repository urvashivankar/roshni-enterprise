const Analytics = require('../models/Analytics');
const Booking = require('../models/Booking');

/**
 * Sync analytics data from bookings
 * This should be run daily via cron job or manually
 */
const syncAnalytics = async (date = new Date()) => {
    try {
        // Set to start of day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Get all bookings for this day
        const bookings = await Booking.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // Calculate metrics
        const totalBookings = bookings.length;
        const completedBookings = bookings.filter(b => b.status === 'completed').length;
        const canceledBookings = bookings.filter(b => b.status === 'canceled').length;
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;

        // Calculate revenue (assuming completed bookings have revenue)
        const revenue = bookings
            .filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + (b.estimatedCost || 0), 0);

        // Service breakdown
        const serviceMap = {};
        bookings.forEach(booking => {
            const service = booking.service || 'Unknown';
            if (!serviceMap[service]) {
                serviceMap[service] = { count: 0, revenue: 0 };
            }
            serviceMap[service].count++;
            if (booking.status === 'completed') {
                serviceMap[service].revenue += booking.estimatedCost || 0;
            }
        });

        const serviceBreakdown = Object.keys(serviceMap).map(service => ({
            service,
            count: serviceMap[service].count,
            revenue: serviceMap[service].revenue
        }));

        // Hourly distribution
        const hourlyMap = {};
        bookings.forEach(booking => {
            const hour = new Date(booking.createdAt).getHours();
            hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;
        });

        const hourlyDistribution = Object.keys(hourlyMap).map(hour => ({
            hour: parseInt(hour),
            bookingCount: hourlyMap[hour]
        }));

        // Update or create analytics record
        await Analytics.findOneAndUpdate(
            { date: startOfDay },
            {
                totalBookings,
                completedBookings,
                canceledBookings,
                pendingBookings,
                revenue,
                serviceBreakdown,
                hourlyDistribution
            },
            { upsert: true, new: true }
        );

        console.log(`Analytics synced for ${startOfDay.toDateString()}`);
        return true;
    } catch (err) {
        console.error('Analytics sync error:', err);
        return false;
    }
};

/**
 * Sync analytics for the last N days
 */
const syncHistoricalAnalytics = async (days = 30) => {
    try {
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            await syncAnalytics(date);
        }
        console.log(`Historical analytics synced for last ${days} days`);
    } catch (err) {
        console.error('Historical sync error:', err);
    }
};

module.exports = {
    syncAnalytics,
    syncHistoricalAnalytics
};
