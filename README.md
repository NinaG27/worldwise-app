# Worldwise - City & Country Tracker App

This app is designed to help users track and manage the cities and countries they have visited. It features an interactive map where users can look at and click on locations to mark their visits. This project is based on The Ultimate React Course 2024: React, Redux & More offered by Udemy. The original code was provided by Jonas Schmedtmann.

The application includes several key pages and functionalities:

**Mock Authentication Login Page:** Allows users to log in and access the main app features.
**Home Page:** Provides an overview and navigation to different parts of the app.
**Info Page:** Displays information about the app and its features.
**Main App Page:** Accessible after login, where users can interact with the map and track their travels.

# Key Features

**Interactive Map**: Clickable map to mark visited cities, view countries and display User info. 


https://github.com/user-attachments/assets/c687748d-496b-427c-8e81-36eb7c811e60


**City selector**: Allows users to select a visited city and see details and their custom notes.  


https://github.com/user-attachments/assets/1959445c-8948-469a-bf04-cdbf53c1138a


**Country Selector**: Allows users to select countries and see details.


https://github.com/user-attachments/assets/a86be8cf-010b-4315-a6b0-ba955cead922




# Technologies and Concepts

During the development of this app, I gained hands-on experience with:

**Routing:** Including nested routes and route parameters.
**State Management:** Storing state in the URL and using context for proper state drilling.
**React Hooks:** Such as useRouter, useParam, useSearchParam, useNavigate, useMemo, and useCallback.
**Performance Optimization:** Implemented techniques to optimize rendering and performance.

# Additional Enhancements - unrelated to the course: 

I added some additional error handling when loading components.
Implemented a **country selector feature** that allows users to check more details about the visited countries and see them visually represented on the map.
I made small overall improvements to enhance user experience and app functionality.

# Setup Instructions

This project is built with Vite and requires a JSON server to be run before launching the app locally. To set up:

1. Clone the repository.
2. Install dependencies using npm install.
3. Start the JSON server by running json-server --watch db.json (ensure you have a db.json file or set one up for mock data).
Run the app using npm run dev in a separate terminal.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
