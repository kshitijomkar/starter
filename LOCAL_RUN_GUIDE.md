# 🚀 Local Development Setup Guide

## Prerequisites
Before you begin, ensure you have installed:
- **Java 17 or higher** - [Download](https://adoptium.net/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 15+** - [Download](https://www.postgresql.org/download/)

## Quick Start

### 1️⃣ Database Setup

**Option A: Using PostgreSQL locally**
```bash
# Start PostgreSQL service
# On macOS:
brew services start postgresql

# On Linux:
sudo service postgresql start

# On Windows:
# Start PostgreSQL from Services or pgAdmin

# Create database and user
psql -U postgres
CREATE DATABASE starterdb;
CREATE USER starteruser WITH PASSWORD 'starterpass';
GRANT ALL PRIVILEGES ON DATABASE starterdb TO starteruser;
\c starterdb
GRANT ALL ON SCHEMA public TO starteruser;
\q
```

**Option B: Using Docker**
```bash
docker run -d \
  --name postgres-dev \
  -e POSTGRES_USER=starteruser \
  -e POSTGRES_PASSWORD=starterpass \
  -e POSTGRES_DB=starterdb \
  -p 5432:5432 \
  postgres:15
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file
cat > .env << EOF
JWT_SECRET=super_secret_key_at_least_32_chars
DATABASE_URL=jdbc:postgresql://localhost:5432/starterdb
PGUSER=starteruser
PGPASSWORD=starterpass
EOF

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Or run the JAR directly
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8001**

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Create .env file
echo "NEXT_PUBLIC_API_URL=http://localhost:8001" > .env

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev

# For production build
npm run build
npm start
```

The frontend will start on **http://localhost:3000**

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── config/          # Security, JWT, Swagger config
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   └── exception/       # Exception handlers
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── pom.xml
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx         # Landing page
    │   │   ├── layout.tsx       # Root layout
    │   │   ├── globals.css      # Global styles
    │   │   ├── login/           # Login page
    │   │   ├── signup/          # Signup page
    │   │   └── dashboard/       # Protected dashboard
    │   └── components/          # Reusable components
    ├── package.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    └── .env
```

## 🔌 Available Endpoints

### Backend (http://localhost:8001)

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

**Protected:**
- `GET /api/health` - Health check (requires JWT)
- `GET /api/hello` - Test endpoint (requires JWT)

**Documentation:**
- Swagger UI: http://localhost:8001/api/swagger-ui.html
- API Docs: http://localhost:8001/api/v3/api-docs

### Frontend (http://localhost:3000)
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)

## 🧪 Testing the Application

### 1. Test Signup
```bash
curl -X POST http://localhost:8001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "message": "User registered successfully"
}
```

### 2. Test Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Test Protected Endpoint
```bash
TOKEN="your-jwt-token-here"

curl http://localhost:8001/api/health \
  -H "Authorization: Bearer $TOKEN"
```

## 🔧 Configuration

### Backend Configuration (application.properties)
```properties
# Server
server.port=8001
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/starterdb
spring.datasource.username=starteruser
spring.datasource.password=starterpass

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=${JWT_SECRET}
```

### Frontend Configuration (next.config.mjs)
```javascript
const nextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};
```

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find process on port 8001
lsof -i :8001
# Kill the process
kill -9 <PID>
```

**Database connection error:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Verify database exists
psql -U postgres -c "\l" | grep starterdb
```

**Maven build fails:**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests
mvn clean install -DskipTests
```

### Frontend Issues

**CSS not loading:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Port 3000 in use:**
```bash
# Run on different port
npm run dev -- -p 3001
```

**API calls failing:**
```bash
# Verify NEXT_PUBLIC_API_URL in .env
cat .env

# Check backend is running
curl http://localhost:8001/api/swagger-ui.html
```

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package -DskipTests

# Run the JAR
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🔐 Environment Variables

### Backend (.env)
```env
JWT_SECRET=your_super_secret_jwt_key_here_at_least_32_characters_long
DATABASE_URL=jdbc:postgresql://localhost:5432/starterdb
PGUSER=starteruser
PGPASSWORD=starterpass
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## 🚀 Deployment

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

### Manual Deployment
1. Build backend: `mvn clean package -DskipTests`
2. Build frontend: `npm run build`
3. Deploy JAR to server
4. Deploy Next.js build to hosting (Vercel, etc.)
5. Configure environment variables on hosting platform

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Need Help?

- Check backend logs: Look for errors in console
- Check frontend logs: Open browser console (F12)
- Verify database: Use pgAdmin or psql
- Test API: Use Swagger UI at http://localhost:8001/api/swagger-ui.html

## ✅ Verification Checklist

- [ ] PostgreSQL is running and database created
- [ ] Backend starts without errors
- [ ] Can access Swagger UI
- [ ] Frontend starts and loads correctly
- [ ] Can signup a new user
- [ ] Can login with created user
- [ ] CSS and styling loads properly
- [ ] Navigation between pages works
