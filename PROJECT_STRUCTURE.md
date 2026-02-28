# Online Assignment Submission and Grading System

## Project Structure

```
fsadproject/
│
├── public/                     # Public assets
│
├── src/
│   │
│   ├── components/            # Reusable React components
│   │   ├── Navbar.js         # Navigation bar component
│   │   ├── AssignmentCard.js # Assignment card display component
│   │   ├── ProtectedRoute.js # Route protection wrapper
│   │   └── Loader.js         # Loading spinner component
│   │
│   ├── pages/                # Page components
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Registration page
│   │   ├── StudentDashboard.js     # Student main dashboard
│   │   ├── FacultyDashboard.js     # Faculty main dashboard
│   │   ├── UploadAssignment.js     # Faculty: Create new assignment
│   │   ├── SubmitAssignment.js     # Student: Submit assignment
│   │   └── ViewSubmissions.js      # Faculty: Grade submissions
│   │
│   ├── context/              # React Context providers
│   │   └── AuthContext.js    # Authentication context
│   │
│   ├── data/                 # Mock data and data helpers
│   │   └── mockData.js       # Mock database data
│   │
│   ├── utils/                # Utility functions
│   │   └── helpers.js        # Helper functions
│   │
│   ├── styles/               # CSS stylesheets
│   │   ├── Auth.css         # Authentication pages styles
│   │   ├── Dashboard.css    # Dashboard styles
│   │   ├── Common.css       # Common/shared styles
│   │   ├── Submission.css   # Assignment submission styles
│   │   ├── Faculty.css      # Faculty-specific styles
│   │   ├── Navbar.css       # Navbar styles
│   │   ├── AssignmentCard.css # Assignment card styles
│   │   └── Loader.css       # Loader styles
│   │
│   ├── App.js               # Main application component
│   ├── index.js             # Application entry point
│   └── index.css            # Global styles
│
├── index.html              # HTML template
├── package.json            # NPM dependencies
├── vite.config.ts          # Vite configuration
└── PROJECT_STRUCTURE.md    # This file
```

## Tech Stack

- **React 18.3.1** - UI library
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library
- **Vite** - Build tool
- **CSS3** - Styling

## Color Scheme

- **Primary Gradient**: `linear-gradient(135deg, #6D28D9, #8B5CF6, #EC4899)`
- **Background**: `#0F172A` (Dark navy)
- **Accent Cyan**: `#22D3EE`
- **Success Green**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Text Primary**: `#F8FAFC`
- **Text Secondary**: `#94A3B8`

## Design Features

- Glassmorphism effects with blur
- Smooth hover animations
- Gradient buttons with glow effects
- Rounded corners (12px-20px border-radius)
- Inter font family
- Responsive design

## Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Student Routes (Protected)
- `/student-dashboard` - Student dashboard
- `/submit-assignment` - Submit assignment (general)
- `/submit-assignment/:id` - Submit specific assignment

### Faculty Routes (Protected)
- `/faculty-dashboard` - Faculty dashboard
- `/upload-assignment` - Create new assignment
- `/view-submissions/:id` - Grade student submission

## Demo Credentials

### Student
- Email: `emily.johnson@university.edu`
- Password: `student123`

### Faculty
- Email: `sarah.williams@university.edu`
- Password: `faculty123`

## Key Components

### AuthContext
Provides authentication state and functions (login, logout, register) throughout the app.

### ProtectedRoute
HOC that protects routes based on authentication and role.

### AssignmentCard
Reusable component to display assignment information with status badges.

### Navbar
Top navigation bar with logo and logout functionality.

### Loader
Loading spinner component with customizable size.

## Features

### Student Features
- View all assignments with status
- Submit assignments via drag-and-drop
- View grades and feedback
- Track assignment statistics

### Faculty Features
- Create new assignments
- View all student submissions
- Grade assignments with marks and feedback
- Track submission statistics

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Notes

- This uses mock data stored in `src/data/mockData.js`
- In production, replace mock data with actual API calls
- Authentication uses localStorage for demo purposes
- File uploads are simulated (no actual file storage)
