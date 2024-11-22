const teams = [
    {
        fullName: "Mercedes-AMG Petronas Formula One Team",
        base: "Brackley, United Kingdom",
        teamChief: "Toto Wolff",
        firstEntry: 1970,
        championships: 8,
        highestfinish: "1st",
        polePositions: 128,
        fastestLaps: 89
    },
    {
        fullName: "Red Bull Racing",
        base: "Milton Keynes, United Kingdom",
        teamChief: "Christian Horner",
        firstEntry: 2005,
        championships: 5,
        highestfinish: "1st",
        polePositions: 92,
        fastestLaps: 95
    },
    {
        fullName: "Scuderia Ferrari",
        base: "Maranello, Italy",
        teamChief: "Frédéric Vasseur",
        firstEntry: 1950,
        championships: 16,
        highestfinish: "1st",
        polePositions: 242,
        fastestLaps: 254
    },
    {
        fullName: "McLaren Racing",
        base: "Woking, United Kingdom",
        teamChief: "Andrea Stella",
        firstEntry: 1966,
        championships: 8,
        highestfinish: "1st",
        polePositions: 156,
        fastestLaps: 163
    }
];

const createCarsForTeam = (teamId, teamIndex) => {
    const carsData = [
        [44, 63],  // Mercedes car numbers
        [1, 11],   // Red Bull car numbers
        [16, 55],  // Ferrari car numbers
        [4, 81]    // McLaren car numbers
    ];

    const chassisNames = ["W15", "RB20", "SF-24", "MCL38"];
    const powerUnits = ["Mercedes", "Honda RBPT", "Ferrari", "Mercedes"];

    return carsData[teamIndex].map(number => ({
        numberOf: number,
        chassis: chassisNames[teamIndex],
        powerUnit: powerUnits[teamIndex],
        _team: teamId
    }));
};

module.exports = {
    teams,
    createCarsForTeam
};