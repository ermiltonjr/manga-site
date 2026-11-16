const req = await fetch('http://localhost:8787/api/admin/mangas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({slug: 'teste3', title: 'Manga de Teste 3'}),
})

console.log(req.status, await req.json())

const req2 = await fetch('http://localhost:8787/api/admin/mangas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'tokenerrado'},
    body: JSON.stringify({slug: 'teste3', title: 'Manga de Teste 3'}),
})

console.log(req2.status, await req2.json())

const req3 = await fetch('http://localhost:8787/api/admin/mangas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste3', title: 'Manga de Teste 3'}),
})

console.log(req3.status, await req3.json())

const req4 = await fetch('http://localhost:8787/api/admin/mangas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste3', title: 'Manga de Teste 3'}),
})

console.log(req4.status, await req4.json())

const req5 = await fetch('http://localhost:8787/api/admin/mangas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste4'}),
})

console.log(req5.status, await req5.json())