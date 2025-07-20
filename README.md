# Parts Bazar - Automotive Parts E-commerce Platform

![Parts Bazar Banner](https://awesomescreenshot.s3.amazonaws.com/image/6590449/55544273-cedd439b735fd693a0c0a761de060081.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250720%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T050058Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=d0e4b7a9f5fcb16af2a7446bd3b5b3c5ea90a038999d8d44803d681c7d94c3a3)

## Overview

Parts Bazar is a cutting-edge e-commerce platform specializing in automotive parts and accessories. Built with modern web technologies, our platform offers an intuitive shopping experience for car enthusiasts, mechanics, and automotive businesses.

```mermaid
graph TD
    A[Customer] -->|Browses| B(Product Catalog)
    B --> C[Shopping Cart]
    C --> D[Checkout]
    D --> E[Order Tracking]
    F[Admin] -->|Manages| G(Inventory)
    F -->|Processes| H(Orders)
    F -->|Analyzes| I(Reports)
```

## Features

### 🛒 Shopping Experience

- **Product Catalog** with categories and filters
- **Advanced Search** with auto-suggestions
- **Wishlists** and saved items
- **Real-time Inventory** management

### 📦 Order Management

- **Multi-step Checkout** process
- **Order Tracking** with real-time updates
- **Digital Receipts** and invoices
- **Return Management** system

### 🛠️ Admin Capabilities

- **Dashboard** with sales analytics
- **Inventory Management** system
- **Customer Relationship** tools
- **Content Management** for promotions

### 📱 Technical Highlights

- **Responsive Design** for all devices
- **Progressive Web App** capabilities
- **JWT Authentication** with refresh tokens
- **Server-side Rendering** for SEO

## Technology Stack

**Frontend:**

- Next.js 14 (App Router)
- React 18
- Redux Toolkit
- Tailwind CSS
- Shadcn UI Components
- Framer Motion

**Backend:**

- Node.js
- Express.js
- MySQL
- Redis (for caching)

**Services:**

- Payment Processing (Bkash)
- Email Service (SendGrid)
- Cloud Storage (AWS S3)
- CI/CD (GitHub Actions)

## Getting Started

### Prerequisites

- Node.js v18+
- SQL Account
- Redis server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nasif28/partsbazar.git
   cd partsbazar
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials in the `.env.local` file

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
partsbazar/
├── public/                     # Static assets (images, etc.)
├── src/                        # Source files
│   ├── app/                    # App directory (Next.js routing)
│   │   ├── (frontend)/         # Dynamic route group
│   │   ├── admin/              # Admin pages
│   │   ├── user/               # User-specific pages
│   │   ├── client-layout.js    # Client-side layout
│   │   ├── layout.jsx          # Root layout file
│   │   ├── metadata.js         # SEO metadata
│   │   └── not-found.jsx       # Custom 404 page
│   ├── assets/                 # Static or reusable media assets
│   ├── components/             # Reusable React components
│   │   ├── About/
│   │   ├── Auth/
│   │   ├── Blogs/
│   │   ├── Brands/
│   │   ├── Contact/
│   │   ├── FAQ/
│   │   ├── Footer/
│   │   ├── Global/
│   │   ├── Header/
│   │   ├── Home/
│   │   ├── Products/
│   │   ├── SVG/
│   │   ├── UI/
│   │   ├── User/
│   │   ├── Videos/
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── data/                   # Static or mock data files
│   ├── lib/                    # Utility functions & helpers
│   ├── providers/              # Context and providers (e.g., theme, auth)
│   ├── redux/                  # Redux store and slices
│   └── styles/                 # Global & modular styles (CSS/SCSS)
├── .env                        # Environment variables
├── .gitignore                  # Git ignored files
├── components.json             # Custom component definitions (optional)
├── eslint.config.mjs           # ESLint flat config
├── jsconfig.json               # JS path aliases and IntelliSense
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Lock file for package versions
└── postcss.config.mjs          # PostCSS config (usually for Tailwind CSS)
```

## Configuration

### Environment Variables

| Variable Name           | Description               | Example Value       |
| ----------------------- | ------------------------- | ------------------- |
| `MONGODB_URI`           | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET`            | Secret for JWT tokens     | `supersecretkey123` |
| `STRIPE_SECRET_KEY`     | Stripe API secret key     | `sk_test_...`       |
| `SENDGRID_API_KEY`      | SendGrid API key          | `SG.abc123...`      |
| `AWS_ACCESS_KEY_ID`     | AWS access key for S3     | `AKIA...`           |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key     | `abc123...`         |
| `REDIS_URL`             | Redis connection URL      | `redis://...`       |

## Deployment

Parts Bazar is optimized for deployment on Render:

### Deployment Steps:

1. Push your code to a GitHub repository
2. Create a new project in Vercel
3. Connect your GitHub repository
4. Add environment variables
5. Deploy!

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

**Project Maintainer:** [Parts Bazar]  
**Email:** [nasifzeehan1@gmail.com]  
**Website:** [https://nasifjihan.onrender.com](https://nasifjihan.onrender.com)

[![GitHub Issues](https://img.shields.io/github/issues/nasif28/partsbazar)](https://github.com/nasif28/partsbazar/issues)
[![GitHub Stars](https://img.shields.io/github/stars/nasif28/partsbazar)](https://github.com/nasif28/partsbazar/stargazers)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Roadmap

```mermaid
gantt
    title Development Roadmap
    dateFormat  YYYY-MM-DD
    section Core Features
    Authentication           :done,    des1, 2024-01-01, 30d
    Product Catalog          :done,    des2, 2024-02-01, 45d
    Shopping Cart            :active,  des3, 2024-03-15, 30d
    Checkout System          :         des4, 2024-04-15, 45d

    section Advanced Features
    Order Tracking           :         des5, 2024-06-01, 30d
    Admin Dashboard          :         des6, 2024-07-01, 60d
    Mobile App               :         des7, 2024-09-01, 90d
```

## Support

For support, please email support@partsbazar.com or join our [Discord server](https://discord.gg/partsbazar).
