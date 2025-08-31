# Musify

Musify is a simple **song CRUD (Create, Read, Update, Delete)** application built with a **React.js (Vite)** frontend and a **Node.js (Express)** backend.

---

## Technologies Used

### Frontend

- React.js (Vite)
- Redux-Saga
- Redux Toolkit
- Styled System

### Backend

- Node.js (Express)
- MongoDB
- Docker (for containerization)
- TypeScript

---

## ⚡ Installation

1. **Clone the repository**

   ```bash
   git clone https://kecheste/musify.git
   ```

2. **Install dependencies**

   The project contains two folders: `frontend` and `backend`.

   **Frontend:**

   ```bash
   cd frontend && npm install
   ```

   **Backend (choose one option):**

   - **Using Docker:**

     ```bash
     cd backend && docker compose up --build
     ```

   - **Running locally:**
     ```bash
     cd backend && npm install
     npm run build && npm run dev
     ```

3. **Seed the database (optional)**

   Populate your database with 40+ sample songs across 12 genres including rock, pop, hip-hop, jazz, classical, and more.

   - **Add sample data:**
     ```bash
     cd backend && npm run seed
     ```
   
   The seeder includes comprehensive metadata: titles, artists, albums, genres, release years (1824-2020), and durations. Perfect for testing the enhanced statistics dashboard!

4. **Run the app**  
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📚 Documentation

For detailed documentation, please refer to the specific components:

- **[Backend Documentation](./backend/README.md)** - API endpoints, database schema, and backend architecture
- **[Frontend Documentation](./frontend/README.md)** - Component structure, state management, and UI guidelines

---

✅ Musify should now be up and running!
