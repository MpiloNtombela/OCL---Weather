# Weather Map Application

A React application that displays weather data for different locations on an interactive map using React Leaflet and OpenWeatherMap API.

## Features

- Interactive world map using React Leaflet
- Click anywhere on the map to view weather data
- Display temperature, weather description, humidity, and wind speed
- Search for cities and center the map
- Dark mode toggle
- Responsive design
- Error handling for API requests

## Prerequisites

- Node.js (v16 or higher)
- Yarn 4+ (using corepack) or Yarn 1.x
- OpenWeatherMap API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ocl-weather
```

2. If you have corepack enabled:
```bash
corepack enable
yarn install
```

If you don't have corepack or prefer using an older Yarn version:
- Either remove the `packageManager` field from `package.json`
- Or change the `packageManager` field to your preferred Yarn version (e.g., `"packageManager": "yarn@1.22.19"`)

Then run:
```bash
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Technologies Used

- React
- TypeScript
- React Leaflet
- Axios
- React Query
- Vite
- CSS Modules

## Project Structure

```
src/
  ├── components/
  │   ├── Map/
  │   ├── WeatherInfo/
  │   ├── SearchBar/
  │   ├── ThemeToggle/
  │   └── Navbar/
  ├── hooks/
  │   └── useWeather.ts
  ├── types/
  │   └── weather.ts
  ├── utils/
  │   └── api.ts
  ├── App.tsx
  ├── App.module.css
  ├── index.css
  ├── main.tsx
  └── vite-env.d.ts
```

## Styling Approach

I chose to use CSS Modules for this project becuase it provides a good balance between modularity and simplicity. The main advantages of this approach are:

- Local scoping of styles to prevent naming conflicts
- Better maintainability with component-specific styles
- No need for complex CSS-in-JS solutions
- Easy to understand and debug
- Great TypeScript support

While there are many modern CSS solutions out there (like Tailwind, Styled Components, or Emotion), CSS Modules felt like the most straightforward choice for me.

## API Integration

This project uses the OpenWeatherMap API to fetch weather data. The following endpoints are used:
- Current weather data: `https://api.openweathermap.org/data/2.5/weather`
- Geocoding API: `https://api.openweathermap.org/geo/1.0/direct`

## Assumptions

- Users have access to an OpenWeatherMap API key
- The application is used in modern browsers that support ES6+ features
- Users have a stable internet connection to fetch weather data

## Development Assumptions

Key assumptions made during development:

- OpenWeatherMap API stability and rate limits
- Primary interaction through mouse clicks and keyboard navigation
- Focus on current weather conditions rather than historical data
- 5-minute weather data refresh rate is sufficient
- Users will primarily search for major cities most of the time
- Geolocation API will only work on HTTPS browser security restrictions, hence the `current location` feature may not work in all environments:
  - Requires HTTPS connection
  - Requires user permission
  - May be blocked by browser settings
  - Fallback to manual city search is available

These influenced technical choices like React Query for caching, click-based interactions, and the responsive layout design.


Created with ❤️ By: Mpilo Ntombela
- GitHub: [@MpiloNtombela](https://github.com/MpiloNtombela)
- LinkedIn: [@mpilo-ntombela](https://linkedin.com/in/mpilo-ntombela)
- X: [@mpilohere](https://x.com/mpilohere)

# App Preview
![image](https://github.com/user-attachments/assets/85fe5449-268b-4ed9-b6c8-c9a34b44785e)

