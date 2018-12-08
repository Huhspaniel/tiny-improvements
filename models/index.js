const fs = require('fs');

let model;
const models = fs.readdirSync(__dirname)
    .reduce((models, file) => {
        if (file != 'index.js') {
            model = require(`./${file}`);
            models[model.modelName] = model;
        }
        return models;
    }, {});

module.exports = models;