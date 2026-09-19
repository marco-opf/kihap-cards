# Kihap! Cards — website

Static one-page store for Kihap! Cards. No build step, no dependencies — plain HTML
with inline styles and image files. Anything that can serve a folder can host it.

## Files

| Path | What it is |
|---|---|
| `index.html` | The site (desktop layout, 1440px wide) |
| `mobile.html` | The phone layout (390px wide) |
| `assets/` | Logo and card images (WebP) |
| `favicon.ico`, `favicon-*.png` | Browser tab icons |
| `apple-touch-icon.png` | iPhone and iPad home-screen icon |
| `android-chrome-*.png` | Android and installable web-app icons |
| `site.webmanifest`, `browserconfig.xml` | Mobile/PWA and Microsoft icon metadata |

`index.html` redirects to `mobile.html` under 760px wide, and `mobile.html` redirects
back above it. Add `?full` to the URL to force the desktop page on a phone.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (public, no README — this folder already has one).
2. Upload the contents of this folder to the root of the repo: `index.html`,
   `mobile.html`, `README.md` and the whole `assets` folder.
   Either drag them onto the repo page ("uploading an existing file"), or from a terminal:

   ```bash
   cd kihap-cards-site
   git init
   git add .
   git commit -m "Kihap! Cards website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**. Under "Build and deployment", set
   **Source** to *Deploy from a branch*, **Branch** to `main` and folder to `/ (root)`.
   Save.
4. Wait about a minute, then open `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

To use your own domain, add it under Settings → Pages → Custom domain and point a
CNAME record at `YOUR-USERNAME.github.io` with your registrar.

## Editing

Everything is inline in the two HTML files — text can be edited straight in GitHub's
web editor. Images live in `assets/`; replacing a file keeps every reference working
as long as the filename stays the same.

## Known limits

- The layouts are fixed-width (1440 / 390), which is why the redirect exists. A single
  fluid layout would need the inline widths reworked into a responsive stylesheet.
- Every purchase button and Contact open an on-page email card. The card sends
  submissions to `kihapcards@gmail.com` through FormSubmit; it is not a payment
  checkout. The recipient must confirm FormSubmit's one-time activation email.
- Product claims in the copy — free US shipping, 30-day returns, storage ring and
  quick-start card — are placeholders to confirm before launch.
