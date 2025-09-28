

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


---

## 🔧 Development

### 1. Clone the repo
```bash
git clone https://github.com/Fillo001/aptos-links.git
cd aptos-links
2. Install dependencies

npm install

3. Run locally

npm run dev

Visit: http://localhost:3000


---

🌍 Deployment (Vercel)

1. Push your repo to GitHub.


2. Connect the repo to Vercel.


3. Deploy → the app will be live on a vercel.app URL.




---

⚠️ Limitations

Links are stored in-memory inside the serverless function (pages/api/links.js).

They reset whenever the server restarts or redeploys.


To make links persistent, connect a database:

SQLite / Prisma

PostgreSQL / PlanetScale

Supabase


📌 Roadmap

✅ Add, search, filter, copy links

⏳ Add authentication (NextAuth.js)

⏳ Persistent DB support

⏳ Tag cloud view / sorting

⏳ Import/export bookmarks


📜 License

MIT License – free to use, modify, and deploy.

---

Do you also want me to **update the code internals** (like the app title in `pages/index.js` and modal headers) from *Smart Links* → *Aptos Links* so the UI matches the new name?
