# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Vue 3 + TypeScript + Vite** modular application themed around the character Klee (可莉) from Genshin Impact. The project showcases character information, voice lines, emoticons/memes, galleries, timeline events, and story content in an interactive, visually-themed interface with proper routing.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (accessible on network with --host flag)
npm run dev

# Run tests in watch mode
npm run test:unit

# Type checking
npm run type-check

# Build for production (runs type-check first)
npm run build

# Preview production build
npm run preview
```

### Linting Commands
The project uses **dual linting** with both oxlint and ESLint:
```bash
# Run all linters (runs oxlint then ESLint sequentially)
npm run lint

# Run only oxlint (fast, correctness-focused)
npm run lint:oxlint

# Run only ESLint (Vue/TypeScript rules)
npm run lint:eslint
```

## Architecture & Key Patterns

### Project Structure
```
src/
├── assets/          # Static assets (images, audio)
│   ├── meme/       # Emoticon/meme images
│   ├── voicePack/  # Character voice audio files
│   └── *.png       # Character and UI images
├── components/     # Reusable components
│   ├── Sidebar.vue      # Navigation sidebar with character card
│   ├── emoticon.vue     # Meme viewer component
│   └── voicePack.vue    # Voice player component
├── layouts/        # Layout components
│   └── MainLayout.vue   # Main app layout with sidebar + content
├── views/          # Route view components
│   ├── HomeView.vue     # Main page (all content)
│   ├── VoiceView.vue    # Dedicated voice page
│   ├── MemeView.vue     # Dedicated meme page
│   ├── GalleryView.vue  # Image gallery
│   ├── TimelineView.vue # Character timeline/events
│   └── AboutView.vue    # Character information
├── router/         # Vue Router configuration
├── stores/         # Pinia state management
└── styles/         # Global styles
    └── global.css  # Theme variables and base styles
