# Portfolio Project Documentation

## Project Overview

This is a personal portfolio website built with Next.js 14 and TypeScript. The site showcases projects with a clean, responsive design and includes features like dynamic routing, server-side rendering, and SEO optimization.

## Tech Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript
- **Database**: Prisma with SQLite (better-sqlite3)
- **Styling**: CSS Modules with Tailwind CSS
- **Dependencies**:
  - React 18
  - Next.js
  - Prisma ORM
  - TypeScript
  - Tailwind CSS 3.4.1
  - PostCSS

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── contact/            # Contact page
│   │   ├── page.module.css # Contact page styles
│   │   └── page.tsx        # Contact page component
│   ├── projects/           # Projects pages
│   │   └── [slug]/         # Dynamic project routes
│   ├── resume/             # Resume page
│   │   ├── page.module.css # Resume page styles
│   │   └── page.tsx        # Resume page component
│   ├── globals.css         # Global styles with dark mode support
│   ├── layout.tsx          # Root layout
│   ├── page.module.css     # Home page styles
│   ├── page.tsx            # Home page
│   └── sitemap.tsx         # SEO sitemap
├── components/             # React components
│   ├── main-header/        # Header component
│   │   ├── main-header.module.css # Header styles
│   │   ├── main-header.tsx        # Header component
│   │   ├── nav-link.module.css    # Navigation link styles
│   │   └── nav-link.tsx           # Navigation link component
│   ├── projects/           # Project-related components
│   │   ├── project-grid.module.css # Project grid styles
│   │   ├── project-grid.tsx        # Project grid component
│   │   ├── project-item.module.css # Project item styles
│   │   └── project-item.tsx        # Project item component
│   └── video/              # Video player component
├── lib/                    # Utility functions
│   └── projects.ts         # Project data fetching logic
├── prisma/                 # Database schema and client
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
│   ├── better-sqlite3.d.ts # SQLite type definitions
│   ├── global.d.ts         # Global type definitions
│   └── project.ts          # Project type definitions
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Key Components

### Project Components

1. **ProjectGrid** (`components/projects/project-grid.tsx`):
   - Renders a grid of projects
   - Takes an array of Project objects as props
   - Maps each project to a ProjectItem component
   - Uses CSS modules for styling with `project-grid.module.css`

2. **ProjectItem** (`components/projects/project-item.tsx`):
   - Displays individual project with title, media, and summary
   - Detects if media is video or image using the `isVideo()` utility function
   - Renders videos with a custom Video component or images with standard img tags
   - Links to detailed project page with dynamic routing
   - Uses CSS modules for styling with `project-item.module.css`

### Layout Components

1. **MainHeader** (`components/main-header/main-header.tsx`):
   - Site navigation header
   - Contains site title and navigation links
   - Uses NavLink component for styled links
   - Supports the site owner's branding with highlighted name
   - Uses CSS modules for styling with `main-header.module.css`

2. **NavLink** (`components/main-header/nav-link.tsx`):
   - Custom link component for navigation
   - Uses Next.js Link component for client-side navigation
   - Styled with CSS modules using `nav-link.module.css`

### Pages

1. **Home** (`app/page.tsx`):
   - Landing page that displays all projects
   - Fetches projects using getProjects() function from lib/projects
   - Renders projects using ProjectGrid component
   - Uses CSS modules for styling with `page.module.css`

2. **Contact** (`app/contact/page.tsx`):
   - Contact information page
   - Displays email, LinkedIn, GitHub, and resume links
   - Uses CSS modules for styling with `contact/page.module.css`

3. **Resume** (`app/resume/page.tsx`):
   - Comprehensive resume page
   - Includes work experience, projects, skills, and contact information
   - Uses CSS modules for styling with `resume/page.module.css`
   - Sets metadata for better SEO

4. **Project Detail** (`app/projects/[slug]/page.tsx`):
   - Dynamic route for individual project details
   - Fetches specific project data based on slug parameter

