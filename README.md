# Collections

A Next.js site for photographs, recipes, and crafts with stack/grid galleries, lightboxes, and full test coverage.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Content lives in `content/*.json`; images go under `public/photographs/`, `public/recipes/`, and `public/crafts/`.

### Content schemas

**Photographs & crafts** (`content/photographs.json`, `content/crafts.json`):

```json
{
  "id": "unique-id",
  "src": "/photographs/file.svg",
  "alt": "Accessibility description",
  "title": "Optional caption",
  "notes": "Optional lightbox notes"
}
```

**Recipes** (`content/recipes.json`):

```json
{
  "id": "unique-id",
  "title": "Recipe name",
  "ingredients": ["line one", "line two"],
  "steps": ["step one", "step two"],
  "image": "/recipes/optional-photo.svg",
  "notes": "Optional tips"
}
```

Omit `image` or `notes` when not needed.

## Testing

Unit and component tests (Vitest + Testing Library):

```bash
npm test
npm run test:watch
npm run test:coverage
```

End-to-end tests (Playwright, builds and starts the app):

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium
npm run test:e2e
```

## Deploy

```bash
npm run build
npm run start
```

Deploy to any Node host (e.g. Vercel) with `npm run build` as the build command and `npm run start` (or the platform default) for production.

CI runs unit coverage, production build, and Playwright on push/PR (see `.github/workflows/test.yml`).
