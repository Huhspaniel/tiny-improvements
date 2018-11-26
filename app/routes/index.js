const fs = require('fs');

module.exports = function (app) {
    fs.readdirSync(__dirname)
        .forEach(routeFile => (
            routeFile != 'index.js' && require(`./${routeFile}`)(app)
        ));
};