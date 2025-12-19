# Dashboard Management System

A modern, responsive dashboard application built with Next.js 14+ that provides comprehensive management capabilities for products, users, orders, posts, todos, and comments. The application features real-time data visualization, server-side pagination, and a clean, intuitive user interface.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time statistics and charts displaying key metrics
- **Product Management**: Complete CRUD operations for product inventory
- **User Management**: User account management and profiles
- **Order Management**: Order tracking and transaction management
- **Content Management**: Posts, todos, and comments management
- **Authentication System**: Secure login/logout functionality

### Advanced Features
- **Server-side Pagination**: Efficient data loading with pagination support
- **Real-time Charts**: Interactive charts showing sales performance and trends
- **Responsive Design**: Mobile-first design that works on all devices
- **Dynamic Statistics**: Live-updating dashboard cards with API data
- **Drag & Drop Tables**: Reorderable table rows with smooth animations
- **Advanced Filtering**: Column filtering and search capabilities
- **Export Functionality**: Data export capabilities for reports

### Technical Features
- **Next.js 14+**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling
- **TanStack Query**: Powerful data fetching and caching
- **shadcn/ui**: Beautiful, accessible UI components
- **Server-side Rendering**: Optimized performance and SEO

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
│   │   ├── products/           # Product management
│   │   ├── users/              # User management
│   │   ├── orders/             # Order management
│   │   ├── posts/              # Posts management
│   │   ├── todos/              # Todos management
│   │   └── comments/           # Comments management
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── app-sidebar.tsx         # Navigation sidebar
│   ├── data-table.tsx          # Advanced data table
│   ├── section-cards.tsx       # Dashboard statistics
│   └── chart-area-interactive.tsx # Interactive charts
├── Hooks/                      # Custom React hooks
│   ├── useProducts.js          # Products data management
│   ├── useUsers.js             # Users data management
│   ├── useOrders.js            # Orders data management
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

The application integrates with [DummyJSON API](https://dummyjson.com/) for mock data:

- **Products API**: `/products` - Product inventory management
- **Users API**: `/users` - User account management
- **Orders API**: `/carts` - Shopping cart and order data
- **Posts API**: `/posts` - Content management
- **Todos API**: `/todos` - Task management
- **Comments API**: `/comments` - Comment system

### API Features Used:
- Server-side pagination with `limit` and `skip` parameters
- Real-time data fetching with caching
- Error handling and retry logic
- Automatic data refresh

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
- [DummyJSON](https://dummyjson.com/) - Mock API service
- [Tabler Icons](https://tabler.io/icons) - Icon library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.
