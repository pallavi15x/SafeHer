<div align="center">

# 🛡️ SafeHer — Your Safety, Our Priority

<img src="public/favicon.svg" alt="SafeHer Logo" width="80" />

**A premium women's safety web application built with React, TypeScript & Tailwind CSS.**

Real-time protection, instant SOS alerts, AI-powered safety intelligence, and a supportive community — because every woman deserves to feel safe.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-SafeHer-ff1f6e?style=for-the-badge)](https://pallavi15x.github.io/SafeHer/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🆘 **SOS Alert** | One-tap emergency button to instantly notify all emergency contacts with live location |
| 📍 **Live Location Sharing** | Share your real-time GPS location with trusted contacts |
| 📞 **Fake Call** | Generate a realistic fake incoming call to escape uncomfortable situations |
| 🎙️ **Audio Recording** | Discreetly record audio as evidence in threatening situations |
| ⏱️ **Safety Timer** | Set a check-in timer — if you don't respond, alerts go out automatically |
| 👥 **Community Support** | Connect with a community of women for mutual support and safety tips |
| 🤖 **AI Chatbot** | Get instant safety tips, guidance, and emotional support |
| 🗺️ **AI Safety Map** | Real-time safety intelligence powered by AI — safe & alert zones across cities |
| 🌍 **Global Reach** | Active users across 100+ cities worldwide |
| 🌙 **Dark / Light Mode** | Beautiful theme toggle for comfortable viewing |
| 📱 **Fully Responsive** | Seamless experience across desktop, tablet, and mobile |
| ♿ **Accessible** | ARIA labels, keyboard navigation, reduced-motion support |

---

## 🖼️ Screenshots

### 🏠 Home Page — Hero Section
> Animated shield SVG, particle canvas, floating phone mockup, and stunning glassmorphism design

### 📊 Stats & Trust Section  
> Real-time counters, trust badges from security partners, user testimonials

### 🗺️ About — AI Safety Map
> Interactive India safety map with city-level safety intelligence + rotating world map

### 💬 AI Chatbot
> Floating chat assistant with typing indicators and safety guidance

---

## 🏗️ Project Structure

```
SafeHer/
├── public/                    # Static assets
│   ├── favicon.svg            # App icon (shield logo)
│   ├── hero-girl.png          # Hero section image
│   └── icons.svg              # SVG icon sprites
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Hero.tsx           # Hero section (animated shield, particles, phone mockup)
│   │   ├── Navbar.tsx         # Navigation bar with mobile menu
│   │   ├── Footer.tsx         # Footer with links & social icons
│   │   ├── AIChatbot.tsx      # Floating AI chatbot widget
│   │   ├── SOSButton.tsx      # Floating SOS emergency button
│   │   ├── FeaturesSection.tsx # Features grid cards
│   │   ├── HowItWorks.tsx     # Step-by-step guide
│   │   ├── StatsSection.tsx   # Animated statistics counters
│   │   ├── TrustBadges.tsx    # Partner trust badges
│   │   ├── Testimonials.tsx   # User testimonial carousel
│   │   ├── AboutSection.tsx   # About us content
│   │   ├── ContactSection.tsx # Contact form
│   │   ├── SafetyMap.tsx      # AI-powered safety map (India)
│   │   ├── AppShowcase.tsx    # App preview showcase
│   │   ├── FAQSection.tsx     # FAQ accordion
│   │   ├── Newsletter.tsx     # Newsletter signup
│   │   ├── ResourcesSection.tsx # Safety resources & guides
│   │   ├── SocialIcons.tsx    # Social media icons
│   │   └── CustomCursor.tsx   # Custom cursor effect
│   ├── pages/                 # Page-level components
│   │   ├── HomePage.tsx       # Home page (Hero + Stats + Testimonials)
│   │   ├── FeaturesPage.tsx   # Features listing page
│   │   ├── HowItWorksPage.tsx # How it works page
│   │   ├── AboutPage.tsx      # About us page (with safety map)
│   │   ├── ResourcesPage.tsx  # Resources & guides page
│   │   └── ContactPage.tsx    # Contact form page
│   ├── App.tsx                # Root app component (routing, layout, loading screen)
│   ├── main.tsx               # React entry point
│   ├── router.ts              # Hash-based SPA router
│   ├── hooks.ts               # Custom hooks (useInView, etc.)
│   ├── index.css              # Global styles, design tokens, animations
│   └── vite-env.d.ts          # Vite type declarations
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config (base)
├── tsconfig.app.json          # TypeScript config (app)
├── tsconfig.node.json         # TypeScript config (node)
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/pallavi15x/SafeHer.git
cd SafeHer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Build output is generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks & functional components |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling with custom design tokens |
| **Vite 5** | Lightning-fast dev server & bundler |
| **Lucide React** | Beautiful open-source icon library |
| **HTML Canvas** | Particle animations & visual effects |
| **CSS Animations** | Smooth micro-animations & transitions |

---

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| 🩷 Primary Pink | `#FF1F6E` | Buttons, accents, glows |
| 🌸 Rose | `#FF6B9D` | Secondary accents |
| 🖤 Dark BG | `#0D0008` | Primary background |
| 💜 Deep Purple | `#1E0016` | Secondary background |
| 🤍 White | `#FFFFFF` | Primary text |
| 🩵 Light Pink | `#FFD6E8` | Secondary text |

### Typography
- **Playfair Display** — Headings (elegant serif)
- **Poppins** — Body text (clean sans-serif)

### Animations
- Particle canvas with floating orbs & stars
- Shield draw-stroke SVG animation
- Smooth page transitions
- Scroll-reveal effects
- Glassmorphism cards with hover effects
- Floating phone mockup
- Pulse ring SOS button

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## 🌐 Deployment

This project is deployed using **GitHub Pages**. 

The production build is automatically served from the `gh-pages` branch.

🔗 **Live URL:** [https://pallavi15x.github.io/SafeHer/](https://pallavi15x.github.io/SafeHer/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Pallavi Kumari** — [@pallavi15x](https://github.com/pallavi15x)

> *"Writing code, breaking it, debugging it — becoming better with every fix"*

---

<div align="center">

Made with ❤️ for women's safety

**⭐ Star this repo if you found it helpful!**

</div>
