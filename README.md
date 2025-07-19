# Movie App

A modern React application for browsing and discovering movies using the TMDB (The Movie Database) API.

## 🎬 Features

- **Movie Discovery**: Browse through a curated collection of movies
- **Movie Details**: View comprehensive information about each movie including:
  - Movie poster
  - Title
  - Release year
  - Rating (with star icon)
  - Original language
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Real-time Data**: Fetches live movie data from TMDB API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd movieapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS (with modern flexbox/grid layouts)
- **API**: TMDB (The Movie Database)
- **Icons**: SVG icons for ratings and UI elements

## 📁 Project Structure

```
