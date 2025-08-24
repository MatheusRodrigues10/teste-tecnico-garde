# Teste Técnico Garde - Desenvolvedor Fullstack

Aplicação para busca de Unidades Básicas de Saúde (UBS) próximas ao usuário, desenvolvida com Node.js no backend e React Native (Expo) no frontend.

## Funcionalidades

- **Autenticação JWT**: Sistema completo de login e cadastro
- **Cadastro de Usuários**: Com validação de email e senha
- **Busca de UBS**: Lista unidades de saúde ordenadas por proximidade
- **Detalhes da UBS**: Informações completas de cada unidade
- **Geolocalização**: Cálculo de distância baseado no CEP do usuário

## Tecnologias Utilizadas

### Backend

- **Node.js**: v18+
- **Express**: ^5.1.0
- **Mongoose**: ^8.18.0
- **JWT**: ^9.0.2 (autenticação)
- **bcryptjs**: ^3.0.2 (criptografia de senhas)
- **Axios**: ^1.11.0 (requisições HTTP)
- **CORS**: ^2.8.5

### Frontend

- **React Native**: 0.79.5
- **Expo**: ~53.0.20
- **React Navigation**: ^7.1.17
- **Redux Toolkit**: ^2.8.2
- **Axios**: ^1.11.0
- **TypeScript**: ~5.8.3

## Estrutura do Projeto

```
teste-tecnico-garde/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── config/         # Configuração do banco
│   │   ├── controllers/    # Controladores da API
│   │   ├── middlewares/    # Middlewares (auth)
│   │   ├── models/         # Modelos do MongoDB
│   │   ├── routes/         # Rotas da API
│   │   └── utils/          # Utilitários (geocoding, distância)
│   └── server.js           # Servidor principal
└── frontend/               # App React Native
    ├── src/
    │   ├── components/     # Componentes reutilizáveis
    │   ├── navigation/     # Configuração de navegação
    │   ├── redux/          # Gerenciamento de estado
    │   ├── screens/        # Telas da aplicação
    │   ├── services/       # Serviços de API
    │   ├── types/          # Tipos TypeScript
    │   └── utils/          # Utilitários
    └── App.tsx             # Componente principal
```

## Instalação e Configuração

### Pré-requisitos

- Node.js v18 ou superior
- MongoDB instalado e rodando
- Expo CLI instalado globalmente: `npm install -g @expo/cli`

### Backend

1. **Clone o repositório**

```bash
git clone https://github.com/MatheusRodrigues10/teste-tecnico-garde
cd teste-tecnico-garde/backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do backend:

```env
MONGO_URI=mongodb://localhost:27017/ubs-app
JWT_SECRET=sua-chave-secreta-jwt
OPENCAGE_API_KEY=sua-chave-opencage
PORT=5000
```

4. **Execute o servidor**

```bash
npm start
```

O backend estará rodando em `http://localhost:5000`

### Frontend

1. **Navegue para o diretório frontend**

```bash
cd ../frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure a URL da API**
   Edite o arquivo `src/services/api.ts` e altere a `baseURL` para a URL do seu backend.

   **Para desenvolvimento com Expo no celular físico:**

   Se você estiver testando no celular físico, o backend precisa estar acessível via internet. Use o ngrok:

   ```bash
   # Instale o ngrok globalmente
   npm install -g ngrok

   # Com o backend rodando na porta 5000, execute:
   ngrok http 5000
   ```

   O ngrok fornecerá uma URL pública (ex: `https://abc123.ngrok.io`). Use essa URL no arquivo `src/services/api.ts`:

   ```typescript
   const api = axios.create({
     baseURL: "https://abc123.ngrok.io/api",
   });
   ```

4. **Execute o app**

```bash
npm start
```

5. **Acesse no dispositivo**

- Use o Expo Go no seu celular
- Escaneie o QR Code que aparecerá no terminal
- Ou use um emulador Android/iOS

## Configuração das APIs

### Ngrok para Desenvolvimento

Para testar a aplicação no celular físico com Expo, você precisa expor seu backend local para a internet:

1. **Instale o ngrok:**

   ```bash
   npm install -g ngrok
   ```

2. **Execute o ngrok:**

   ```bash
   # Com o backend rodando na porta 5000
   ngrok http 5000
   ```

3. **Configure a URL no frontend:**

   - Copie a URL HTTPS fornecida pelo ngrok (ex: `https://abc123.ngrok.io`)
   - Edite `frontend/src/services/api.ts`:

   ```typescript
   const api = axios.create({
     baseURL: "https://abc123.ngrok.io/api",
   });
   ```

4. **Importante:**
   - A URL do ngrok muda a cada reinicialização (versão gratuita)
   - Para desenvolvimento contínuo, considere usar a versão paga do ngrok
   - Ou use serviços como Heroku, Railway ou Render para deploy do backend

### Alternativas ao Ngrok

Se preferir não usar ngrok, você pode:

1. **Deploy do Backend:**

   - **Heroku**: Deploy gratuito disponível
   - **Railway**: Deploy simples e rápido
   - **Render**: Deploy gratuito com sleep após inatividade
   - **Vercel**: Para APIs serverless

2. **Desenvolvimento Local:**
   - Use emulador Android/iOS (não precisa de ngrok)
   - Use o mesmo Wi-Fi para celular e computador
   - Configure o IP local no lugar de localhost

### OpenCage Geocoding

Para o cálculo de coordenadas a partir do CEP, você precisa de uma chave da OpenCage:

1. Acesse [opencagedata.com](https://opencagedata.com)
2. Crie uma conta gratuita
3. Obtenha sua API key
4. Adicione no arquivo `.env` do backend

## Como Usar

1. **Cadastro**: Crie uma conta com nome, email, senha e CEP
2. **Login**: Faça login com email e senha
3. **Buscar UBS**: Visualize as unidades de saúde mais próximas
4. **Detalhes**: Toque em uma UBS para ver informações completas
5. **Perfil**: Acesse suas informações e faça logout

## Funcionalidades Técnicas

### Autenticação JWT

- Tokens com expiração de 1 hora
- Middleware de proteção de rotas
- Armazenamento seguro no AsyncStorage

### Busca de UBS

- Integração com Overpass API (OpenStreetMap)
- Cálculo de distância em linha reta
- Ordenação por proximidade
- Filtro de até 50km de distância

### Validações

- Email válido
- Senha com mínimo 6 caracteres
- CEP formatado automaticamente
- Campos obrigatórios

## Deploy

### Backend

- Configure as variáveis de ambiente no servidor
- Use PM2 ou similar para manter o processo ativo
- Configure um proxy reverso (nginx) se necessário

### Frontend

- Build para produção: `expo build`
- Publique no Expo: `expo publish`
- Ou gere APK/IPA: `expo build:android` / `expo build:ios`

## Versões Utilizadas

- **Node.js**: v18+
- **React Native**: 0.79.5
- **Expo**: ~53.0.20
- **Express**: ^5.1.0
- **MongoDB**: ^8.18.0
- **TypeScript**: ~5.8.3


