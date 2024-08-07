# desafio-noleak

---

## rodando

### no ar

<https://desafio-noleak-mkvlrn.vercel.app/>

### local

**requisitos**:

- node 20+, desenvolvido com 20.16 lts
- yarn 1, desenvolvido com 1.22.22
- docker, desenvolvido com 26.1.5-ce, build 411e817ddf71
- docker-compose, desenvolvido com 2.29.1
- algum ambiente linux (não testei no windows)

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
docker-compose up -d
yarn dev
```

a aplicação estará disponível em `localhost:3000`

---

## tech

- typescript
- nextjs
- mantine [mantine.dev](https://mantine.dev/)
- node-canvas [github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas)
- redis (upstash) [upstash.com](https://upstash.com/)
- aws s3
- docker (em dev)

---

## o desenvolvimento

como não havia instruções muito detalhadas no texto do desafio, tomei algumas liberdades em questão de design e implementação

usei mantine pra criar a UI porque tenho experiência com a lib e ela é magnífica

em questão de persistência, optei por não salvar as imagens geradas localmente, usando o s3 pra armazená-las, e usando o redis (via upstash) pra salvar os links

redis e s3 rodam localmente em containers, com todas as variáveis de ambiente configuradas para uso local já em `.env.example`

---

## o que faltou

**testes:**

sei que deveria criar testes, tenho experiência e conhecimento usando vitest e testing-library, mas uma semana não é muito tempo para isso, caso seja feito corretamente

**ci/cd:**

também tenho experiência com github actions (está configurado em todos os meus templates), mas nextjs eu geralmente faço deploy direto com `vercel`
