# TRB Disparos WhatsApp

Aqui estão os arquivos base para o seu aplicativo de disparos!

## Estrutura
- **trb-backend**: O motor da aplicação (Node.js). Você deve colocar esta pasta em um repositório GitHub e subir no Render.
- **trb-frontend**: A interface do usuário (React + Vite). Você deve colocar esta pasta em um repositório GitHub e subir na Vercel.

## Passos Rápidos
1. Extraia este arquivo ZIP.
2. Crie dois repositórios no GitHub (ex: `trb-meu-backend` e `trb-meu-frontend`).
3. Faça o upload do conteúdo da pasta `trb-backend` para o repositório do backend.
4. Faça o upload do conteúdo da pasta `trb-frontend` para o repositório do frontend.
5. Conecte o repositório do backend no Render (adicione as variáveis de ambiente WHATSAPP_TOKEN e PHONE_NUMBER_ID).
6. Copie a URL gerada pelo Render, vá no arquivo `trb-frontend/src/App.jsx` e troque a variável `API_URL` pela URL do Render.
7. Suba a alteração do frontend para o GitHub e conecte o repositório na Vercel.
