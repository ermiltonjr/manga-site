/* const req = await fetch('http://localhost:8787/api/admin/mangas', {
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

console.log(req5.status, await req5.json()) */

const cap1 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste', cap: 3, title: 'O retorno'}),
})

console.log(cap1.status, await cap1.json())

const cap2 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste', cap: 3, title: 'O retorno'}),
})

console.log(cap2.status, await cap2.json())

const cap3 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'nao-existe', cap: 3, title: 'O retorno'}),
})

console.log(cap3.status, await cap3.json())

const cap4 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste', cap: "4", title: 'O retorno'}),
})

console.log(cap4.status, await cap4.json())

const cap5 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste', cap: 4}),
})

console.log(cap5.status, await cap5.json())

const cap6 = await fetch('http://localhost:8787/api/admin/chapters', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${Bun.env.ADMIN_TOKEN}`},
    body: JSON.stringify({slug: 'teste', cap: 5, title: 123}),
})

console.log(cap6.status, await cap6.json())