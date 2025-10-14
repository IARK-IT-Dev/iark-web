# IARK - Ikatan Alumni Rumah Kepemimpinan

Official website for IARK (Ikatan Alumni Rumah Kepemimpinan), a collaborative platform for alumni of Rumah Kepemimpinan to foster leadership, collaboration, and positive impact across Indonesia.

🌐 **Live Demo**: [https://ia-rk.com](https://ia-rk.com)

---

## 📋 Project Overview

**IARK** is a web platform designed to connect and empower alumni of Rumah Kepemimpinan (Leadership House), creating a vibrant community focused on:
- **Networking & Collaboration**: Connecting alumni across different batches and fields
- **Knowledge Sharing**: Sharing success stories and inspirational journeys
- **Event Management**: Organizing workshops, seminars, and community gatherings
- **Community Building**: Fostering long-term relationships and social impact initiatives

---

## 🎯 Project Status

**Current Stage**: Demo/MVP Phase

This is currently a **demonstration website** showcasing the core features and design direction. All data (alumni profiles, events, stories) are **mock data** for demonstration purposes.

### ✅ What's Implemented

#### Public Pages
- **Landing Page** (`/`)
  - Hero section with animated elements
  - About IARK section
  - Success stories carousel
  - Testimonials from alumni
  - Interactive donation section
  - Footer with social media links

- **Stories Page** (`/cerita`)
  - Featured story showcase
  - Category filtering (Karir, Pengabdian, Akademik, Kepemimpinan)
  - Story grid with search functionality
  - Individual story detail pages (`/cerita/[id]`)

#### Dashboard (Authentication Required)
- **Sign In/Sign Up** (`/masuk`, `/daftar`)
  - Mock authentication (any credentials work)
  - Email/password and Google sign-in UI

- **Alumni Directory** (`/dashboard/alumni`)
  - Searchable alumni database
  - Filter by batch (angkatan)
  - Custom dropdown components
  - Detailed alumni profiles (`/dashboard/alumni/[id]`)

- **Events Page** (`/dashboard/events`)
  - Hero section with search
  - Event listing with filters
  - Category and date filtering
  - Event detail pages (`/dashboard/events/[id]`)
  - Registration interface (UI only)

### 🚧 What's Not Yet Implemented

- **Backend Integration**: No database, API, or real authentication
- **Real User Management**: All authentication is mock/demo
- **Payment Processing**: Donation form is UI only
- **Event Registration**: Registration buttons are non-functional
- **Admin Dashboard**: No content management system
- **Email Notifications**: No email system integrated
- **Profile Editing**: Users cannot edit their profiles
- **Search Functionality**: Limited to frontend filtering

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Package Manager**: pnpm

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/iark-web.git
   cd iark-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
iark-web/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── cerita/                   # Stories section
│   │   ├── page.tsx             # Stories listing
│   │   └── [id]/page.tsx        # Story detail
│   ├── masuk/                    # Sign in
│   ├── daftar/                   # Sign up
│   └── dashboard/                # Protected dashboard
│       ├── alumni/              # Alumni directory
│       │   ├── page.tsx         # Alumni listing
│       │   └── [id]/page.tsx    # Alumni profile
│       └── events/              # Events management
│           ├── page.tsx         # Events listing
│           └── [id]/page.tsx    # Event detail
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   └── LogoCard.tsx         # Logo component
│   ├── features/                # Feature-specific components
│   │   ├── auth/               # Authentication forms
│   │   ├── cerita/             # Story components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── donation/           # Donation section
│   │   └── testimoni/          # Testimonial section
│   ├── providers/               # Context providers
│   │   ├── AuthContext.tsx     # Auth state management
│   │   └── TransitionContext.tsx # Page transitions
│   ├── guards/                  # Route guards
│   │   └── ProtectedRoute.tsx  # Auth protection
│   └── ui/                      # Reusable UI components
│       └── CustomDropdown.tsx   # Custom dropdown
│
├── public/                       # Static assets
│   └── logos/                   # IARK logos
│
└── styles/                       # Global styles
    └── globals.css              # Tailwind + custom CSS
```

---

## 🎨 Design System

### Color Palette
- **Primary Red** (`iark-red`): `#E21C24` - Main brand color
- **Blue** (`iark-blue`): `#1E40AF` - Secondary accent
- **Yellow** (`iark-yellow`): `#FBBF24` - Highlights

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono

### Animation Principles
- **Timing**: `easeOut` transitions (no spring bounce)
- **Duration**: 0.2-0.5s for most interactions
- **Hover Effects**: Subtle scale (1.02-1.05) and elevation changes

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### For Developers

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Use TypeScript for type safety
   - Keep components small and focused
   - Add comments for complex logic
4. **Test your changes**
   ```bash
   pnpm build
   ```
5. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add new feature"
   ```
6. **Push and create a Pull Request**

### Contribution Ideas

**High Priority:**
- Backend integration (Firebase, Supabase, or custom API)
- Real authentication system
- Database schema design
- Admin CMS for content management

**Medium Priority:**
- Payment gateway integration
- Email notification system
- Image upload and optimization
- SEO improvements

**Nice to Have:**
- Mobile app (React Native)
- Newsletter system
- Event calendar integration
- Analytics dashboard

### Code Guidelines

- **Components**: Use functional components with hooks
- **Styling**: Tailwind CSS classes, avoid inline styles
- **State**: Context API for global state, local state for component-specific
- **Types**: Always define TypeScript interfaces for props
- **Naming**: Use PascalCase for components, camelCase for functions
- **Files**: One component per file, co-locate related files

---

## 🧪 Testing the Demo

### Mock Authentication
- **Email**: Any email format works
- **Password**: Any non-empty password
- After login, you'll be redirected to `/dashboard/alumni`

### Exploring Features
1. **Browse Alumni** - Filter by name, field, or batch
2. **View Profiles** - Click any alumni card to see full profile
3. **Browse Events** - Use search and category filters
4. **View Event Details** - Click any event to see full information
5. **Read Stories** - Filter by category and read success stories

---

## 📝 Roadmap

### Phase 1: Foundation (Current)
- ✅ Design system and UI components
- ✅ Landing page and navigation
- ✅ Alumni directory with profiles
- ✅ Events listing and details
- ✅ Stories section

### Phase 2: Backend Integration
- [ ] Database setup (PostgreSQL/MongoDB)
- [ ] REST API or GraphQL
- [ ] Real authentication (NextAuth.js or Clerk)
- [ ] File upload (images, documents)
- [ ] Admin panel

### Phase 3: Enhanced Features
- [ ] Event registration and management
- [ ] Payment processing for donations
- [ ] Email notifications
- [ ] User profile editing
- [ ] Advanced search and filtering

### Phase 4: Community Features
- [ ] Discussion forums
- [ ] Job board
- [ ] Mentorship program matching
- [ ] Alumni networking tools
- [ ] Resource library

---

## 📄 License

This project is proprietary and confidential. All rights reserved by IARK (Ikatan Alumni Rumah Kepemimpinan).

---

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Website**: [https://ia-rk.com](https://ia-rk.com)
- **Email**: info@ia-rk.com
- **Instagram**: [@iark.official](https://instagram.com/iark.official)

---

## 🙏 Acknowledgments

Special thanks to:
- All IARK alumni for their inspiration and feedback
- Rumah Kepemimpinan for fostering leadership values
- Open source community for amazing tools and libraries

---

**Built with ❤️ by the IARK Development Team**
