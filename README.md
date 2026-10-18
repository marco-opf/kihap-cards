# Kihap! Cards website

A lightweight responsive storefront built with plain HTML, CSS, and JavaScript.

## Architecture

- No framework, dependencies, build step, database, or server runtime
- One responsive `index.html` for desktop and mobile
- `mobile.html` redirects old links to the canonical page
- Stripe-hosted checkout handles payments and order details
- YouTube/Vimeo video loads only after the visitor clicks Play
- Static privacy, return, shipping, and terms pages

## Store configuration

Edit the `store` object near the top of `site.js`:

```js
var store = {
  checkoutUrl: 'https://buy.stripe.com/8x2dRa5M9fLmfi4dyp9k400',
  testMode: false,
  videoUrl: 'https://vimeo.com/1236913465'
};
```

The checkout uses the live Stripe Payment Link and can process real payments. The Vimeo explainer is configured in `videoUrl`; for an unlisted Vimeo replacement, keep the complete URL including its privacy hash. The third-party player will not load until Play is clicked.

## Local preview

Run `python3 -m http.server 8080` in this directory, then open `http://localhost:8080`.

The repository can be deployed as-is to any static host, including the existing Vercel project. No build command is needed.
