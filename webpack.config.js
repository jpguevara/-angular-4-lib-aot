var environment = (process.env.NODE_ENV || "dev").trim();

console.log('webpack ENV=', environment);
if (environment === "dev") {
    module.exports = require('./config/webpack.dev.js');
} else {
    module.exports = require('./config/webpack.prod.js');
}