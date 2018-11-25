const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tiny-improvements', {
    useNewUrlParser: true
});
const db = mongoose.connection;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './app/public')));
app.use(express.json());

require('./app/routes')(app);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});