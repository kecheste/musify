# 🎵 Musify Backend API

Node.js/Express backend with MongoDB for the Musify music management application.

## 🏗️ Architecture

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Container**: Docker support included

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Docker
- MongoDB (local or cloud)

### Installation

**Option 1: Docker (Recommended)**
```bash
cd backend
docker compose up --build
```

**Option 2: Local Development**
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
```bash
PORT=3000
MONGO_URL=mongodb://localhost:27017/musify-songs
```

## 📊 Database Schema

### Song Model
```typescript
interface ISong {
  _id: ObjectId;           // Auto-generated
  title: string;           // Required
  artist: string;          // Required  
  album: string;           // Required
  genre: string;           // Required, lowercase
  year?: number;           // Optional, 1880-2100
  durationSec?: number;    // Optional, duration in seconds
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-generated
}
```

### Indexes
- `{artist: 1, album: 1, title: 1}` - Unique constraint
- `{title: 'text', artist: 'text', album: 'text'}` - Text search
- Individual indexes on `artist`, `album`, `genre`

## 🛠️ API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Songs Endpoints

#### `GET /songs`
Get all songs with optional search.

**Query Parameters:**
- `search` (optional) - Text search across title, artist, album

**Response:**
```json
[
  {
    "_id": "64a1f8c5b2d3e4f5a6b7c8d9",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera", 
    "genre": "rock",
    "year": 1975,
    "durationSec": 355,
    "createdAt": "2023-07-03T10:30:00.000Z",
    "updatedAt": "2023-07-03T10:30:00.000Z"
  }
]
```

#### `GET /songs/:id`
Get a specific song by ID.

**Response:**
```json
{
  "_id": "64a1f8c5b2d3e4f5a6b7c8d9",
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "genre": "rock", 
  "year": 1975,
  "durationSec": 355,
  "createdAt": "2023-07-03T10:30:00.000Z",
  "updatedAt": "2023-07-03T10:30:00.000Z"
}
```

#### `POST /songs`
Create a new song.

**Request Body:**
```json
{
  "title": "New Song",        // Required
  "artist": "Artist Name",    // Required
  "album": "Album Name",      // Required  
  "genre": "pop",             // Required
  "year": 2023,               // Optional
  "durationSec": 180          // Optional
}
```

**Response:** `201 Created` with the created song object.

#### `PATCH /songs/:id`
Update an existing song.

**Request Body:** Same as POST (partial updates supported)

**Response:** `200 OK` with the updated song object.

#### `DELETE /songs/:id`
Delete a song by ID.

**Response:** `200 OK` with success message.

### Statistics Endpoint

#### `GET /stats`
Get comprehensive music collection statistics.

**Response:**
```json
{
  "totalSongs": 42,
  "totalArtists": 35,
  "totalAlbums": 38,
  "totalGenre": 12,
  "averageSongsPerArtist": 1.2,
  "averageSongsPerAlbum": 1.11,
  "averageAlbumsPerArtist": 1.09,
  "totalDuration": 8430,
  "averageDuration": 200.71,
  "oldestSong": 1824,
  "newestSong": 2020,
  "genreStats": [
    {
      "genre": "rock",
      "songCount": 5
    }
  ],
  "artistStats": [
    {
      "artist": "Queen",
      "songCount": 2,
      "albumCount": 2,
      "albums": ["A Night at the Opera", "News of the World"]
    }
  ],
  "albumStats": [
    {
      "album": "Thriller",
      "artist": "Michael Jackson", 
      "songCount": 2,
      "year": 1982,
      "genre": "pop"
    }
  ],
  "yearStats": [
    {
      "year": 1975,
      "songCount": 3
    }
  ]
}
```

### Health Check

#### `GET /health`
Simple health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-07-03T10:30:00.000Z"
}
```

## 🌱 Database Seeding

### Commands
```bash
npm run seed
```

### Sample Data
- **40+ songs** across 12 genres
- **Years range**: 1824-2020
- **Genres**: rock, pop, hip-hop, electronic, jazz, classical, r&b, country, reggae, blues, indie, latin
- **Rich metadata**: Complete with durations, years, and realistic data

## 🔧 Development Scripts

```bash
npm run dev          # Development with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Production server
npm run seed        # Seed database
```

## 📂 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── songsController.ts
│   │   └── statsController.ts
│   ├── models/         # Mongoose schemas
│   │   └── Song.ts
│   ├── routes/         # Express routes
│   │   ├── songsRoute.ts
│   │   └── statsRoute.ts
│   ├── db/            # Database connection
│   │   └── client.ts
│   ├── seeders/       # Database seeders
│   │   ├── index.ts
│   │   ├── songSeeder.ts
│   │   └── README.md
│   └── index.ts       # Entry point
├── docker-compose.yaml
├── Dockerfile
└── package.json
```

## 🐛 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include descriptive messages:
```json
{
  "error": "Song not found",
  "message": "No song found with the provided ID"
}
```

## 🔗 CORS & Security

- CORS enabled for frontend integration
- Helmet for security headers
- Morgan for request logging
- Input validation on all endpoints

## 📈 Monitoring

- Request logging via Morgan
- Health check endpoint
- Error logging to console
- MongoDB connection status logging
