# map-project

This is the frontend for my map project. Its built with React and TypeScript and lets you draw polygons and place objects on an interactive map. The data gets saved to a backend server that needs to be running separately.

## What this does

- Draw polygons on the map by clicking points
- Place markers and jeep icons on the map
- Save and delete everything to/from the database
- See a table of all placed objects with their coordinates
- The map centers on your location automatically when you open it

## Requirements

Before you run this you need to have these installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- The backend server running at `https://localhost:7115` — see the backend repo to set it up

## How to run after cloning

1. Clone the repo

   ```
   git clone https://github.com/DavidRakov/map-project-frontend.git
   ```

2. Go into the project folder

   ```
   cd map-project
   ```

3. Install dependencies

   ```
   npm install
   ```

4. Make sure the backend server is running (see backend repo)

5. Start the dev server

   ```
   npm run dev
   ```

6. Open the app in your browser at:
   ```
   http://localhost:5173
   ```

## Other commands

```bash
npm run build    # build for production
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Tech stack

- React 18 + TypeScript
- Vite
- Redux Toolkit — state management
- React-Leaflet — interactive map
- Material UI — UI components
- Axios — HTTP requests to the backend

## Notes

- The app talks to the backend at `https://localhost:7115` — if the server is not running you will see errors when trying to save or load data
- Your browser might warn about the self-signed certificate on the backend, just click "proceed anyway"
