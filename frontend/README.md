# 🎵 Musify Frontend

React.js application with Redux Toolkit for state management and Emotion for styling.

## 🏗️ Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **State Management**: Redux Toolkit + Redux-Saga
- **Styling**: Emotion (styled-components approach)
- **UI**: Custom component library with modern design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:3000`

### Installation
```bash
cd frontend
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint checking
```

## 🧩 Component Architecture

### Component Structure
```
src/
├── components/              # Reusable UI components
│   ├── AppHeader.tsx       # Main navigation header
│   ├── AppSidebar.tsx      # Sidebar container
│   ├── StatsPanel.tsx      # Statistics display
│   ├── FiltersPanel.tsx    # Search and filtering
│   ├── SongList.tsx        # Song cards grid
│   ├── CreateModal.tsx     # Add new song modal
│   ├── EditModal.tsx       # Edit existing song modal
│   └── UI.tsx              # Shared styled components
├── store/                  # Redux state management
│   ├── index.ts            # Store configuration
│   ├── rootSaga.ts         # Root saga for side effects
│   ├── songSlice.ts        # Songs state slice
│   ├── statsSlice.ts       # Statistics state slice
│   └── actions/            # Action creators
├── api/                    # API communication
│   ├── songs.ts            # Songs API calls
│   └── stats.ts            # Statistics API calls
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── global.css             # Global styles
```

## 🎨 UI Components

### AppHeader
- **Purpose**: Main navigation and primary actions
- **Features**: Logo, Add Song button
- **Props**: `onAddSong: () => void`

### AppSidebar
- **Purpose**: Contains statistics and filtering panels
- **Features**: Responsive layout, mobile toggle
- **Children**: StatsPanel, FiltersPanel

### StatsPanel
- **Purpose**: Display comprehensive music statistics
- **Features**: 
  - Overview (totals)
  - Averages (calculated metrics)
  - Duration statistics
  - Year range
  - Top genres, artists, albums
- **Data Source**: Redux stats slice

### FiltersPanel
- **Purpose**: Search and filter songs
- **Features**:
  - Text search by title
  - Filter by artist dropdown
  - Filter by genre dropdown
  - Clear all filters
  - Results count display
- **Props**: 
  ```typescript
  interface FiltersPanelProps {
    songs: Song[];
    filteredSongs: Song[];
    filters: Filters;
    onFilterChange: (filterType: keyof Filters, value: string) => void;
    onClearFilters: () => void;
  }
  ```

### SongList
- **Purpose**: Display songs in a responsive grid
- **Features**:
  - Card-based layout
  - Hover animations
  - Edit/Delete actions
  - Empty state handling
  - Responsive design (grid → single column)
- **Props**:
  ```typescript
  interface SongListProps {
    songs: Song[];
    filteredSongs: Song[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddNew: () => void;
  }
  ```

### CreateModal
- **Purpose**: Add new songs to the collection
- **Features**:
  - Form validation (title + artist required)
  - Optional fields (year, duration)
  - Real-time duration preview (MM:SS)
  - Input constraints and validation
- **Form Fields**:
  ```typescript
  interface CreateForm {
    title: string;        // Required
    artist: string;       // Required
    album: string;        // Optional
    genre: string;        // Optional
    year: string;         // Optional, 1800-current year
    durationSec: string;  // Optional, 1-7200 seconds
  }
  ```

### EditModal
- **Purpose**: Modify existing songs
- **Features**:
  - Pre-filled form with current values
  - Change detection (only enable save if modified)
  - Same validation as CreateModal
  - Song info display
- **Props**: `song: Song | null, onClose: () => void`

## 🔄 State Management

### Redux Store Structure
```typescript
interface RootState {
  songs: SongsState;
  stats: StatsState;
}

interface SongsState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: string | null;
  operation: string | null;
}

interface StatsState {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
}
```

### Song Interface
```typescript
interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year?: number;
  durationSec?: number;
  createdAt?: Date;
}
```

### Redux Actions
```typescript
// Song Actions
fetchSongs()           // Get all songs
createSong(song)       // Add new song
updateSong(song)       // Update existing song
deleteSong(id)         // Delete song by ID

