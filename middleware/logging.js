// Middleware for logging requests
const logging = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
}

module.exports = logging