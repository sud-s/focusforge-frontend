# FocusForge Frontend

A modern productivity web application for habit tracking and task management with AI-powered coaching features.

## Features

### 🔐 Authentication
- User Login & Registration
- Protected routes with authentication
- Session management

### 📊 Dashboard
- Overview of habits and tasks
- AI-powered suggestions and insights
- Habit and task completion charts
- Recent activity feed
- Productivity statistics (streaks, completion rates)

### ✅ Habits Management
- Create, edit, and delete habits
- Track daily habit completion
- Log habits with date and time
- Mark habits as missed
- View habit streaks (current and longest)
- AI-powered habit predictions and analytics

### 📝 Tasks Management
- Create, edit, and delete tasks
- Task categorization by due date
- Mark tasks as complete
- Mark tasks as missed
- Task completion tracking

### 🤖 AI Coach
- Personalized coaching dashboard
- Tomorrow's predictions for each habit
- Failure risk analysis
- Weekly productivity scoring
- AI recommendations for improvement
- Coach interventions and tips

### ⚙️ Settings
- Profile management (name, username, email)
- Avatar upload
- Password change
- Theme toggle (Light/Dark mode)
- Notification preferences
- Sound settings

### 🎨 UI/UX Features
- Modern, clean minimal design
- Dark and Light theme support
- Responsive layout
- Smooth transitions and animations
- Custom card components
- Interactive charts and visualizations

## Tech Stack

- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API client functions
├── components/       # React components
│   ├── ai/          # AI Coach components
│   ├── auth/        # Authentication components
│   ├── common/      # Shared components
│   ├── dashboard/   # Dashboard components
│   ├── habits/      # Habits page components
│   ├── layout/      # Layout components
│   ├── modals/      # Modal components
│   ├── settings/    # Settings components
│   └── tasks/       # Tasks page components
├── routes/          # Route definitions
├── store/           # State management
├── styles/          # CSS stylesheets
└── utils/           # Utility functions
```

## API Integration

The frontend connects to a backend API (FastAPI) for:
- User authentication
- Habits CRUD operations
- Tasks CRUD operations
- AI predictions and insights

## License

MIT
