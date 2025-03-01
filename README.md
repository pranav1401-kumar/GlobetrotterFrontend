# 🌍 Globetrotter Challenge

The Ultimate Travel Guessing Game where users get cryptic clues about famous destinations and must guess which places they refer to. Once they guess, they'll unlock fun facts, trivia, and surprises about the destination!

## Features

- 🎮 **Engaging gameplay**: Test your knowledge of global destinations with cryptic clues.
- 🎯 **Multiple choice answers**: Choose from four possible destinations.
- 🎉 **Immediate feedback**: Get instant feedback with animations and interesting facts.
- 📊 **Score tracking**: Keep track of your correct and incorrect answers.
- 🤝 **Challenge friends**: Invite friends to beat your score via WhatsApp.
- 🌐 **Expandable dataset**: Backend serves a growing dataset of 100+ destinations.

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Styled Components for styling
- Framer Motion for animations
- Canvas Confetti for celebration effects

### Backend
- Node.js
- Express.js
- RESTful API architecture
- In-memory data storage with file persistence

## Installation & Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd globetrotter
   ```

2. Install dependencies for both client and server:
   ```
   npm run install-all
   ```

3. Start the development server (both frontend and backend):
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Game Flow

1. Enter a username to create your profile
2. View destination clues and select your answer from multiple choices
3. Get immediate feedback and learn interesting facts
4. Challenge friends to beat your score by sharing a unique link

## Project Structure

```
globetrotter/
├── client/                 # Frontend React app
│   ├── public/             # Static files
│   └── src/                # React components and logic
│       ├── components/     # UI components
│       ├── services/       # API service functions
│       └── styles/         # CSS styles
│
├── server/                 # Backend Node.js/Express app
│   ├── controllers/        # Route controllers
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── data/               # JSON data files
│   └── utils/              # Utility functions
```

## API Endpoints

### Destinations
- `GET /api/destinations/random` - Get a random destination with clues
- `GET /api/destinations/:id` - Get a specific destination by ID
- `GET /api/destinations/options/:id` - Get multiple destinations for answer options

### Users
- `POST /api/users/register` - Register a new user
- `GET /api/users/:id` - Get user details by ID
- `PUT /api/users/:id/score` - Update user score

## Extensibility

The application is designed to be easily extended:
- Add more destinations to the dataset
- Implement user authentication
- Add leaderboards
- Include more detailed destination information
- Support for images and media

## License

This project is licensed under the MIT License.