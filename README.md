# Accredian-backend-task

# Task 2: Backend Development

## Overview
Developed RESTful APIs specifically for user authentication (login and sign-up) and connected them with a MySQL database.

## Requirements completed

### 1. REST APIs
a. Created RESTful endpoints for user login and sign-up.
b. Utilized Express.js for the backend server.

### 2. Database Connectivity
a. Established connectivity between the APIs and a MySQL database to store user information.
b. Implemented proper handling of user data, including password encryption.

### 3. Error Handling
a. Implemented error handling for various scenarios (e.g., invalid credentials, duplicate email during sign-up).

## Implementation Details
The backend APIs are implemented using Express.js, providing endpoints for user login and sign-up. Connect these APIs to a MySQL database to store and manage user information securely.

For database connectivity, utilized a MySQL database, and implemented proper mechanisms for handling user data, including encryption for sensitive information like passwords.

Implemented comprehensive error handling to manage various scenarios that may arise during user authentication, such as handling invalid credentials or preventing duplicate emails during the sign-up process.

## Usage
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies using the following commands:

```bash
npm install
nodemon server.js


##Trobleshoot - Issues with bcrypt Module

If you encounter any difficulties during the installation of the `bcrypt` module, you can follow these steps:

## 1. Remove bcrypt from package.json

Open your `package.json` file and remove the line related to bcrypt.

## 2. Install bcrypt Separately

Run the following command to install bcrypt with a specific version:

```bash
npm i bcrypt@5.1.0

Feel free to reach out if you encounter any issues or have questions related to the Accredian project!
