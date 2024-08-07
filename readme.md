# desafio-noleak

---

## rodando

### live

<https://desafio-noleak-mkvlrn.vercel.app/>

### local

**requisitos**:

- node 20+, desenvolvido com node 20.16 lts
- yarn 1, desenvolvido com yarn 1.22.22
- algum ambiente linux (não testei no windows)
- credenciais vercel kv e vercel blob (mais detalhes abaixo)

**dependências**:

```sh
yarn install
```

**variáveis de ambiente**:

copie o arquivo `.env.example` para `.env.local` e preencha com as credenciais do vercel

```sh
cp .env.example .env.local
```

**execução**:

```sh
yarn dev
```

a aplicação estará disponível em `localhost:3000`

---

## tech

- typescript
- nextjs
- mantine [mantine.dev](https://mantine.dev/)
- node-canvas [github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas)
- redis (vercel kv) [vercel.com/docs/storage/vercel-kv](https://vercel.com/docs/storage/vercel-kv)
- static storage (vercel blob) [vercel.com/docs/storage/vercel-blob](https://vercel.com/docs/storage/vercel-blob)

---

## o desenvolvimento

como não havia instruções muito detalhadas no texto do desafio, tomei algumas liberdades em questão de design e implementação

usei mantine pra criar a UI porque tenho experiência com a lib e ela é magnífica

em questão de persistência, optei por não salvar as imagens geradas localmente, usando o vercel blob pra armazená-las e o vercel kv pra salvar os links
