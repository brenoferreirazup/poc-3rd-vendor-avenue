# Passo a passo

Instalar pacotes

```sh
    npm install
```

Configurar arquivo `.env`

```
    API_KEY=''
    CLIENT_ID=''
    CLIENT_SECRET=''
    CLIENT_EMAIL=''
```

Executar respota pelo serviço http

```sh
    npm run start:web
```

```sh
    curl --location --request GET 'http://localhost:3333/avenue/all-api-requests'
```

Executar resposta somente pelo terminal

```sh
    npm run start:cli
```