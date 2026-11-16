import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

const Layout = (props: { titulo: string; children: any }) => (
  <html lang='pt-BR'>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{props.titulo}</title>
    </head>
    <body>{props.children}</body>
  </html>
)

app.use('/api/admin/*', async (c, next) => {
  const token = c.req.header('Authorization')
  if (token !== `Bearer ${c.env.ADMIN_TOKEN}` || !c.env.ADMIN_TOKEN){
    return c.json({ erro: 'Token invalido'}, 401)
  }
  await next()
})

app.get('/', async (c) => {
  const mangas = (await c.env.DB.prepare('SELECT * FROM mangas ORDER by title').all<{ slug: string; title: string}>()).results
  return c.html(<Layout titulo="Mangas">
    <ul>{mangas.map((m) => <li><a href={'/manga/' + m.slug}>{m.title}</a></li>)}</ul>
  </Layout>)
})

app.get('/manga/:slug', async (c) => {
  const slug = c.req.param('slug')
  const manga = await c.env.DB.prepare('SELECT * FROM mangas where slug = ?').bind(slug).first<{ title: string; id:number}>()
  if (!manga){
    return c.html(
      <Layout titulo='Manga nao encontrado'><h1>Erro 404</h1></Layout>
    , 404)
  }
  const chapters = (await c.env.DB.prepare('SELECT * from chapters where manga_id = ? ORDER BY cap DESC').bind(manga.id).all()).results
  return c.html(
    <Layout titulo={manga.title}>
      <h1>{manga.title}</h1>
      <ul>{chapters.map((ch) => <li><a href={`/manga/${slug}/ler/${ch.cap}`}>{`Capítulo ${ch.cap}`}</a></li>)}</ul>
    </Layout>
  )
})

app.get('/img/*', async (c) => {
  const chave = c.req.path.replace('/img/', '')
  const obj = await c.env.IMAGES.get(chave)
  if (!obj){ return c.html(
      <Layout titulo='Pagina nao encontrada'><h1>Erro 404</h1></Layout>
    , 404)}
  return new Response(obj.body, {
    headers: { 'Content-Type': obj.httpMetadata?.contentType ?? 'application/octet-stream' },
  })
})

app.post('/api/admin/mangas', async (c) => {
  const body = await c.req.json()
  if (typeof body.slug !== 'string' || typeof body.title !== 'string' || body.slug.trim() === '' || body.title.trim() === ''){
    return c.json({ erro: 'Algum campo vazio'}, 400)
  }
  try{
    const manga = await c.env.DB.prepare('INSERT INTO mangas (slug, title) VALUES (?, ?) RETURNING *').bind(body.slug, body.title).first()
    return c.json({msg: 'manga criado com sucesso', manga: manga}, 201)
  }
  catch (error: any){
    const mensagemErro = error?.message || ""
    if (mensagemErro.includes('SQLITE_CONSTRAINT_UNIQUE')){
      return c.json({erro: 'Ja existe um manga com esse nome cadastrado'}, 409)
    }

    return c.json({msg: 'nao foi possivel enviar o manga'}, 500)
  }
})

app.post('/api/admin/chapters', async (c) => {
  const body = await c.req.json()
  if (typeof body.slug !== 'string' || body.slug.trim() === '' || !Number.isFinite(body.cap) || (!!body.title && typeof body.title !== 'string')){
    return c.json({ erro: 'Algum campo vazio ou com tipo errado'}, 400)
  }
  const manga = await c.env.DB.prepare('SELECT * FROM mangas where slug = ?').bind(body.slug).first()
  if (!manga){
    return c.json({ erro: 'O manga nao existe'}, 404)
  }
  try {
    const cap = await c.env.DB.prepare('INSERT INTO chapters (manga_id, cap, title) VALUES (?, ?, ?) RETURNING *').bind(manga.id, body.cap, body.title?.trim() || null).first<{ id: number}>()
    return c.json({ msg: 'capitulo criado com sucesso', cap: cap}, 201)
  }
  catch (error: any){
    const mensagemErro = error?.message || ""
    if (mensagemErro.includes('SQLITE_CONSTRAINT_UNIQUE')){
      return c.json({erro: 'Capitulo ja foi cadastrado'}, 409)
    }
    return c.json({msg: 'nao foi possivel cadastrar o capitulo'}, 500)
  }
})


export default app