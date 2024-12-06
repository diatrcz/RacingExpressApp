const TeamModel = require('../../models/team');
const CarModel = require('../../models/car');
const { teams, createCarsForTeam } = require('./data');

async function seedDatabase() {
    try {
        const teamCount = await TeamModel.countDocuments();
        
        if (teamCount === 0) {
            const createdTeams = await TeamModel.create(teams);
            console.log('Teams created');

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
        throw err;
    }
}

module.exports = seedDatabase;