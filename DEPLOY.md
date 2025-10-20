PICA Photobooth — Deployment Instructions

This repository contains a static build in `dist/` that can be deployed to Vercel or GitHub Pages.

Prerequisites
- Git installed
- A GitHub account (for GitHub Pages) or a Vercel account (for Vercel)

Option A — Deploy to Vercel (recommended for static sites)
1. Create a new Git repository on GitHub and note the repo URL (or use an existing one).
2. From PowerShell:

```powershell
cd "C:\Users\Acer\OneDrive\online"
# initialize repo if needed
git init
git add .
git commit -m "Prepare dist for deployment"
# replace <your-repo-url> with the GitHub repo HTTPS URL
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

3. Go to https://vercel.com and log in with GitHub. Import the repository you just pushed. In the Vercel import screen set:
- Framework: Other
- Build & Output Settings: Leave default
- Output Directory: `dist`

4. Deploy. Vercel will build and host your site at an HTTPS URL.

Option B — GitHub Pages (static site)
1. Commit `dist` content to a branch called `gh-pages` and push it.

```powershell
cd "C:\Users\Acer\OneDrive\online"
# Create a branch with only dist contents
git init
git checkout -b gh-pages
rm -rf ./*
# copy dist content into the repo root
cp -Recurse .\dist\* .
git add .
git commit -m "Publish dist to gh-pages"
# replace <your-repo-url> with the GitHub repo HTTPS URL
git remote add origin <your-repo-url>
git push -u origin gh-pages
```

2. In GitHub repository -> Settings -> Pages, set source to `gh-pages` branch. GitHub will publish to https://<username>.github.io/<repo>/

Smoke tests (after deployment)
- Open the published HTTPS URL.
- In DevTools Console, confirm no uncaught syntax errors.
- Click "Start Booth" and allow camera access. Capture a photo, download it, and confirm the preview appears.

Optional: Wire to backend (Cloudinary + Mongo)
- If you want photo uploads and feedback stored on the server, I can update the frontend to POST to `/api/photos` and `/api/feedback` and prepare a Render/Railway manifest for the Node app. You will need to set environment variables for MongoDB and Cloudinary on the host.

If you want, I can do the Git pushes for you locally and help connect Vercel — but I won't access your GitHub account or Vercel account automatically. I can provide exact commands and copy-paste steps.

Quick local static server (optional)
-- If you want to smoke-test the `dist/` build locally over HTTP (required to exercise camera in some browsers), you can run a tiny static server with Node:

```powershell
# install http-server if you don't have it (you only need to do this once)
npm install -g http-server

# run the server from the repo root and serve dist
cd "C:\Users\Acer\OneDrive\online"
http-server .\dist -p 8080 --cors

# Open https://localhost:8080 in the browser (note: http-server serves HTTP; for camera tests prefer Vercel/Pages with HTTPS)
```

Full Git + Vercel push (copy/paste)
```powershell
cd "C:\Users\Acer\OneDrive\online"
git init
git add .
git commit -m "Prepare static dist for deployment"
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

After pushing, import the repo to Vercel and set Output Directory to `dist`.
