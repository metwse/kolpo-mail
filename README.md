# kolpo-mail
Kolpo Mail is an educational mock mail system. It’s designed to simulate how an
email service works without actually delivering messages to the outside world.
Accounts, sessions, and simple message handling are all part of the system.
The project uses JWT for authentication and supports basic flows like
registration and login.

## Project Structure
The repository is organized into three main parts:
- `api/` \
  The backend service built with Node.js.
  - `db/` contains SQL scripts for initializing the database. `init.sql` sets
     up the user and database, while `scheme.sql` defines the schema.
- `www/` \
   The frontend built with Vite and React.
   - Provides the login/signup interface and a simple mailbox page where emails
     appear.
   - Styles are organized with SCSS modules.
- `nginx/` \
   The reverse proxy for serving the frontend and routing API calls to the
   backend.

`docker-compose.yaml` Orchestrates the full setup with four services: backend,
frontend, nginx, and PostgreSQL.

## Running the Project
You need Docker and Docker Compose installed.
1. Clone the repository and move into the project folder.
2. Run `docker compose up --build`.
3. Visit [http://localhost:1186](http://localhost:1186) in your browser.

The system will bring up:
- PostgreSQL 15 with the schema loaded
- Backend API running on Node.js
- Frontend served through Nginx on port 1186
