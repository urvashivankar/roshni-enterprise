const { syncHistoricalAnalytics } = require('./utils/analyticsSync');

// Run this once to populate analytics for the last 30 days
syncHistoricalAnalytics(30)
    .then(() => {
        console.log('Historical analytics sync complete!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Sync failed:', err);
        process.exit(1);
    });
