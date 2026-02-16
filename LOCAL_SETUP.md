# Local Development Guide

This project consists of a **Spring Boot (Java)** backend and a **Next.js** frontend.

## Prerequisites
- **Java 17 or higher**
- **Maven**
- **Node.js 18 or higher**
- **PostgreSQL**

## Setup Instructions

### 1. Backend Configuration
1. Navigate to the `backend` directory.
2. Create a `.env` file based on `.env.example`:
   ```env
   JWT_SECRET=your_super_secret_jwt_key_here_at_least_32_chars
   # For local development, you can use a local Postgres instance or a cloud provider like Neon.
   # If using Neon, copy the connection string from your Neon dashboard and ensure sslmode=require.
   DATABASE_URL=jdbc:postgresql://your-neon-host:5432/neondb?sslmode=require
   PGUSER=your_neon_user
   PGPASSWORD=your_neon_password
   ```
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### 2. Frontend Configuration
1. Navigate to the `frontend` directory.
2. Create a `.env` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:5000` (or the default Next.js port).

## Project Structure
- `backend/`: Spring Boot application.
- `frontend/`: Next.js application.
- `.gitignore`: Configured to exclude all environment variables and build artifacts.
