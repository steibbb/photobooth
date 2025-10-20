# PICA Photobooth — Online

This repository contains a static build of the PICA Photobooth app in the `dist/` folder and simple deployment helpers for Vercel and GitHub Pages.

What you get
- A sanitized static single-file web app ready to be hosted from `dist/index.html`.
- `vercel.json` to tell Vercel to serve the `dist/` directory.
- A GitHub Actions workflow that publishes the `dist/` folder to the `gh-pages` branch.

Quick start (PowerShell)

1. Initialize and push to GitHub (replace `<your-repo-url>`):

```powershell
cd "C:\Users\Acer\OneDrive\online"
git init
git add .
git commit -m "Prepare static dist for deployment"
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

2a. Vercel (recommended):
- Go to https://vercel.com, sign in, Import Project from GitHub.
- During import set:
  - Framework: Other
  - Output Directory: `dist`
- Deploy. Vercel provides HTTPS which is required for camera access.

2b. GitHub Pages (alternative):
- The included GitHub Actions workflow will publish `dist/` to the `gh-pages` branch automatically on pushes to `main`.

Smoke tests after deployment
- Open the published HTTPS URL.
- Open DevTools console and confirm there are no syntax errors.
- Click "Start Booth" and allow camera access. Capture a photo and download it.

Notes
- Camera APIs require HTTPS on most browsers. Deploy to a host that provides HTTPS (Vercel / GitHub Pages) instead of file://.
- If you want server-side uploads (Cloudinary/Mongo), I can wire the frontend to the existing `src/` API and prepare a server deployment manifest (Render/Railway). This requires environment variables and a hosted Node process.

If you'd like, I can provide the exact Git commands and walk through importing to Vercel step-by-step.
