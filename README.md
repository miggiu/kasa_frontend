# Kasa Frontend
Kasa Frontend is the front-end implementation of the Kasa platform.<br>Powered by React, it leverages component-based architecture to ensure modularity and reusability.<br>The application uses React Router for efficient client-side routing and was initialized with Vite, which provides a fast and optimized development and build process.<br>For styling, SASS (specifically SCSS) is used, enabling modular styles and better maintainability.<br>The backend of the application is initialized using Docker, which makes it easy to set up and ensures consistency across different environments.


![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---
## Table of Contents 
1. [Tech Stack](#tech-stack)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Acknowledgments](#acknowledgments)

## Tech Stack
- React: Component-based UI development.
- React Router: Client-side routing for dynamic and seamless navigation.
- Vite: Lightning-fast development and optimized build system.
- JavaScript: Core functionality and interactivity.
- SASS/SCSS: Modular and reusable styling with advanced CSS features.
- HTML: Semantic structure and accessibility.
- Docker: Backend containerization for consistent environment setup.

## Installation
Set up the project locally :
```bash
# Clone the repository
git clone https://github.com/miggiu/kasa_frontend.git

# Navigate to the project directory
cd kasa_frontend

# Install dependencies
npm install
```
## Usage
Run the project locally with the following command:

```bash
# Start the development server
npm start
# Open your browser and navigate to the specified localhost:XXXX to view the application.
```

### Running the Backend (Docker)
The backend is containerized using Docker. To set it up:

Ensure you have Docker installed on your system.
Retrieve the backend from:<br> https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_appli_location_immobiliere_React<br>Set up the backend in the same parent folder as the frontend
Open the backend in your preferred terminal 

### Build and run the Docker container
```bash
docker-compose up
```
The backend will now be running and accessible for the frontend to communicate with.

### Alternative backend building option
If you do not wish to use Docker, open the backend folder in your preferred terminal
```bash
# Install the dependencies 
npm install 
# Locally run the backend 
npm start
```

### Build for Production
To create an optimized build for production, run:

```bash
npm run build
```

---

### Usable Routes 
Here is a list of usable Routes:

```bash
# HomePage :
 `${yourUrl}/`

# AboutPage :
 `${yourUrl}/about`

# ApartmentPage :
 `${yourUrl}/apartment/${propertiesData.id}`

# We have an ErrorPage set-up with a redirection to the HomePage for any URL out of those specified above
```

---

## Acknowledgments
- Thanks to the creators of React, React Router, Vite and Docker.
- Special thanks to https://github.com/Ileriayo/markdown-badges for the badges used in this README.md file. 