5. **Sitemap** (`app/sitemap.tsx`):
   - Generates dynamic sitemap for SEO optimization
   - Includes base URLs (home, contact, resume) with priority levels
   - Dynamically generates project URLs from database
   - Sets revalidation time to 3600 seconds (1 hour)
   - Returns URLs in MetadataRoute.Sitemap format

## Data Flow

1. **Data Fetching**:
   - Projects data is fetched from the database using Prisma client
   - `getProjects()` function in `lib/projects.ts` retrieves all projects
   - Data is passed to components as props

2. **Routing**:
   - Next.js App Router handles page routing
   - Dynamic routes for project details using [slug] parameter
   - Links between pages handled by Next.js Link component

## Project Type Definition

The `Project` type (from `types/project.ts`) includes:

```typescript
interface Project {
  id: string;         // Unique identifier for the project
  slug: string;       // URL-friendly identifier used in dynamic routes
  title: string;      // Project title
  media: string[];    // Array of media URLs (images or videos)
  summary: string;    // Brief description of the project
  date: string | Date; // Publication or update date
  // Additional fields may be present
}
```

This type is used throughout the application for strong typing and consistency, particularly in:
- The `getProjects()` function return type
- Props for the `ProjectGrid` and `ProjectItem` components
- Parameter destructuring in the `ProjectItem` component

## Development Workflow

1. **Installation**:
   ```bash
   npm install
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
   - Title and summary
   - Media URLs (images or videos)
   - Publication date

New projects will automatically appear on the home page and in the sitemap.

## Styling and Theming

### CSS Modules

The project uses CSS Modules for component-specific styling:
- Each component has its own `.module.css` file
- Class names are scoped locally to prevent style conflicts
- Styles are imported and applied using the `classes` or `styles` object

### Global Styles

The `app/globals.css` file contains:
- Font imports from Google Fonts (Oswald, Roboto, Source Sans Pro, etc.)
- Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- CSS variables for colors, sizes, and spacing
- Base styling for the body element

### Dark Mode Support

The portfolio includes built-in dark mode support:
- Uses CSS variables defined in `:root` for light mode
- Overrides variables with `@media (prefers-color-scheme: dark)` for dark mode
- Variables include:
  - Background colors
  - Text colors
  - Box shadow effects
  - UI component colors

### Color Palette

The site uses a consistent color palette defined with CSS variables:
- Grey scale: `--color-grey-50` through `--color-grey-900`
- Primary colors: `--color-primary-50` through `--color-primary-700`
- Special UI elements: `--logo-rgb`, `--text`, `--contact-background`, etc.

## SEO & Performance

- The site generates a dynamic sitemap for better search engine indexing
- Different pages have different priority levels:
  - Homepage: 1.0 (highest)
  - Contact and Resume: 0.8
  - Project pages: 0.7
- The sitemap is revalidated every hour (3600 seconds)
- Uses Next.js metadata API for proper page titles and descriptions
- Implements proper semantic HTML structure
- Optimizes images with Next.js Image component where appropriate

## Deployment

This Next.js application can be deployed to various platforms:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted server

The deployment URL is configured as `https://www.danicodes.org/` in the sitemap.

## Media Handling

The site supports both images and videos for projects:

- Videos are detected by checking for common video file extensions or "video" in the URL
- The `isVideo()` utility function in `ProjectItem` component determines the media type:
  ```typescript
  const isVideo = (media: string): boolean => {
    const videoIndicators = ["video", ".mp4", ".webm", ".ogg", ".mov"];
    return videoIndicators.some((indicator) => media.includes(indicator));
  };
  ```
- Videos are rendered using the custom Video component from `@/components/video/video`
- Images are rendered using standard img tags with the project slug as alt text
- Media is displayed in a responsive container with appropriate styling

## Future Enhancements

Potential areas for improvement:

1. Add dark mode support using next-themes
2. Implement internationalization for multiple languages
3. Add a blog section with MDX support
4. Integrate with a CMS for easier content management
5. Add contact form functionality
