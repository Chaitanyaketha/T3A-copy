// const responseTime = require("response-time");

// const responseTimeMiddleware = responseTime((req, res, time) => {
//     console.log(`[${req.method}] ${req.originalUrl} - ${time.toFixed(2)}ms`);
//     next();
// });

// module.exports = responseTimeMiddleware;

const responseTime = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Response time for ${req.originalUrl}: ${duration} ms`);
    });
    next();
};
module.exports = responseTime; //export it use anywhhere else 
