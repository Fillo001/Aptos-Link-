import { useEffect, useState } from 'react'

function faviconFor(url) {
  try {
    const u = new URL(url)
    return `https://s2.googleusercontent.com/s2/favicons?domain=${u.hostname}`
  } catch {
    return '/favicon.ico'
  }
}

async function copyToClipboard(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
    return true
  }
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  try { document.execCommand('copy'); return true } finally { ta.remove() }
}

function LinkCard({ link, onCopy, onTagClick }) {
  return (
    <div className="card">
      <div className="card-left">
        <img className="favicon" src={faviconFor(link.url)} alt="favicon" />
      </div>
      <div className="card-main">
        <div className="card-title">
          <a href={link.url} target="_blank" rel="noreferrer">{link.title || link.url}</a>
        </div>
        {link.description && <div className="card-desc">{link.description}</div>}
        <div className="card-meta">
          <div className="tags">
            {(link.tags || []).map((t) => (
              <button key={t} className="tag" onClick={() => onTagClick(t)}>{t}</button>
            ))}
          </div>
          <div className="actions">
            <button className="btn small" onClick={() => onCopy(link.url)}>Copy</button>
            <a className="btn small ghost" href={link.url} target="_blank" rel="noreferrer">Open</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [filterTag, setFilterTag] = useState(null)
  const [q, setQ] = useState('')
  const [statusMsg, setStatusMsg] = useState(null)

  async function fetchLinks() {
    setLoading(true)
    try {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLinks() }, [])

  async function handleAdd(ev) {
    ev.preventDefault()
    const fd = new FormData(ev.target)
    const payload = {
      title: (fd.get('title') || '').toString().trim(),
      url: (fd.get('url') || '').toString().trim(),
      description: (fd.get('description') || '').toString().trim(),
      tags: (fd.get('tags') || '').toString().split(',').map(s => s.trim()).filter(Boolean)
    }
    if (!payload.url) return
    const temp = { ...payload, id: `tmp-${Date.now()}`, createdAt: new Date().toISOString() }
    setLinks(prev => [temp, ...prev])
    setShowAdd(false)
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const created = await res.json()
      setLinks(prev => prev.map(l => (l.id === temp.id ? created : l)))
    } catch {
      setLinks(prev => prev.filter(l => l.id !== temp.id))
    }
  }

  async function handleCopy(text) {
    await copyToClipboard(text)
    setStatusMsg('Copied ✓')
    setTimeout(() => setStatusMsg(null), 1500)
  }

  const filtered = links.filter(l => {
    if (filterTag && !(l.tags || []).includes(filterTag)) return false
    if (q) {
      const t = q.toLowerCase()
      return (
        (l.title || '').toLowerCase().includes(t) ||
        (l.description || '').toLowerCase().includes(t) ||
        (l.url || '').toLowerCase().includes(t) ||
        (l.tags || []).join(' ').toLowerCase().includes(t)
      )
    }
    return true
  })

  return (
    <div className="page">
      <header className="header">
        <h1>APT Links — demo</h1>
        <div className="controls">
          <input className="search" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
          <button className="btn" onClick={() => setShowAdd(true)}>Add link</button>
        </div>
      </header>

      <main className="container">
        {statusMsg && <div className="status">{statusMsg}</div>}
        {filtered.length === 0 ? <div className="hint">No links found.</div> : (
          <div className="list">
            {filtered.map(link => (
              <LinkCard key={link.id} link={link} onCopy={handleCopy} onTagClick={setFilterTag} />
            ))}
          </div>
        )}
      </main>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Add Link</h2>
            <form onSubmit={handleAdd}>
              <label>URL<input name="url" type="url" required /></label>
              <label>Title<input name="title" /></label>
              <label>Description<textarea name="description" rows="3"></textarea></label>
              <label>Tags<input name="tags" placeholder="comma,separated" /></label>
              <div className="modal-actions">
                <button className="btn" type="submit">Add</button>
                <button type="button" className="btn ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
