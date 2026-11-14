import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/mangas', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM mangas ORDER by title').all()
  return c.json(result)
})

app.get('/api/mangas/:slug', async (c) => {
  const nome = c.req.param('slug')
  const manga = await c.env.DB.prepare('SELECT * FROM mangas where title = ?').bind(nome).first()
  if (!manga){
    return c.json({erro: 'Tarefa nao encontrada'}, 404)
  }
  const chapters = await c.env.DB.prepare('SELECT * from chapters where manga_id = ? ORDER BY cap DESC').bind(manga.id).all()
  return c.json(manga), c.json(chapters)
})

export default app