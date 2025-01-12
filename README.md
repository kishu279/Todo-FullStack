# Todo Web Application

A secure and user-friendly Todo web application where users can manage their tasks efficiently. This application includes features like user authentication and database storage for todos.

## Features
- **Secure Authentication**: Users can sign up and log in securely.
- **Todo Management**: Users can create, view, edit, and delete todos.
- **Persistent Storage**: Todos are stored in a database to ensure data persistence.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT)

## Installation
### Prerequisites
- Node.js installed on your machine.
- PostgreSQL database setup.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/kishu279/Todo-FullStack.git
   ```
2. Navigate to the project directory:
   ```bash
   cd todo-web-application
   ```
3. Install dependencies for both frontend and backend:
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```
4. Configure environment variables:
   - Create a `.env` file in the backend directory and add the following:
     ```env
     DATABASE_URL=<your-database-url>
     JWT_SECRET=<your-jwt-secret>
     ```
5. Start the application:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Folder Structure
```
todo-web-application/
├── frontend/            # Frontend code
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Application pages
│   │   ├── styles/          # Tailwind CSS configurations
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── package.json         # Frontend metadata and scripts
│   └── vite.config.js       # Vite configuration
├── backend/             # Backend code
│   ├── src/                  # Backend source files
│   ├── config/               # Configuration files
│   ├── package.json          # Backend metadata and scripts
│   └── server.js             # Backend server entry point
├── package.json         # Project metadata and scripts
└── README.md            # Project README
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ using React, Node.js, and PostgreSQL.

