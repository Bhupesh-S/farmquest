# Frontend - FarmQuest UI

This is the frontend application for FarmQuest, built with Next.js and React.

## Features

- 🎮 Interactive quest system with gamification
- 🌱 Crop-specific learning modules with colored pills
- 📱 Responsive design for all devices
- 🔐 Authentication system (farmer/admin)
- 📊 Progress tracking with XP and levels
- 🏆 Achievement and badge system

## Technology Stack

- **Framework**: Next.js 16.0.3
- **UI Library**: Custom components with Tailwind CSS
- **Icons**: Lucide React
- **Styling**: Tailwind CSS + CSS modules
- **State Management**: React hooks and local storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Main app component
├── components/
│   ├── auth/              # Authentication components
│   ├── admin/             # Admin dashboard components
│   ├── farmer/            # Farmer dashboard components
│   ├── quests/            # Quest-related components
│   ├── shared/            # Shared components
│   └── ui/                # Reusable UI components
├── constants/
│   ├── app.js             # App constants
│   └── quests.js          # Quest data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Additional styles
```

## Key Features Implementation

### Quest System
- Dynamic quest loading from constants
- Progress tracking
- XP and reward calculation
- Crop-specific labeling with colored pills

### Authentication Flow
- Phone-based login/signup
- OTP verification  
- User type selection (farmer/admin)
- Profile setup with farm details

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
# Add other environment variables as needed
```

## Deployment

This app is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Contributing

1. Follow the existing code structure
2. Use TypeScript for new components when possible
3. Ensure responsive design
4. Test on multiple devices
5. Update documentation for new features