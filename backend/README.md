# Backend - FarmQuest API

This directory will contain the backend API for FarmQuest.

## Planned Features

- 🔐 User authentication and authorization
- 📊 Quest management system
- 🗄️ Database integration
- 📁 File upload for quest submissions
- 📈 Analytics and progress tracking
- 🔄 Real-time notifications

## Technology Stack (Planned)

- **Framework**: Node.js with Express.js
- **Database**: MongoDB or PostgreSQL
- **Authentication**: JWT tokens
- **File Storage**: AWS S3 or Cloudinary
- **Real-time**: Socket.io for notifications
- **Validation**: Joi or Zod
- **Documentation**: Swagger/OpenAPI

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/logout` - User logout

### Quests
- `GET /api/quests` - Get all quests
- `GET /api/quests/:id` - Get specific quest
- `POST /api/quests/:id/submit` - Submit quest proof
- `PUT /api/quests/:id/verify` - Admin quest verification

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/progress` - Get user progress

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/submissions` - Get quest submissions
- `PUT /api/admin/users/:id/status` - Update user status

## Database Schema (Planned)

### Users Collection
```json
{
  "_id": "ObjectId",
  "phone": "String",
  "name": "String",
  "userType": "farmer|admin", 
  "farmDetails": {
    "location": "String",
    "farmSize": "Number",
    "cropTypes": ["String"]
  },
  "xp": "Number",
  "level": "Number",
  "completedQuests": ["ObjectId"],
  "badges": ["String"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Quests Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "difficulty": "Beginner|Intermediate|Advanced",
  "xpReward": "Number",
  "activities": ["String"],
  "outcomes": ["String"],
  "cropTypes": ["String"],
  "category": "String",
  "isActive": "Boolean",
  "createdAt": "Date"
}
```

### Quest Submissions Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "questId": "ObjectId", 
  "submissionData": {
    "images": ["String"],
    "description": "String",
    "location": "String"
  },
  "status": "pending|approved|rejected",
  "reviewedBy": "ObjectId",
  "reviewNotes": "String",
  "submittedAt": "Date",
  "reviewedAt": "Date"
}
```

## Getting Started (When Implemented)

### Prerequisites
- Node.js 18+
- MongoDB or PostgreSQL
- npm or yarn

### Installation
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Environment Variables
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=mongodb://localhost:27017/farmquest
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Development Roadmap

### Phase 1 - Core API
- [ ] User authentication system
- [ ] Basic quest CRUD operations
- [ ] User profile management

### Phase 2 - Quest System
- [ ] Quest submission handling
- [ ] File upload integration
- [ ] Admin verification system

### Phase 3 - Advanced Features
- [ ] Real-time notifications
- [ ] Analytics dashboard
- [ ] Community features

### Phase 4 - Scalability
- [ ] Caching with Redis
- [ ] Database optimization
- [ ] Load balancing

## Contributing

When implementing the backend:
1. Follow RESTful API conventions
2. Use proper error handling
3. Implement comprehensive testing
4. Document all endpoints
5. Follow security best practices

## Security Considerations

- Input validation and sanitization
- Rate limiting for API endpoints
- Secure file upload handling
- JWT token management
- CORS configuration
- Environment variable security