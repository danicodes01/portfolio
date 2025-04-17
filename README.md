# Portfolio Project Documentation

## Project Overview

This is a personal portfolio website built with Next.js 15 and TypeScript. The site showcases projects with a clean, responsive design and includes features like dynamic routing, server-side rendering, internationalization, and SEO optimization.

**Live Site**: [danicodes.org](https://www.danicodes.org)

## Tech Stack

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript
- **Database**: Prisma with SQLite (better-sqlite3)
- **Styling**: CSS Modules with Tailwind CSS
- **Internationalization**: Custom implementation with dynamic routing
- **Dependencies**:
  - React 19
  - Next.js 15
  - Prisma ORM
  - TypeScript 5.8
  - Tailwind CSS 3.4
  - PostCSS
  - @formatjs/intl-localematcher
  - Negotiator

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── [lang]/             # Dynamic language route segment
│   │   ├── contact/        # Contact page
│   │   │   ├── page.module.css # Contact page styles
│   │   │   └── page.tsx    # Contact page component
│   │   ├── dictionaries/   # Language dictionaries
│   │   │   ├── en.json     # English translations
│   │   │   └── es.json     # Spanish translations
│   │   ├── projects/       # Projects pages
│   │   │   └── [slug]/     # Dynamic project routes
│   │   ├── resume/         # Resume page
│   │   │   ├── page.module.css # Resume page styles
│   │   │   └── page.tsx    # Resume page component
│   │   ├── dictionaries.ts # Dictionary utility functions
│   │   ├── layout.tsx      # Language-aware layout
│   │   ├── page.module.css # Home page styles
│   │   └── page.tsx        # Home page
│   └── globals.css         # Global styles with dark mode support
├── components/             # React components
│   ├── main-header/        # Header component
│   │   ├── language-switcher.module.css # Language switcher styles
│   │   ├── language-switcher.tsx        # Language switcher component
│   │   ├── main-header.module.css       # Header styles
│   │   ├── main-header.tsx              # Header component
│   │   ├── nav-link.module.css          # Navigation link styles
│   │   └── nav-link.tsx                 # Navigation link component
│   ├── projects/           # Project-related components
│   │   ├── project-grid.module.css # Project grid styles
│   │   ├── project-grid.tsx        # Project grid component
│   │   ├── project-item.module.css # Project item styles
│   │   └── project-item.tsx        # Project item component
│   └── video/              # Video player component
├── lib/                    # Utility functions
│   └── projects.ts         # Project data fetching logic
├── middleware.ts           # Language detection middleware
├── prisma/                 # Database schema and client
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
│   ├── global.d.ts         # Global type definitions
│   └── project.ts          # Project type definitions
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Internationalization (i18n)

The portfolio now supports multiple languages using Next.js dynamic routing:

### Language Handling

1. **Dynamic Route Segment**:
   - All pages are nested under `app/[lang]/` to capture the language parameter
   - Supported languages: English (en) and Spanish (es)

2. **Dictionary System**:
   - Translation dictionaries stored in `app/[lang]/dictionaries/`
   - `en.json` - English translations
   - `es.json` - Spanish translations
   - `dictionaries.ts` utility for loading the appropriate dictionary

3. **Middleware**:
   - `middleware.ts` detects user's preferred language from browser settings
   - Redirects to appropriate language route if none is specified
   - Uses `@formatjs/intl-localematcher` and `Negotiator` for language detection

4. **Language Switcher**:
   - UI component allowing users to manually change languages
   - Preserves current page path when switching languages
   - Highlights the currently active language

### Implementation Details

1. **Page Components**:
   - All page components receive language as a Promise-based param
   - Example:
     ```typescript
     export default async function ContactPage({
       params
     }: {
       params: Promise<{ lang: string }>
     }) {
       const { lang } = await params;
       const dict = await getDictionary(lang);
       // Component rendering with translated content
     }
     ```

2. **Dictionary Usage**:
   - Content is loaded from dictionaries based on current language
   - Example:
     ```typescript
     // Getting translated content
     const dict = await getDictionary(lang);
     
     // Using translated content
     <h1>{dict.contact.title}</h1>
     ```

3. **Link Handling**:
   - All internal links preserve the language parameter
   - Example:
     ```typescript
     <Link href={`/${lang}/resume`}>
       {dict.contact.resumeLink}
     </Link>
     ```

## Key Components

### Project Components

1. **ProjectGrid** (`components/projects/project-grid.tsx`):
   - Renders a grid of projects
   - Takes an array of Project objects as props
   - Maps each project to a ProjectItem component
   - Now language-aware with localized content

2. **ProjectItem** (`components/projects/project-item.tsx`):
   - Displays individual project with title, media, and summary
   - Uses localized summaries based on current language
   - Links to detailed project page with proper language routing

### Layout Components

1. **MainHeader** (`components/main-header/main-header.tsx`):
   - Site navigation header
   - Contains site title and navigation links
   - Now includes language switcher component
   - Receives current language and dictionary as props

2. **LanguageSwitcher** (`components/main-header/language-switcher.tsx`):
   - Allows users to switch between available languages
   - Preserves current page path when switching
   - Uses Next.js usePathname hook to determine current path

### Pages

1. **Home** (`app/[lang]/page.tsx`):
   - Landing page that displays all projects
   - Language-aware, receiving language parameter from URL
   - Loads appropriate dictionary for translations

2. **Contact** (`app/[lang]/contact/page.tsx`):
   - Contact information page with localized content
   - Displays email, LinkedIn, GitHub, and resume links
   - Link text changes based on selected language

3. **Resume** (`app/[lang]/resume/page.tsx`):
   - Comprehensive resume page with localized content
   - Includes work experience, projects, skills, and contact information
   - All text content pulled from language dictionaries

4. **Project Detail** (`app/[lang]/projects/[slug]/page.tsx`):
   - Dynamic route for individual project details
   - Language-aware, showing localized project descriptions
   - Handles both language and project slug parameters

## Project Type Definition

The `Project` type (from `types/project.ts`) now includes localization fields:

```typescript
export type Project = {
  id: string;
  title: string;
  slug: string;
  link: string;
  summary: string;
  summaryEs: string | null | undefined;  // Spanish summary
  info: string;
  infoEs: string | null | undefined;     // Spanish detailed info
  repo: string;
  media: string[];
  date: Date;
};
```

## Development Workflow

1. **Installation**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Database Setup**:
   ```bash
   npm run postinstall  # Generates Prisma client
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Start Production Server**:
   ```bash
   npm start
   ```

## Adding New Projects

To add a new project:

1. Add project data to your database
2. The project should include:
   - Unique ID and slug
   - Title and summary (in English)
   - Optional localized content (summaryEs, infoEs)
   - Media URLs (images or videos)
   - Publication date

## Adding New Languages

To add support for additional languages:

1. Create a new dictionary file in `app/[lang]/dictionaries/`
   - Example: `fr.json` for French
   
2. Add the new locale to the supported locales in middleware.ts:
   ```typescript
   const locales = ['en', 'es', 'fr']
   ```

3. Update the `dictionaries` object in `app/[lang]/dictionaries.ts`:
   ```typescript
   const dictionaries = {
     en: () => import('./dictionaries/en.json').then(module => module.default),
     es: () => import('./dictionaries/es.json').then(module => module.default),
     fr: () => import('./dictionaries/fr.json').then(module => module.default),
   }
   ```

4. Add the new language to the language switcher in `components/main-header/language-switcher.tsx`:
   ```typescript
   const languages = [
     { code: 'en', name: 'EN' },
     { code: 'es', name: 'ES' },
     { code: 'fr', name: 'FR' }
   ];
   ```

## SEO & Performance

- Each page has proper metadata with localized titles and descriptions
- The site automatically detects and redirects to the user's preferred language
- URL structure includes language code for better SEO
- All pages support both English and Spanish content

## Media Handling

The site supports both images and videos for projects:

- Videos are detected using the `isVideo()` utility function
- Media is displayed in a responsive container with appropriate styling
- Alt text and accessibility are maintained across languages

## Deployment

This Next.js application can be deployed to various platforms:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted server

The deployment URL is configured as `https://www.danicodes.org/` in the sitemap.

## Future Enhancements

Potential areas for improvement:

1. Add dark mode support using next-themes
2. Add more languages beyond English and Spanish
3. Add a blog section with MDX support
4. Integrate with a CMS for easier content management
5. Add contact form functionality