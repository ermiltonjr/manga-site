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
    headers: { 'Content-Type': `${obj.httpMetadata?.contentType}` },
  })
})

export default app