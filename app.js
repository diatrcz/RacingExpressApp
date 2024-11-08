const db = require('./config/db');
const TeamModel = require('./models/team');

/*const createNewTeam = async () => {
  const newTeam = new TeamModel();
  newTeam.fullName = "vdsv";
  newTeam.base = "fdvdv";
  newTeam.teamChief = "avgea";
  newTeam.firstEntry = 2000;
  newTeam.championships = 0;
  newTeam.highestfinish = 3;
  newTeam.polePositions = 1;
  newTeam.fastestLaps = 19;

  try {
    await newTeam.save();
    console.log("Team saved successfully!");
  } catch (err) {
    console.error("Error saving team:", err);
  }
};

createNewTeam();
return;*/

const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.use(express.static('views'));

// Load routing
require('./route/index')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});