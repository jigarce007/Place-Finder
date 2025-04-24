# Place-Finder

Place Finder is a fully functional mobile application built with React Native (Expo + TypeScript), designed to demonstrate senior-level development skills. The app integrates Google Maps and Google Places API to provide an intuitive location search experience with real-time suggestions and a persistent search history.

🚀 Features

	•	🔍 Google Places Autocomplete
 Real-time place suggestions as you type, powered by the Google Places API.

 	•	🗺️ Interactive Map Integration
Displays selected location on a map with place name and address.
 
 	•	🕘 Search History Management
Automatically stores all searched places with local persistence using AsyncStorage.

	•	📜 History Selection
Tap any previously searched place to instantly view it on the map again.

	•	💾 Local Data Persistence
All history data is saved locally and retained across sessions.

	•	📱 Clean & Responsive UI
Built with modular components and industry best practices.

	•	✅ Testing & Code Quality
Includes unit tests, integration tests, and Jest code coverage reports.

 🛠️ Tech Stack
 
	•	React Native (Expo, TypeScript)
	•	Google Maps & Places API
	•	React Navigation
	•	AsyncStorage
	•	Axios
	•	Jest + React Native Testing Library

 📦 Project Structure

 /src
 
 ┣ /components     → Reusable UI elements
 
 ┣ /screens        → Main screens (Home, Map, History)
 
 ┣ /services       → API handling (Google Places)
 
 ┣ /hooks          → Custom hooks
 
 ┣ /utils          → Helpers (storage, formatting)
 
 ┣ /types          → TypeScript type definitions
 
 ┣ /tests          → Unit & integration test files
 
 ┗ App.tsx         → App entry point

 🧪 Testing & Coverage

npm test               # Run all test cases

npm test -- --coverage # View coverage report

🔧 Setup Instructions

1)git clone https://github.com/jigarce007/Place-Finder.git

2)cd google-places-search

3)npm install

4)Set up .env file with your Google Maps API key:

5)Start the project: npx expo start
