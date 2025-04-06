DigiWell - A Mental Health Application

======================================

About the Project

-----------------

DigiWell is a mental health application designed to help users track their mood, practice meditation, and receive AI-powered mental health support. The application consists of a **React.js frontend** and an **Express.js backend** that work together to provide a seamless experience.

Getting Started

---------------

### Prerequisites

Ensure you have the following installed on your system:

*   **Node.js** (Latest LTS version recommended)

*   **npm** or **yarn**

*   **MongoDB** (For local database or use MongoDB Atlas)

Installation and Running the Project

------------------------------------

### 1\. Clone the Repository

Clone the project repository from GitHub and navigate into the project directory:

 clone https://github.com/Rajukrsna/DigitalJamHackathon.git  
 
 cd handwriting-recognition  
 
 npm install
 `

### 2\. Start the Backend Server



Run the Express.js server:
npx nodemon server.js  `

By default, the backend runs on [**http://localhost:5000**](http://localhost:5000).

### 3\. Start the Frontend (React App)


Run the React development server:

npm start   `

The application will open in your browser at [**http://localhost:3000**](http://localhost:3000).

Available Scripts

-----------------

Deployment

----------

To deploy the application, you can use:

*   **Vercel / Netlify** for frontend deployment.

*   **Render / Heroku** for backend deployment.

Troubleshooting

---------------

If you encounter any issues, consider the following:

*   **Backend not connecting?** Ensure MongoDB is running and correctly configured in the .env file.

*   **CORS issues?** Check the cors middleware in backend/server.js.

*   **Frontend not loading data?** Verify the API base URL in src/config.js.

🚀 **Enjoy using DigiWell! Your mental health companion.**
