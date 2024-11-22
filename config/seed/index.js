const TeamModel = require('../../models/team');
const CarModel = require('../../models/car');
const { teams, createCarsForTeam } = require('./data');

async function seedDatabase() {
    try {
        // Check if database is empty
        const teamCount = await TeamModel.countDocuments();
        
        if (teamCount === 0) {
            // Create all teams
            const createdTeams = await TeamModel.create(teams);
            console.log('Teams created');

            // Create cars for each team
            const carsToCreate = createdTeams.flatMap((team, index) => 
                createCarsForTeam(team._id, index)
            );

            await CarModel.create(carsToCreate);
            console.log('Cars created');
            console.log('Database seeded successfully!');
        } else {
            console.log('Database already contains data, skipping seed');
        }
    } catch (err) {
        console.error('Error seeding database:', err);
        throw err; // Re-throw to handle in app.js
    }
}

module.exports = seedDatabase;