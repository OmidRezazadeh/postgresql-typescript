🛍️ express-shop
A robust backend API built with TypeScript,Express.js,and PostgreSQL,featuring authentication, role management, product handling,and payment processing.

🚀 Tech Stack

⚡ TypeScript
🖥️ Express.js
🐘 PostgreSQL
🔗 Sequelize ORM
🔑 Passport.js (Google OAuth2)
🔒 JWT Authentication
📖 Swagger API Documentation

✨ Key Features

🔐 Authentication
Google OAuth2 integration
JWT-based authentication
Session management
Role-based access control

👤 User Management
Profile management
Role assignments
Image upload & handling
Soft delete functionality

📦 Product Management
Full CRUD for products
Category management
Product image handling
Pagination & filtering

💳 Payment Integration
Transaction processing
Cart management
Payment gateway integration (Zibal)
Transaction status tracking

🖼️ File Management
Secure image upload support
File validation
Image processing with Sharp

📚 API Documentation
Interactive Swagger integration
Clear request/response schemas
Authentication flow documentation

src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── interfaces/     # TypeScript interfaces
├── middleware/     # Express middleware
├── migrations/     # Database migrations
├── models/         # Sequelize models
├── repositories/   # Data access layer
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
└── validations/    # Request validation schemas


🗄️ Database Schema

👥 Users
📝 Profiles
🎭 Roles
🛒 Products
🗂️ Categories
💰 Transactions
🖼️ Images
🛍️ Carts

⚡ Getting Started
1. Clone the repository
git clone https://github.com/yourusername/express-shop.git
cd express-shop

Install dependencies: npm install
Configure environment variables
Run migrations: npm run migrate
Run seeders: npm run seed
Start development server: npm start

📖 API Documentation
Once running, access the API docs here 👉 http://localhost:3000/docs

🏗️ Clean Architecture
This project follows clean architecture principles with clear separation of concerns:
Repositories → Data access
Services → Business logic
Controllers → Request handling

