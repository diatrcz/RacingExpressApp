const express = require('express');
const path = require('path');
const app = express();

const db = require('./config/db');
const TeamModel = require('./models/team');

const CarModel = require('./models/car');
const seedDatabase = require('./config/seed');

// Add body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize object repository with models
const objRepo = {
    CarModel: CarModel,
    TeamModel: TeamModel
};

// Load routing by passing objRepo
require('./route/index')(app, objRepo);  // Pass objRepo as second argument

// Connect to database and start server
const port = process.env.PORT || 3000;

// Start server only after attempting to seed the database
db.connection.once('open', async () => {
    try {
        await seedDatabase();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
});

// Handle database connection errors
db.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});