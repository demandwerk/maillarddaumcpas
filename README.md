# Maillard & Daum, CPAs

Static website for Maillard & Daum, CPAs (Port Jefferson, NY). Plain HTML, CSS and JS: no build step.

## Deploy on Vercel

Import this repo in Vercel, set **Framework Preset** to **Other**, leave the build command empty, and deploy.

## Before launch

- Replace every `[bracketed]` placeholder (highlighted on the page): partner names and bios, founding year, address, phone, fax, email, hours, parking.
- Replace the sample quotes on `testimonials.html` with real client quotes used with permission.
- Contact form: set `data-endpoint` on `#contact-form` in `contact.html` to a form service URL (e.g. Formspree).
- Remove the `<meta name="robots" content="noindex, nofollow">` line from every page once the new name is announced.
