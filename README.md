# Faizan Idrishi — Portfolio

Static portfolio site for Shopify & WordPress development work.

**Live:** https://faizanidrishi.vercel.app

## Local preview

Open `index.html` in your browser, or run a simple server:

```bash
npx serve .
```

## Edit projects

All projects live in the `projects` array near the bottom of `index.html`. Each entry looks like:

```javascript
{
  slug: "denaroclub",
  name: "Denaro Club",
  url: "https://denaroclub.com",
  category: "Streetwear (polos, tees, jerseys)",
  platform: "Shopify",   // or "WordPress"
  tier: "scratch",       // or "assist"
  blurb: "One paragraph case study intro."
}
```

After adding or removing projects, update the hero stats (`25`, `11`) in the HTML if counts change.

## Screenshots (optional)

Place PNG files in `screenshots/` named by slug, e.g. `screenshots/denaroclub.png`. If a file is missing, a styled placeholder card is shown instead.

## Deploy

Push to GitHub — Vercel auto-deploys on every push to `main`.

Vercel settings:
- **Framework:** Other
- **Build command:** (none)
- **Output directory:** `/`

## Share a case study

Link directly to a project: `https://faizanidrishi.vercel.app/?project=denaroclub`
