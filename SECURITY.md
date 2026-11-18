# Security Policy

MiniCatalog is a client-side GitHub Pages prototype. Seller catalog data and QuickPay demo data are stored in the visitor's browser with localStorage.

## Important limits

- This project must not store passwords, card numbers, UPI PINs, API keys, or other secrets.
- QuickPay is simulation-only and does not process real money.
- Browser localStorage is not a secure database. Anyone using the same browser profile can potentially inspect or change it.
- GitHub Pages is static hosting, so real authentication, server-side authorization, order processing, and payment verification require a trusted backend.

## Reporting a problem

If you find a security issue, open a private security report through GitHub's repository security features when available. Do not publish passwords, private keys, payment information, or other sensitive data in an issue.

## Safe development rules

- Validate imported backups before replacing local data.
- Accept only HTTPS product image URLs.
- Escape seller-controlled text before putting it into generated storefront HTML.
- Keep demo/payment features clearly marked as simulation-only.
- Run the repository smoke/security checks before publishing changes.
