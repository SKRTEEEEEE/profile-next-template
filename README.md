# 🚀 Profile Next - Modern Portfolio Website
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![Test Coverage](https://img.shields.io/badge/TEST-Coverage-green?style=social) [![Coverage: Statements](https://img.shields.io/badge/Statements-86.2%25-brightgreen?style=flat-square)](https://github.com/SKRTEEEEEE/admin-next) [![Coverage: Branches](https://img.shields.io/badge/Branches-50%25-red?style=flat-square)](https://github.com/SKRTEEEEEE/admin-next) [![Coverage:Functions](https://img.shields.io/badge/Functions-90%25-brightgreen?style=flat-square)](https://github.com/SKRTEEEEEE/admin-next) [![Coverage: Lines](https://img.shields.io/badge/Lines-92.3%25-brightgreen?style=flat-square)](https://github.com/SKRTEEEEEE/admin-next)

> A modern, multilingual, and highly performant portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features Clean Architecture, internationalization (i18n), and stunning particle effects.

---

## 📋 Overview

**Profile Next** is a professional portfolio website showcasing web development projects, technical skills, studies, and professional experience. Built with cutting-edge technologies and following Clean Architecture principles for maintainability and super scalability.

### ✨ Key Features

- 🌍 **Multilingual Support** - Available in English, Spanish, Catalan, and German
- 🎨 **Modern UI/UX** - Sleek design with particle effects and smooth animations
- ⚡ **Performance Optimized** - Built with Next.js 16 App Router and Turbopack
- 🚀 **Performance Pages** - Dedicated routes with 100% Lighthouse scores
- 🎯 **Type-Safe** - Full TypeScript implementation
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS 4
- 🧪 **Tested** - Unit and E2E tests with Playwright
- 🎭 **Accessible** - WCAG compliant with semantic HTML
- 🔍 **SEO Optimized** - Meta tags and structured data
- 🌙 **Dark Mode** - Theme switching support

---

## 🛠️ Tech Stack

### Core Technologies

- **Framework:** [Next.js 15.5.4](https://nextjs.org/) with App Router
- **UI Library:** [React 19.1.0](https://reactjs.org/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Internationalization:** [next-intl 4.3.9](https://next-intl-docs.vercel.app/)

### UI Components & Libraries

- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Particles:** [tsParticles](https://particles.js.org/)
- **Carousel:** [Swiper](https://swiperjs.com/)
- **Animations:** [React Type Animation](https://www.npmjs.com/package/react-type-animation)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)

### Development & Testing

- **Testing:** [Playwright](https://playwright.dev/) + [NYC](https://www.npmjs.com/package/nyc)
- **Linting:** [ESLint 9](https://eslint.org/) with Next.js config
- **Git Hooks:** [Husky](https://typicode.github.io/husky/)
- **Commit Linting:** [Commitlint](https://commitlint.js.org/)
- **Performance:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SKRTEEEEEE/profile-next.git
cd profile-next
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Setup

This project doesn't require environment variables for basic functionality. All configurations are managed through JSON files in the `content/data` directory.

---

## 📂 Project Structure

```
profile-next/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   └── [locale]/          # Internationalized routes
│   ├── components/            # React components
│   │   ├── oth/              # Other components (particles, nav, etc.)
│   │   └── ui/               # UI components (shadcn/ui)
│   ├── core/                 # Clean Architecture core
│   │   ├── domain/           # Business logic & entities
│   │   ├── application/      # Use cases
│   │   └── infrastructure/   # External services & adapters
│   ├── actions/              # Server actions
│   ├── lib/                  # Utilities and helpers
│   └── middleware.ts         # Next.js middleware (i18n)
├── content/
│   └── data/                 # Multilingual content (JSON)
├── public/                    # Static assets
├── tests/
│   ├── e2e/                  # End-to-end tests
│   └── unit/                 # Unit tests
├── docs/                      # Documentation
└── playwright.config.ts       # Playwright configuration
```

### Architecture

This project follows **Clean Architecture** principles:

- **Domain Layer:** Business entities and logic
- **Application Layer:** Use cases and business rules
- **Infrastructure Layer:** External services, APIs, and data sources
- **Presentation Layer:** React components and UI

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Playwright tests with coverage |
| `npm run test:prod` | Run tests in production mode |
| `npm run coverage` | Generate test coverage report |
| `npm run lhci` | Run Lighthouse CI performance audit |

---

## 🌍 Internationalization

The project supports multiple languages using `next-intl`:

- 🇬🇧 **English** (en)
- 🇪🇸 **Spanish** (es)
- 🇨🇦 **Catalan** (ca)
- 🇩🇪 **German** (de)

Content is managed through JSON files located in `content/data/[locale]/`.

### Adding a New Language

1. Create a new folder in `content/data/` with the locale code
2. Copy and translate JSON files from an existing locale
3. Update the middleware to include the new locale

---

## 🧪 Testing

This project uses **Playwright** for comprehensive testing including unit, component, integration, API, and E2E tests.

### Quick Start

```bash
# Run all tests (requires dev server running on localhost:3000)
npm run test

# Run only unit tests (no server required)
npx playwright test --project=unit
```

### Important Notes

- **Most tests require the dev server**: Run `npm run dev` in a separate terminal before executing tests
- **Test organization**: Tests are organized by type (unit, component, pages, integration, api, e2e)
- **Coverage reports**: Generated automatically in `docs/test-results/`

📖 **For detailed testing documentation, see [docs/test.md](docs/test.md)**

The test documentation includes:
- Complete test structure and organization
- Prerequisites for each test type
- How to run different test categories
- Troubleshooting common issues
- Performance metrics and expectations

---

## 🎨 Customization

### Content

Edit JSON files in `content/data/[locale]/` to customize:
- Personal information
- Projects
- Skills
- Studies
- Social links

### Styling

- **Colors:** Modify Tailwind config or `src/app/globals.css`
- **Components:** UI components are in `src/components/ui/`
- **Animations:** Configure in individual component files

### Particles

Particle effects are configured in `src/components/oth/cover-particles.tsx`.

---

## 📊 Performance

This project is optimized for performance:

- ⚡ **Next.js 15** with App Router and Turbopack
- 🎯 **Lighthouse Score:** Targeting 90+ across all metrics
- 📦 **Code Splitting:** Automatic route-based splitting
- 🖼️ **Image Optimization:** Next.js Image component
- 🔤 **Font Optimization:** `next/font` with Geist font family

### 🔍 SEO Optimization

The portfolio is optimized for maximum search engine visibility with comprehensive SEO implementation:

**Core SEO Features:**
- **robots.txt** - Dynamically generated via `src/app/robots.ts`
  - Allows all public routes
  - Disallows API, admin, and internal Next.js routes
  - Includes sitemap reference
  
- **sitemap.xml** - Auto-generated XML sitemap via `src/app/sitemap.ts`
  - All pages in 4 languages (es, en, ca, de)
  - Priority levels for important pages
  - Change frequencies for search engine crawlers
  - Last modification dates
  - Multi-language alternate links (hreflang)

- **Meta Tags & Open Graph** - Comprehensive metadata for all pages
  - Custom titles and descriptions per page and locale
  - Open Graph tags for social media sharing
  - Twitter Card metadata
  - Geo-location tags (Barcelona, Spain)
  - Author and creator information

- **Structured Data (JSON-LD)** - Rich snippets for search engines
  - Person schema with professional details
  - WebSite schema with multilingual support
  - ProfilePage schema for portfolio
  - SoftwareApplication schema for projects

**Target Keywords:**
The site is optimized to rank for:
- "dev desarrollador tech" / "dev desarollador tech"
- "desarrollador web Barcelona" / "desarollador web Barcelona"
- "fullstack developer Barcelona"
- "React developer Barcelona"
- And many more technology-specific keywords

**Access SEO Files:**
- Robots: `https://dev.desarrollador.tech/robots.txt`
- Sitemap: `https://dev.desarrollador.tech/sitemap.xml`

**SEO Implementation:**
- `src/lib/seo/metadata.ts` - Meta tag generation
- `src/lib/seo/schemas.ts` - JSON-LD structured data
- `src/app/robots.ts` - robots.txt configuration
- `src/app/sitemap.ts` - sitemap.xml generation

### 🚀 Performance-Optimized Pages

We provide dedicated `/perf` routes that achieve **100% Lighthouse scores** across all metrics (Performance, Accessibility, Best Practices, SEO):

- `/{locale}/perf` - Home page
- `/{locale}/portafolio/perf` - Portfolio page
- `/{locale}/info/perf` - Tech stack page
- `/{locale}/estudios/perf` - Studies page
- `/{locale}/code/perf` - Web3 projects page
- `/{locale}/gradients/perf` - Gradients preview page

**Key Optimizations:**
- Minimal JavaScript dependencies
- Simplified component structure
- No heavy animations or particle effects
- Optimized images and assets
- Server-side rendering only

**Performance Banner:**
Each `/perf` page includes a banner informing users about the performance-optimized version with a link back to the full-featured page.

Run Lighthouse audit for all pages:

```bash
npm run lhci
```

Run Lighthouse audit for performance pages only:

```bash
npm run lhci:perf
```

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with zero configuration

### Other Platforms

This Next.js app can be deployed on:
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Docker](https://www.docker.com/) (see below)

### Docker Deployment

```bash
# Build image
docker build -t profile-next .

# Run container
docker run -p 3000:3000 profile-next
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Adan Reh Mañach**

- GitHub: [@SKRTEEEEEE](https://github.com/SKRTEEEEEE)
- Portfolio: [View THIS Portfolio](https://profile-next-kappa.vercel.app/)
- Portfolio: [View OG Portfolio](https://profile-skrt.vercel.app/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [tsParticles](https://particles.js.org/) - Particle effects library

---

## 📞 Support

For support, questions, or feedback:

- Open an [Issue](https://github.com/SKRTEEEEEE/profile-next/issues)
- Start a [Discussion](https://github.com/SKRTEEEEEE/profile-next/discussions)

---

<div align="center">

**Made with ❤️ using Next.js, React, and TypeScript**

[⬆ Back to Top](#-profile-next---modern-portfolio-website)

</div>
