# cdr-shops.com

Static Hugo site for the CDR shop directory by the Carbon Drawdown Initiative. Replaces the earlier Squarespace site.

## How it works

- **One YAML file per shop** in `data/shops/` — name, A–C ratings (MRV / certification / delivery), method, price, certifier, external shop URL. Cards on the homepage and in `/cdr-shop-directory/` render from these files; the overall badge is computed as the worst of the three letters.
- **Text pages** in `content/` (plain Markdown).
- **Design** follows the "CDR Shops" design system (tokens in `assets/css/main.css` `:root`; light + dark theme). Fonts: Archivo Black / Space Grotesk / Space Mono via Google Fonts.
- **Deploy:** push to `main` → GitHub Actions builds Hugo 0.160.1 and publishes to GitHub Pages.

## Adding a shop

Copy any file in `data/shops/`, adjust the fields, pick a `weight` (cards sort ascending), commit, push. Nothing else to touch.

## Old Squarespace URLs

`/home`, `/cdr-shops-store` and all `/cdr-shops-store/p/*` product URLs redirect to the directory via Hugo aliases.
