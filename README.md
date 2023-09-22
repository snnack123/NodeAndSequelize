# Web App Server

Developed with Express 🚀🚀🚀

## Prerequisites

- Node.js v18
- MySQL Workbench
- Docker
- Visual Studio Code / other code editor

## Usage

- Install - `npm run install`
- Run Development - `npm run dev`
- Test lint - `npm run lint`

## Installation steps

### Step 1
 Create a docker image with this command (you can edit your docker image name and MySQL password):  <br>
  `docker run --name DB_NAME -p 3306:3306 -e MYSQL_ROOT_PASSWORD=DB_PASS -d mysql`

### Step 2
  Create a new local connection on your MySQL Workbench with port 3306 and the password is set one step back.

### Step 3
  Create a new database

### Step 4
  - Copy the repository on your local machine
  - Create a `.env` file based on `.env.example` and add your credentials (the developer will see a console log with the message `Connection to the database has been established successfully.` if the credentials are correct)
  - Install packages with `npm run install`
  - Start the project with `npm run dev` (the developer will see a console log with the message `App listening at http://localhost:PORT` if all is good)
  - Open the browser and type `http://localhost:PORT` for testing

## Packages
- Nodemon
- Express
- Sequelize
- JsonWebToken
- Bcrypt
- MySQL2
- Dotenv
- Cors
- Eslint
