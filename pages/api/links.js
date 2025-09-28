let LINKS = [
  {
    id: '1',
    title: 'Next.js',
    url: 'https://nextjs.org',
    description: 'React framework',
    tags: ['react','framework'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Vercel',
    url: 'https://vercel.com',
    description: 'Deploy frontend apps',
    tags: ['hosting','deploy'],
    createdAt: new Date().toISOString()
  }
]

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json([...LINKS].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)))
    return
  }
  if (req.method === 'POST') {
    const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}')
    if (!body.url) {
      res.status(400).json({ error: 'url required' })
      return
    }
    const newLink = {
      id: generateId(),
      title: body.title || '',
      url: body.url,
      description: body.description || '',
      tags: Array.isArray(body.tags) ? body.tags : [],
      createdAt: new Date().toISOString()
    }
    LINKS.unshift(newLink)
    res.status(201).json(newLink)
    return
  }
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end()
}
