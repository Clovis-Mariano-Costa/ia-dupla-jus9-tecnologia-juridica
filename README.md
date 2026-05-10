# Jus 9 Tecnologia Jurídica — IA dupla inicial

Este pacote cria uma primeira versão funcional da IA da Jus 9 Tecnologia Jurídica com dois modos:

1. `estudantes` — IA externa, pública, educativa, principalmente para estudantes.
2. `mvp` — IA jurídica interna do MVP, técnica, voltada a apoio profissional supervisionado.

## Arquivos

- `functions/api/ia.js` — função server-side para Cloudflare Pages Functions.
- `ia-estudantes.html` — tela simples para testar a IA externa.
- `ia-mvp.html` — tela simples para testar a IA jurídica do MVP.

## Onde colocar

Copie estes arquivos para a raiz do repositório da Jus 9 Tecnologia Jurídica ou para o repositório do ambiente em que deseja testar.

A estrutura final deve ficar assim:

```txt
functions/api/ia.js
ia-estudantes.html
ia-mvp.html
```

Depois faça commit e deploy pela Cloudflare Pages.

## Variáveis necessárias na Cloudflare

No projeto da Cloudflare Pages, configure:

```txt
OPENAI_API_KEY = sua_chave_da_OpenAI
```

Variáveis opcionais:

```txt
JUS9_MODEL_DEFAULT = gpt-5.5
JUS9_MODEL_ESTUDANTES = gpt-5.5
JUS9_MODEL_MVP = gpt-5.5
```

## Teste no navegador

Depois do deploy, acesse:

```txt
/ia-estudantes.html
/ia-mvp.html
```

## Atenção de segurança

A página `ia-mvp.html` não deve ficar aberta publicamente em produção sem autenticação.
Para evento e demonstração rápida, pode ser usada como protótipo controlado.
Para produção, proteger com login, Cloudflare Access ou autenticação própria do MVP.

## Teste direto da API

POST para `/api/ia`:

```json
{
  "mode": "estudantes",
  "message": "Explique o que é tecnologia jurídica para um estudante."
}
```

ou:

```json
{
  "mode": "mvp",
  "message": "Monte um checklist para abertura de DAJ."
}
```
