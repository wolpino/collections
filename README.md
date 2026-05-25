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

**Photographs** (`content/photographs.json`) — grouped by folder under `public/photographs/`:

```json
[
  {
    "id": "idaho",
    "title": "Idaho",
    "items": [
      {
        "id": "idaho-img-20190608-191611-01",
        "src": "/photographs/idaho/IMG_20190608_191611-01.jpeg",
        "alt": "Idaho — IMG_20190608_191611-01",
        "title": "IMG 20190608 191611 01",
        "width": 3036,
        "height": 4048,
        "notes": "Optional lightbox notes"
      }
    ]
  }
]
```

**Crafts** (`content/crafts.json`):

```json
{
  "id": "unique-id",
  "src": "/crafts/file.svg",
  "alt": "Accessibility description",
  "title": "Caption",
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

### Sync photographs from folders

After adding images under `public/photographs/<folder>/`, regenerate the JSON:

```bash
npm run sync:photographs
npm run sync:photographs -- --folder idaho
npm run sync:photographs -- -f chicago -f idaho
```

Scans each subdirectory as a group, reads image dimensions (via macOS `sips` when available), and writes `content/photographs.json`. Existing `notes` and `title` values are kept for items with the same id.

With `--folder` / `-f`, only those folders are rescanned; other groups already in the JSON are left unchanged.

### Photograph routes

- `/photographs` — grid of albums (cover image = first photo in each folder)
- `/photographs/<folder>` — spread-out stack for that album (e.g. `/photographs/idaho`), click any print for the lightbox

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