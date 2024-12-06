# Racing Express App 🏎️

A Node.js/Express application for managing Formula 1 racing teams and their cars. This system provides a comprehensive database and management interface for tracking teams, vehicles, and racing statistics.

> This project was developed as a homework assignment for Server-side JavaScript course.

## Features

- **Team Management**
  - Store and track team information (name, founding year, headquarters)
  - Maintain detailed team statistics and historical data
  - Track total points and performance metrics
  - Full CRUD operations for team management

- **Vehicle Management**
  - Track cars associated with each team
  - Store technical specifications (chassis, power unit)
  - Manage car numbers and team associations
  - Full CRUD operations for vehicle management

- **User Interface**
  - Clean, intuitive web interface
  - Responsive design for all devices
  - Easy navigation between teams and cars
  - Quick access to detailed information

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Views**: EJS (Embedded JavaScript templates)
- **Testing**: Mocha
- **Data Seeding**: Custom seeding functionality

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/diatrcz/RacingExpressApp.git
cd RacingExpressApp
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB connection:
```bash
# Create a .env file in the root directory and add:
MONGODB_URI=your_mongodb_connection_string
```

4. Run the database seeding (if needed):
```bash
npm run seed
```

5. Start the application:
```bash
npm start
```

## Testing

Run the test suite using Mocha:
```bash
npm test
```

## Usage

### Managing Teams
- View all teams on the main dashboard
- Add new teams using the "Add" button
- Edit team details via the "Edit" button
- Delete teams using the "Delete" button
- Click on team names to view detailed information

### Managing Cars
- Navigate to the Cars section using the navigation bar
- Add new cars with the "Add" button
- Edit car specifications as needed
- Delete cars from the system
- View car-team associations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as a school project for Server-side JavaScript course
- Developed by Tarcza Lídia (QM5EA9)
