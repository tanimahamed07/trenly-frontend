# Treanly - E-Commerce Platform

A modern, full-featured e-commerce platform with a powerful frontend and robust backend API. Treanly provides a seamless shopping experience with product exploration, cart management, order processing, user reviews, and AI-powered features.

**This repository contains the Frontend application. For the Backend API, see the [Treanly Backend Repository](https://github.com/yourusername/trendly-backend).**

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

---

## 🏗️ Architecture Overview

Treanly is built as a **full-stack application** with:

- **Frontend**: Next.js 14+ SPA (Single Page Application)
- **Backend**: Express.js REST API with Node.js
- **Database**: MongoDB for data persistence
- **Authentication**: JWT-based auth with NextAuth.js on frontend
- **AI Integration**: Google Generative AI (Gemini) powered features

### System Flow

```
User Browser
    ↓
[Next.js Frontend]   (Port 3000)
    ↓
[Express.js Backend] (Port 5000)
    ↓
[MongoDB Database]
```

---

## ✨ Frontend Features

- **Product Catalog** - Browse and explore products with detailed information
- **Product Reviews** - Read and write reviews with star ratings
- **Shopping Cart** - Add/remove items with persistent cart management
- **Checkout** - Complete purchase flow with order processing
- **User Dashboard** - Manage orders, reviews, and profile information
- **Admin Panel** - Manage products, orders, and users
- **Authentication** - Secure login and registration with NextAuth.js
- **Responsive Design** - Fully responsive across all devices
- **AI Chat Support** - Built-in AI assistant for customer support

## ✨ Backend Features

- **User Authentication & Authorization** - JWT-based authentication with secure password hashing
- **Role-Based Access Control (RBAC)** - Three user roles: User, Manager, and Admin with granular permissions
- **Product/Items Management** - Full CRUD operations for products/items with inventory management
- **Order/Booking System** - Create and manage bookings/orders with status tracking
- **Review System** - Users can leave reviews on products with rating system
- **AI Integration** - Google Generative AI (Gemini) integration for intelligent features
- **Admin Dashboard** - Comprehensive dashboard for analytics and management
- **User Profile Management** - Users can manage their profile and view their orders/reviews
- **CORS Support** - Cross-origin resource sharing enabled for frontend integration

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 14+](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: CSS Modules & Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API

### Backend

- **Runtime**: [Node.js](https://nodejs.org/) (v18.17.0+)
- **Framework**: [Express.js 5.x](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Development Tools**: ts-node-dev, TypeScript Compiler

### DevOps & Deployment

- **Version Control**: Git & GitHub
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render
- **Database**: MongoDB Atlas (Cloud)

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── (dashboard)/         # Dashboard pages (user & admin)
│   ├── (public)/            # Public pages (home, about, products)
│   └── api/                 # API routes (NextAuth)
├── components/              # Reusable React components
│   ├── about/              # About page components
│   ├── auth/               # Login/Register forms
│   ├── contract/           # Service contract components
│   ├── dashboard/          # Dashboard components
│   ├── products/           # Product-related components
│   ├── shared/             # Shared UI components
│   └── ui/                 # General UI components
├── context/                # React Context providers
├── lib/                    # Utility functions and helpers
├── providers/              # App providers
├── services/               # API service layer
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.17.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or MongoDB Atlas cloud database)
- **Git**

### API Keys Required

- Google Generative AI (Gemini) API Key - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd treanly_frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Clone the backend repository**

   ```bash
   git clone https://github.com/yourusername/trendly-backend.git
   cd trendly-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=24h

   # Password Hashing
   BCRYPT_SALT_ROUNDS=12

   # AI Integration
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Build TypeScript**

   ```bash
   npm run build
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Backend server will start on [http://localhost:5000](http://localhost:5000)

---

## 🎯 Running the Application

### Development Mode (Both Services)

**Terminal 1 - Frontend:**

```bash
cd treanly_frontend
npm run dev
```

**Terminal 2 - Backend:**

```bash
cd trendly-backend
npm run dev
```

Then access the application at [http://localhost:3000](http://localhost:3000)

### Production Mode

**Frontend:**

```bash
npm run build
npm start
```

**Backend:**

```bash
npm run build
npm start
```

---

## 📋 Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript for production
- `npm start` - Start production server
- `npm run test` - Run test suite (if configured)

## 🔐 Authentication & Authorization

### Frontend Authentication

The frontend uses **NextAuth.js** for authentication. Configure your authentication provider (email, OAuth, etc.) in `src/lib/authOptions.ts`.

### Backend JWT Authentication

The backend uses **JWT (JSON Web Tokens)** for API authentication.

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server generates a JWT token with user information
3. Client sends token in `Authorization` header: `Bearer <token>`
4. Server validates token using `JWT_SECRET`
5. Token expires after configured duration (default: 24h)

### Role-Based Access Control (RBAC)

Three user roles with different permissions:

| Action              | User | Manager | Admin |
| ------------------- | ---- | ------- | ----- |
| View Profile        | ✅   | ✅      | ✅    |
| Edit Own Profile    | ✅   | ✅      | ✅    |
| View Products       | ✅   | ✅      | ✅    |
| Create Product      | ❌   | ✅      | ✅    |
| Edit/Delete Product | ❌   | ✅      | ✅    |
| Create Booking      | ✅   | ✅      | ✅    |
| View Own Bookings   | ✅   | ✅      | ✅    |
| Manage All Bookings | ❌   | ✅      | ✅    |
| Create Review       | ✅   | ✅      | ✅    |
| Delete Any Review   | ❌   | ✅      | ✅    |
| View All Users      | ❌   | ❌      | ✅    |
| Delete User         | ❌   | ❌      | ✅    |
| Change User Role    | ❌   | ❌      | ✅    |
| View Analytics      | ❌   | ❌      | ✅    |

---

## 🔌 API Documentation

### Overview

The backend API is built with Express.js and provides RESTful endpoints for all CRUD operations.

**API Base URL**: `http://localhost:5000/api`

### Authentication Routes (`/api/auth`)

| Method | Endpoint         | Description                | Auth Required |
| ------ | ---------------- | -------------------------- | ------------- |
| `POST` | `/register`      | Register new user          | No            |
| `POST` | `/login`         | Login user & get JWT token | No            |
| `POST` | `/refresh-token` | Refresh expired JWT token  | Yes           |

### User Routes (`/api/users`)

| Method   | Endpoint | Description                | Auth Required |
| -------- | -------- | -------------------------- | ------------- |
| `GET`    | `/`      | Get all users (Admin only) | Yes           |
| `GET`    | `/:id`   | Get user by ID             | Yes           |
| `PATCH`  | `/:id`   | Update user profile        | Yes           |
| `DELETE` | `/:id`   | Delete user (Admin only)   | Yes           |

### Product/Items Routes (`/api/items`)

| Method   | Endpoint | Description                    | Auth Required |
| -------- | -------- | ------------------------------ | ------------- |
| `GET`    | `/`      | Get all products               | No            |
| `GET`    | `/:id`   | Get product by ID              | No            |
| `POST`   | `/`      | Create product (Manager/Admin) | Yes           |
| `PATCH`  | `/:id`   | Update product (Manager/Admin) | Yes           |
| `DELETE` | `/:id`   | Delete product (Manager/Admin) | Yes           |

### Order/Booking Routes (`/api/bookings`)

| Method   | Endpoint       | Description                      | Auth Required |
| -------- | -------------- | -------------------------------- | ------------- |
| `GET`    | `/`            | Get all bookings (Manager/Admin) | Yes           |
| `GET`    | `/my-bookings` | Get user's bookings              | Yes           |
| `GET`    | `/:id`         | Get booking by ID                | Yes           |
| `POST`   | `/`            | Create new booking               | Yes           |
| `PATCH`  | `/:id`         | Update booking (Manager/Admin)   | Yes           |
| `DELETE` | `/:id`         | Delete booking (Manager/Admin)   | Yes           |

### Review Routes (`/api/reviews`)

| Method   | Endpoint | Description                        | Auth Required |
| -------- | -------- | ---------------------------------- | ------------- |
| `GET`    | `/`      | Get all reviews                    | No            |
| `GET`    | `/:id`   | Get review by ID                   | No            |
| `POST`   | `/`      | Create review (User/Manager/Admin) | Yes           |
| `DELETE` | `/:id`   | Delete review (Manager/Admin)      | Yes           |

### Admin Dashboard Routes (`/api/dashboard`)

| Method | Endpoint | Description                     | Auth Required |
| ------ | -------- | ------------------------------- | ------------- |
| `GET`  | `/`      | Get dashboard analytics (Admin) | Yes           |

### AI Routes (`/api/ai`)

| Method | Endpoint    | Description                      | Auth Required |
| ------ | ----------- | -------------------------------- | ------------- |
| `POST` | `/generate` | Generate AI content using Gemini | Yes           |

---

## 📁 Frontend Services

API services are centralized in `src/services/`:

- `auth.service.ts` - Authentication endpoints
- `product.services.ts` - Product data and management
- `order.service.ts` - Order processing and management
- `review.service.ts` - Product reviews
- `user.service.ts` - User profile management
- `dashboard.service.ts` - Dashboard data
- `ai.service.ts` - AI chat functionality

---

## 🗄️ Backend Database Models

### User Model

- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `role` - User role (user, manager, admin)
- `profile` - Additional profile information
- `createdAt`, `updatedAt` - Timestamps

### Product Model

- `title` - Product title
- `description` - Product description
- `price` - Product price
- `image` - Product image URL
- `category` - Product category
- `stock` - Available quantity
- `createdBy` - Manager/Admin who created it
- `createdAt`, `updatedAt` - Timestamps

### Order/Booking Model

- `user` - Reference to User
- `product` - Reference to Product
- `quantity` - Number of items
- `totalPrice` - Total cost
- `status` - Order status (pending, confirmed, cancelled)
- `bookingDate` - When booking was made
- `createdAt`, `updatedAt` - Timestamps

### Review Model

- `user` - Reference to User
- `product` - Reference to Product
- `rating` - Rating (1-5)
- `comment` - Review text
- `createdAt`, `updatedAt` - Timestamps

---

## 📁 Project Structure

### Frontend Structure

```
src/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── (dashboard)/         # Dashboard pages (user & admin)
│   ├── (public)/            # Public pages (home, about, products)
│   └── api/                 # API routes (NextAuth)
├── components/              # Reusable React components
│   ├── about/              # About page components
│   ├── auth/               # Login/Register forms
│   ├── contract/           # Service contract components
│   ├── dashboard/          # Dashboard components
│   ├── products/           # Product-related components
│   ├── shared/             # Shared UI components
│   └── ui/                 # General UI components
├── context/                # React Context providers
├── lib/                    # Utility functions and helpers
├── providers/              # App providers
├── services/               # API service layer
└── types/                  # TypeScript type definitions
```

### Backend Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── config/
│   └── index.ts           # Configuration & environment variables
├── controller/
│   ├── ai.controller.ts           # AI features controller
│   ├── booking.controller.ts       # Order/Booking management
│   ├── dashboard.controller.ts     # Admin dashboard
│   ├── product.controller.ts       # Product/Items management
│   ├── review.controller.ts        # Review management
│   └── user.controller.ts          # User management
├── middleware/
│   └── auth.middleware.ts          # JWT authentication middleware
├── model/
│   ├── order.model.ts              # Order/Booking schema
│   ├── product.model.ts            # Product schema
│   ├── review.model.ts             # Review schema
│   └── user.model.ts               # User schema
├── routes/
│   ├── ai.routes.ts                # AI routes
│   ├── auth.routes.ts              # Authentication routes
│   ├── booking.routes.ts           # Booking routes
│   ├── dashboard.routes.ts         # Dashboard routes
│   ├── product.routes.ts           # Product routes
│   ├── review.routes.ts            # Review routes
│   └── user.routes.ts              # User routes
└── types/
    ├── express.d.ts                # Express type definitions
    ├── order.interface.ts          # Order/Booking type definitions
    ├── product.interface.ts        # Product type definitions
    ├── review.interface.ts         # Review type definitions
    └── user.interface.ts           # User type definitions

dist/                     # Compiled JavaScript (generated)
```

---

## 🎯 Frontend Routes & Pages

### Public Routes

- `/` - Homepage
- `/about` - About page
- `/explore` - Product catalog
- `/explore/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/contract` - Service contract information

### Authenticated Routes (Dashboard)

- `/dashboard` - User dashboard
- `/dashboard/my-orders` - User's orders
- `/dashboard/my-reviews` - User's reviews
- `/dashboard/profile` - User profile
- `/dashboard/settings` - User settings

### Admin Routes

- `/dashboard/manage-products` - Product management
- `/dashboard/manage-products/add` - Add new product
- `/dashboard/manage-products/edit/[id]` - Edit product
- `/dashboard/manage-orders` - Order management
- `/dashboard/manage-users` - User management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

### Code Style & Best Practices

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and reusable
- Maintain consistent formatting

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is optimized for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_API_URL`
4. Vercel automatically builds and deploys on every push

### Backend Deployment (Render)

The backend is configured for Render deployment:

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `NODE_ENV`
   - `PORT`
4. Render automatically builds and deploys on push

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

For support, please:

- Open an issue on GitHub
- Contact the development team
- Check existing documentation and FAQs

---

## 📧 Contact

- **Email**: your-email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Project Issues**: [GitHub Issues](https://github.com/yourusername/treanly-frontend/issues)

---

## 🔗 Useful Resources

### Frontend Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Backend Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Google Generative AI](https://ai.google.dev/)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

### Deployment Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🎯 Project Status

- ✅ Frontend Development: Complete
- ✅ Backend Development: Complete
- ✅ Authentication System: Implemented
- ✅ Database Schema: Designed
- 🔄 Testing: In Progress
- 🔄 Deployment: In Progress

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Maintainers**: Development Team
