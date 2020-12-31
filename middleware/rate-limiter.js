const redis = require('../lib/redis').getClient();



module.exports = ({limit, expiry}) => {
    // Defaults: Max 60 requests/minute
    limit = limit || 60;
    expiry = expiry || 60;
    return async (req, res, next) => {
        // Get the IP Address of client
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // Check if client has exceeded limit.
        const hits = await redis.hgetAsync(ipAddress, 'hits');
        if (hits < limit) {
            // Continue operation
            next();
            // Update in redis
            await redis.hincrbyAsync(ipAddress, 'hits', 1);
            await redis.expire(ipAddress, expiry);
        } else {
            res.send('Too many requests');
        }
    }
}