// Stats Actions
fetchStats()           // Get statistics
```

### Redux-Saga Side Effects
- **API calls**: All async operations handled via sagas
- **Error handling**: Comprehensive error catching and state updates
- **Loading states**: Automatic loading state management
- **Side effects**: Stats refresh after song modifications

## 🎨 Styling System

### Design Tokens
```typescript
// Colors
primary: "#6e45e2"              // Purple gradient start
secondary: "#88d3ce"            // Teal gradient end
background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
text: "#e0e0e0"                 // Light gray
textSecondary: "#b0b0b0"        // Medium gray
accent: "#88d3ce"               // Teal accents
error: "#ff6b6b"                // Red for errors

// Spacing
gap: "24px"                     // Standard component spacing
padding: "20px"                 // Standard padding
borderRadius: "12px"            // Standard border radius
```

### Responsive Breakpoints
```css
@media (max-width: 1024px)  /* Tablet */
@media (max-width: 768px)   /* Mobile landscape */
@media (max-width: 640px)   /* Mobile portrait */
@media (max-width: 480px)   /* Small mobile */
```

### Component Patterns

#### Cards
```typescript
const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;
```

#### Buttons
```typescript
const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(110, 69, 226, 0.4);
  }
`;
```

## 📱 Responsive Design

### Layout Behavior
- **Desktop (>1024px)**: Sidebar + content grid
- **Tablet (≤1024px)**: Stacked layout, horizontal scrolling panels
- **Mobile (≤640px)**: Single column, mobile-optimized panels

### Mobile Features
- **Panel toggle**: Hide/show sidebar on mobile
- **Touch-friendly**: Larger touch targets
- **Optimized spacing**: Reduced padding on small screens
- **Simplified layout**: Single column song grid

## 🔍 Search & Filtering

### Search Functionality
- **Text search**: Searches across title, artist, album
- **Real-time filtering**: Updates as user types
- **Case-insensitive**: Flexible search experience

### Filter Options
- **By Artist**: Dropdown with song counts
- **By Genre**: Dropdown with song counts  
- **Clear filters**: Reset all filters at once
- **Results counter**: Shows filtered vs total count

## 🎯 User Experience Features

### Loading States
- **Skeleton loading**: Smooth loading transitions
- **Operation-specific**: Different loading for different actions
- **Error boundaries**: Graceful error handling

### Form UX
- **Validation**: Real-time form validation
- **Auto-focus**: Focus management in modals
- **Helpful placeholders**: Clear input expectations
- **Duration helper**: Real-time MM:SS conversion
- **Change detection**: Only enable save when needed

### Animations
- **Hover effects**: Subtle card and button animations
- **Transitions**: Smooth state transitions
- **Transform effects**: translateY for depth
- **Backdrop blur**: Modern glass-morphism effects

## 🚀 Performance Optimizations

### React Optimizations
- **Component isolation**: Modular component architecture
- **Minimal re-renders**: Optimized state updates
- **Lazy loading**: Components loaded as needed

### Bundle Optimization
- **Vite HMR**: Fast development reloading
- **Tree shaking**: Unused code elimination
- **Code splitting**: Automatic bundle optimization

## 🧪 Development Guidelines

### Component Creation
1. Use TypeScript for all components
2. Define clear prop interfaces
3. Use Emotion styled-components
4. Include responsive design
5. Add hover/focus states

### State Management
1. Use Redux Toolkit for state
2. Handle loading/error states
3. Use sagas for side effects
4. Keep actions simple and pure

### Styling Best Practices
1. Use design tokens consistently
2. Follow mobile-first approach
3. Include hover/focus states
4. Use semantic color names
5. Maintain consistent spacing

## 🔧 Configuration

### Vite Config
- **TypeScript**: Full TypeScript support
- **Emotion**: Styled-components configuration
- **Dev server**: Proxy to backend API
- **Build**: Optimized production builds

## 📊 Integration with Backend

### API Communication
- **Base URL**: Configurable API endpoint
- **Error handling**: Comprehensive error responses
- **Loading states**: UI feedback during API calls
- **Auto-refresh**: Stats update after modifications

### Data Flow
1. **User action** → Redux action
2. **Redux action** → Saga
3. **Saga** → API call
4. **API response** → State update
5. **State update** → Component re-render