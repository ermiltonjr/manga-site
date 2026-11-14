# Manga Site

Site para leitura de manhwas, feito com o objetivo de aprender desenvolvimento serverless com o framework Hono e Cloudflare Workers.

## Tecnologias

- [Hono](https://hono.dev): framework web, com páginas geradas no servidor via JSX
- [Cloudflare Workers](https://developers.cloudflare.com/workers/): onde o código roda
- [Cloudflare D1](https://developers.cloudflare.com/d1/): banco de dados (SQLite)
- [Bun](https://bun.sh): gerenciador de pacotes

## Como rodar localmente

Pré-requisito: [Bun](https://bun.sh) instalado.

```bash
# 1. Instalar as dependências
bun install

# 2. Criar as tabelas no banco local
bunx wrangler d1 execute manga-db --local --file=schema.sql

# 3. Subir o servidor
bun run dev
```

O site fica disponível em `http://localhost:8787`.

O banco local começa vazio. Para ter algo na tela, insira um mangá de teste:

```bash
bunx wrangler d1 execute manga-db --local --command="INSERT INTO mangas (slug, title) VALUES ('teste', 'Mangá Teste')"
```

## Estrutura

```
src/index.tsx    rotas e páginas
schema.sql       tabelas do banco (mangas, chapters, pages)
wrangler.jsonc   configuração do Worker e dos bindings
```

## Status

- [x] Projeto Hono rodando no Cloudflare Workers
- [x] Schema do banco no D1
- [x] Página inicial com a lista de mangás
- [x] Página do mangá com a lista de capítulos
- [ ] Armazenamento das imagens no R2
- [ ] Upload de capítulos
- [ ] Leitor com carregamento prioritário e lazy loading
- [ ] Deploy
