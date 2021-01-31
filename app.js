const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 5000;

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/linkRoutes'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoDbUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`App is running on ${PORT} port...`);
        });
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
