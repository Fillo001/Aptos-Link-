# Aptos Links

This is a **clone / demo version** of [apt-links.vercel.app](https://apt-links.vercel.app).  
It is a simple **link directory app** where you can save, organize, search, and share links with tags.  

Built with **Next.js** and deployable to **Vercel**.

---

## ✨ Features

- 🔗 **Link cards** with title, description, tags, and favicon  
- 📋 **Copy to clipboard** button for quick sharing  
- 🔍 **Search & filter** links by title, URL, description, or tags  
- 🏷️ **Tag-based filtering** (click a tag to filter links)  
- ➕ **Add link form** with title, description, and tags  
- 🎨 **Responsive dark UI** (mobile friendly)  
- ⚡ **Serverless API routes** (`/api/links`)  
  - `GET /api/links` → fetch all links  
  - `POST /api/links` → add a new link  
- 🛠️ **In-memory store** (data resets on cold start / redeploy)

---

## 🖼️ Screenshots

### Home Page
- List of saved links
- Copy/Open buttons
- Tags below each link

### Add Link Modal
- Form for adding a new link
- Fields: URL, Title, Description, Tags


## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) – React framework  
- [React](https://reactjs.org/) – UI components  
- [Vercel](https://vercel.com/) – Deployment  
- Vanilla CSS (in `styles/globals.css`) – Styling

 PROJECT STRUCTURE 
 aptos-links/ ├─ package.json          # Dependencies & scripts ├─ next.config.js        # Next.js config ├─ README.md             # Project docs ├─ public/ │   └─ favicon.ico       # Browser icon ├─ styles/ │   └─ globals.css       # Global styles ├─ pages/ │   ├─ _app.js           # Global wrapper │   ├─ index.js          # Homepage (UI) │   └─ api/ │       └─ links.js     # API routes
