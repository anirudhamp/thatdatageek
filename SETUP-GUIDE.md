# thatdatageek.com — Launch Guide

Your site is 100% static: no build step, no database, nothing to maintain.
Total cost: **$0/month** (only the domain, already paid until Mar 2027).

---

## Step 1 — Put the code on GitHub (~10 min, one time)

1. Create a free account at https://github.com (skip if you have one — you do: github.com/anirudhamp).
2. Click **+ → New repository**. Name it `thatdatageek`. Keep it **Public** (or Private — both work with Netlify). Do NOT initialize with a README. Click **Create repository**.
3. Upload the site files. Easiest way, no command line:
   - On the new empty repo page, click **"uploading an existing file"**.
   - Drag ALL the contents of this folder (index.html, style.css, script.js, SETUP-GUIDE.md, the `assets` folder, the `blog` folder) into the upload box.
   - Note: GitHub's drag-drop can't take folders in some browsers — if `assets/` and `blog/` won't drop, use "Add file → Upload files" and drag the folders from Finder/Explorer; Chrome handles folders fine.
   - Click **Commit changes**.

## Step 2 — Connect Netlify (~5 min, one time)

1. Go to https://app.netlify.com and sign up — choose **"Sign up with GitHub"** (this links the two automatically).
2. Click **Add new site → Import an existing project → GitHub**.
3. Authorize Netlify, then pick the `thatdatageek` repository.
4. Build settings: leave EVERYTHING blank/default (no build command, publish directory = root). Click **Deploy**.
5. In ~30 seconds you'll get a live URL like `random-name-12345.netlify.app`. Open it and check the site.

From now on: any file you change on GitHub auto-publishes to the live site within a minute. That's the "auto-deploy" part.

## Step 3 — Connect your domain (~10 min + DNS wait)

1. In Netlify: **Site configuration → Domain management → Add a domain** → type `thatdatageek.com` → **Add domain** (it will also offer `www.thatdatageek.com` — accept it).
2. Netlify will show DNS instructions. Use the **"Set up Netlify DNS"** option OR the manual records option:

   **Manual records (recommended — keeps Wix as registrar untouched):**
   | Type  | Host/Name | Value              |
   |-------|-----------|--------------------|
   | A     | @         | 75.2.60.5          |
   | CNAME | www       | apex-loadbalancer.netlify.com (Netlify shows the exact value — use theirs) |

3. In Wix: **Domains page → (…) menu next to thatdatageek.com → Manage DNS records**.
   - Delete any existing A records pointing to Wix.
   - Add the A record and CNAME from the table above.
4. Wait 30 min – a few hours for DNS to propagate. Netlify auto-issues a free HTTPS certificate once it detects the records.
5. Done: https://thatdatageek.com now shows your new site. No Wix banner, no subscription.

## Step 4 — Finish the content (whenever)

- **Email:** done — anirudhamp@gmail.com is in the Contact section.
- **Blog posts:** done — full text of all 3 posts is migrated with original dates.
- **Blog images:** all done — every blog figure, cover, and portrait is bundled locally. The keynote slides PDF is linked from the Keynotes section.
- **Remaining photos (phase 2, before ever closing Wix):** only the 6 project screenshots and the keynote photo still load from Wix's CDN. Download them from Wix's Media Manager into `assets/`, then ask Claude to swap the paths — a 10-minute job.

## Optional — turn on real comments (Giscus, ~10 min)

Giscus lets readers comment on your posts with their GitHub accounts; comments are stored
as Discussions on your repo. Free, no server, no spam farm.

1. On your `thatdatageek` GitHub repo: **Settings → General → Features → check "Discussions"**.
2. Install the Giscus app: https://github.com/apps/giscus → Install → select the `thatdatageek` repo.
3. Go to https://giscus.app → enter your repo name → choose category **Announcements** →
   it shows you a `data-repo-id` and `data-category-id`.
4. Open `script.js`, find the `GISCUS = {` block near the bottom, and paste the three values
   (repo, repoId, categoryId). Commit — done. A comment box appears at the end of every post.

Until you do this, the Comments section stays hidden automatically, so there's no rush.

## Later (set a reminder for ~Jan 2027)

Transfer the domain registration away from Wix before its Mar 12, 2027 renewal:
Wix Domains page → (…) → **Transfer away from Wix** → transfer to Cloudflare Registrar (~$10/yr) or Namecheap. Your Netlify DNS records carry over; the site never goes down.
