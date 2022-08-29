const mongoose = require('mongoose');
const express = require('express');

const cors = require('./src/middlewares/cors');
const furnitureController = require('./src/controllers/furnitureController');
const usersController = require('./src/controllers/usersController');
const auth = require('./src/middlewares/auth');

async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/furniture');
        console.log('DB ready');
    } catch (err) {
        console.error('Error connecting the database');
        return process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(auth());

    app.use('/data/catalog', furnitureController);
    app.use('/users', usersController)
    
    app.listen(3030, () => {console.log('REST Service started on port 3030')});
}

start();