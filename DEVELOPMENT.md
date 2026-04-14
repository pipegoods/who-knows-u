# Development Guide

## Setup

```bash
npm install
```

## Running in Development Mode

```bash
npm run dev
```

Note: The PWA plugin uses `virtual:pwa-register` which requires special handling in the Vite config. The vite.config.js is already configured to handle this.

## Building for Production

```bash
npm run build
```

## Linting

```bash
npm run lint
npm run lint:fix
```

## Key Configuration Notes

### Vite Configuration
- The `vite.config.js` excludes `virtual:pwa-register` from the build bundle
- Path aliases are configured for `@` -> `src/`
- Tailwind CSS is imported via SCSS additional data

### PWA Plugin
- Uses `vite-plugin-pwa` for service worker support
- The `virtual:pwa-register` module is externalized in production builds
- In development, it's handled by the PWA plugin's dev server integration
