# Dashboard Management System

A modern, responsive dashboard application built with Next.js 16+ that provides comprehensive e-commerce management capabilities. The application integrates with DummyJSON API for users and orders management, and RouteMisr API for products, categories, subcategories, and brands management, with real-time data visualization, advanced analytics, and an intuitive user interface.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time statistics and interactive charts
- **User Management**: Complete user profiles with detailed information
- **Product Management**: Complete product inventory with detailed views
- **Category Management**: Product categories and subcategories management
- **Brand Management**: Brand portfolio management
- **Order Management**: Order tracking and transaction management from DummyJSON
- **Analytics Dashboard**: Comprehensive data visualization and insights
- **Authentication System**: Secure login/logout functionality

### Advanced Features
- **Server-side Pagination**: Efficient data loading with pagination support
- **Advanced Analytics**: Multiple chart types (Pie, Bar, Line) for data insights
- **Dynamic Statistics**: Live-updating dashboard cards with real API data
- **Separate Table Components**: Custom tables for each data type
- **Detailed Views**: Individual detail pages for all entities
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: Live data fetching from RouteMisr API

### Technical Features
- **Next.js 16+**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling
- **TanStack Query**: Powerful data fetching and caching
- **shadcn/ui**: Beautiful, accessible UI components
- **Recharts**: Advanced charting library for data visualization
- **RouteMisr API**: Real e-commerce API integration

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amrr-Maherr/dashboard.git
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
dashboard/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Main dashboard pages
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── analytics/          # Analytics & charts
│   │   ├── brands/             # Brand management
│   │   ├── categories/         # Category management
│   │   ├── orders/             # Order management
│   │   │   ├── page.tsx        # Orders list
│   │   │   └── [id]/           # Order details
│   │   │       └── page.tsx    # Order detail view
│   │   ├── products/           # Product management
│   │   ├── subcategories/      # Subcategory management
│   │   └── users/              # User management
│   │       ├── page.tsx        # Users list
│   │       └── [id]/           # User details
│   │           └── page.tsx    # User detail view
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── app-sidebar.tsx         # Navigation sidebar
│   ├── data-table.tsx          # Base data table component
│   ├── section-cards.tsx       # Dashboard statistics
│   ├── chart-area-interactive.tsx # Interactive charts
│   ├── ProductTable.tsx        # Products table
│   ├── CategoryTable.tsx       # Categories table
│   ├── OrderTable.tsx          # Orders table
│   └── UserTable.tsx           # Users table
├── Hooks/                      # Custom React hooks
│   ├── useProducts.js          # Products data management
│   ├── useCategories.js        # Categories data management
│   ├── useSubcategories.js     # Subcategories data management
│   ├── useBrands.js            # Brands data management
│   ├── useOrders.js            # Orders data management
│   ├── useUsers.js             # Users data management
│   ├── useUser.js              # Single user data management
│   ├── useChartData.js         # Chart data management
│   └── use-mobile.ts           # Mobile detection
├── lib/                        # Utility functions
│   ├── api.js                  # API client configuration
│   ├── auth.js                 # Authentication utilities
│   └── utils.ts                # Helper functions
├── providers/                  # React context providers
│   ├── AuthProvider.js         # Authentication context
│   ├── ProtectedRoute.js       # Route protection
│   └── QueryProvider.js        # TanStack Query provider
└── public/                     # Static assets
```

## 🔧 API Integration

The application integrates with multiple APIs for comprehensive data management:

### DummyJSON API (https://dummyjson.com/)
- **Users API**: `/users` - Complete user profiles with personal information
- **Carts API**: `/carts` - Shopping cart data and order management

### RouteMisr E-commerce API (https://ecommerce.routemisr.com/api/v1/)
- **Products API**: `/products` - Complete product catalog with ratings and images
- **Categories API**: `/categories` - Product categories management
- **Subcategories API**: `/subcategories` - Detailed product classification
- **Brands API**: `/brands` - Brand portfolio management

### API Features Used:
- Server-side pagination with `page`, `limit`, `skip` parameters
- Real-time data fetching with caching
- Error handling and retry logic
- Automatic data refresh
- Detailed user profiles with images and specifications
- Comprehensive cart/order information

## 🎨 UI/UX Features

### Dashboard Components
- **Statistics Cards**: Dynamic cards showing live metrics
- **Interactive Charts**: Area charts with filtering options
- **Data Tables**: Advanced tables with sorting, filtering, and pagination
- **Responsive Sidebar**: Collapsible navigation with mobile support
- **Toast Notifications**: User feedback for actions

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Responsive design for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform supporting Next.js:

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test
npm run test:watch
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Maintain code coverage
- Test on multiple browsers
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TanStack Query](https://tanstack.com/query/) - Data fetching library
- [Recharts](https://recharts.org/) - Composable charting library
- [DummyJSON](https://dummyjson.com/) - Mock API for users and carts
- [RouteMisr](https://ecommerce.routemisr.com/) - E-commerce API
- [Tabler Icons](https://tabler.io/icons) - Icon library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.