```

### Build System
- **Vite** is aliased to use `rolldown-vite` (experimental Rust-based bundler)
- Uses Vue DevTools plugin for enhanced debugging
- Path alias `@` maps to `./src` directory

### Routing System
The app uses **Vue Router** with nested routes:
- **Layout Route**: `/` uses `MainLayout.vue` which provides the sidebar and content wrapper
- **Child Routes** (all use MainLayout):
  - `/` - HomeView (all content combined)
  - `/voice` - VoiceView (dedicated voice page)
  - `/meme` - MemeView (dedicated meme page)
  - `/gallery` - GalleryView (image gallery with lightbox)
  - `/timeline` - TimelineView (character events timeline)
  - `/about` - AboutView (character information)

**Route Features:**
- Lazy-loaded views with `() => import()` for code splitting
- Page title updates via `beforeEach` guard using route meta
- Smooth transitions between views with fade animation
- Active route highlighting in sidebar navigation

### State Management
- Uses **Pinia** with Composition API stores
- Store example in `src/stores/counter.ts` demonstrates reactive state pattern
- Stores follow composition function pattern: `defineStore('name', () => { ... })`

### Component Architecture

#### Layout System
**MainLayout.vue**:
- Wraps all views with consistent sidebar + content structure
- Uses `<RouterView>` with transition animations
- Manages avatar talking animation via event emission from child components
- Background decorations and floating elements

**Sidebar.vue**:
- Character avatar card with hover effects
- Navigation using `<RouterLink>` components
- Active route highlighting with `:class="{ active: $route.path === '/' }"`
- Exposes `startTalking()` method for avatar animation

#### View Components
All view components follow a consistent pattern:
- Page header with title and description
- Content area using shared component or custom layout
- Scoped styles with theme variable usage
- TypeScript with strict typing

#### Dynamic Asset Loading Pattern
Components use **Vite's glob imports** to dynamically load assets:
```typescript
const modules = import.meta.glob('@/assets/meme/*.{jpg,jpeg,png,gif,avif}')
// Dynamically resolves all matching files at build time
```
This pattern:
- Loads all assets from a directory without manual imports
- Works at build time (Vite feature, not runtime)
- Returns promises that resolve to module objects with `.default` property containing the asset URL
- Used in `emoticon.vue`, `voicePack.vue`, and other asset-heavy components

#### Voice Pack Component (`voicePack.vue`)
- Manages audio playback with `HTMLAudioElement` refs
- Implements single-audio-at-a-time logic (pauses previous when new audio plays)
- Uses `@timeupdate` event for progress bar updates
- Emits `avatar-talk` event to trigger parent avatar animation
- Proper TypeScript typing with `VoiceData` interface

#### Emoticon Component (`emoticon.vue`)
- Implements modal viewer for full-size meme display
- Supports keyboard navigation (Arrow keys, ESC)
- Uses `onUnmounted` to properly clean up event listeners
- Prevents body scroll when viewer is open
- Grid layout for thumbnail display

#### Gallery Component (`GalleryView.vue`)
- Image grid with hover overlay effects
- Lightbox viewer using `<Teleport>` for modal
- Image data with title and description
- Click to open, ESC to close pattern

#### Timeline Component (`TimelineView.vue`)
- Vertical timeline with alternating left/right layout
- Marker dots on center line
- Event cards with dates, titles, descriptions, and images
- Responsive: switches to left-aligned on mobile

### Theming System
- CSS custom properties defined in `src/styles/global.css`
- `:root` defines light theme variables
- `.dark` class provides dark theme overrides
- Uses `--primary-rgb` pattern for alpha channel variations: `rgba(var(--primary-rgb), 0.3)`
- Theme colors inspired by character design (reds, browns, golds)
- Global animations and utility classes

### Animation Patterns
- Extensive use of CSS transitions on hover states
- Multiple `@keyframes` animations: `float`, `pulse`, `bounce`, `heartBeat`, `headShake`
- Transform-based interactions (scale, translate, rotate)
- Uses `cubic-bezier` easing for bouncy effects
- `::before` and `::after` pseudo-elements for decorative effects
- Route transition animations with Vue's `<Transition>` component

## TypeScript Configuration

The project uses **multiple tsconfig files**:
- `tsconfig.json` - References node and app configs
- `tsconfig.app.json` - App source code (strict mode enabled)
- `tsconfig.node.json` - Build tools (Vite config, etc.)
- `tsconfig.vitest.json` - Test environment types

**Important TypeScript Patterns:**
- Use proper type annotations for all refs: `ref<Type[]>([])`
- Event emitters use TypeScript syntax: `defineEmits<{ 'event-name': [] }>()`
- Component expose uses `defineExpose({ method: () => {} })`
- Always handle potential undefined values from array access

## Testing Setup
- **Vitest** with JSDOM environment
- Configuration in `vitest.config.ts` merges with Vite config
- Test files excluded from main ESLint rules but have Vitest plugin applied
- No existing test files yet, but structure is ready

## Node Version Requirement
Engine requirement: `^20.19.0 || >=22.12.0`
This is a recent Node.js version requirement - ensure your environment matches.

## Important Notes

### Asset Management
- Static assets in `src/assets/` organized by type: `meme/`, `voicePack/`
- Audio files use `.wav` and `.mp3` formats
- Images use various formats including `.avif` for modern compression
- All assets loaded dynamically via `import.meta.glob()` - add files to directories and they'll be auto-discovered
- Asset URLs use `new URL('@/assets/path', import.meta.url).href` for static imports in scripts

### Styling Approach
- **Global styles** in `src/styles/global.css` (imported in `main.ts`)
- **Scoped styles** in individual components
- Heavy use of CSS variables for theming
- Responsive breakpoint at `1024px` for layout changes
- Custom scrollbar hiding on feed element
- Page-specific styles use BEM-like naming

### Router Implementation
- Router configured in `src/router/index.ts`
- Uses nested routes with MainLayout as parent
- Lazy loading for all views (code splitting)
- `beforeEach` guard updates document title
- `App.vue` is now minimal - just renders `<RouterView />`

### Adding New Routes
To add a new route:
1. Create view component in `src/views/YourView.vue`
2. Add route to `src/router/index.ts` under MainLayout children
3. Add navigation link to `src/components/Sidebar.vue`
4. Follow existing pattern with meta.title for page titles

### Linting Strategy
The dual-linting approach with oxlint and ESLint is intentional:
- **oxlint**: Fast Rust-based linter for correctness checks
- **ESLint**: Vue and TypeScript ecosystem rules
- Both run via `npm run lint`, execute in sequence (not parallel)

## Common Tasks

### Adding New Memes/Images
Simply drop image files into `src/assets/meme/` - they'll be auto-discovered by the glob import.

### Adding New Voice Lines
Drop audio files (`.mp3` or `.wav`) into `src/assets/voicePack/` - filename becomes the display text.

### Modifying Theme Colors
Edit CSS variables in `src/styles/global.css` under `:root` or `.dark` selectors.

### Creating New Pages
Follow the view component pattern:
- Use page header structure for consistency
- Emit `avatar-talk` event when appropriate
- Import and use shared components (emoticon, voicePack)
- Add proper TypeScript types
