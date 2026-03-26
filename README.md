# Treanly - E-Commerce Platform Frontend

A modern, full-featured e-commerce platform built with Next.js, TypeScript, and React. Treanly provides a seamless shopping experience with product exploration, cart management, order processing, and user reviews.

## ✨ Features

- **Product Catalog** - Browse and explore products with detailed information
- **Product Reviews** - Read and write reviews with star ratings
- **Shopping Cart** - Add/remove items with persistent cart management
- **Checkout** - Complete purchase flow with order processing
- **User Dashboard** - Manage orders, reviews, and profile information
- **Admin Panel** - Manage products, orders, and users
- **Authentication** - Secure login and registration with NextAuth.js
- **Responsive Design** - Fully responsive across all devices
- **AI Chat Support** - Built-in AI assistant for customer support

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: CSS Modules & Tailwind CSS
- **Context Management**: React Context API
- **HTTP Client**: Fetch API

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

- Node.js 18+
- npm or yarn package manager

### Installation

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
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## 🔐 Authentication

This project uses **NextAuth.js** for authentication. Configure your authentication provider (email, OAuth, etc.) in `src/lib/authOptions.ts`.

## 🔗 API Routes

- `/api/auth/[...nextauth]` - NextAuth authentication endpoints

## 📦 Services

API services are centralized in `src/services/`:

- `auth.service.ts` - Authentication endpoints
- `product.services.ts` - Product data and management
- `order.service.ts` - Order processing and management
- `review.service.ts` - Product reviews
- `user.service.ts` - User profile management
- `dashboard.service.ts` - Dashboard data
- `ai.service.ts` - AI chat functionality

## 🎯 Key Pages

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

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
