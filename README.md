# users-auth-api
[![Build Status](https://travis-ci.com/dalvorsn/users-auth-api.svg?token=yAkDoUWH2i72EsLf99Wx&branch=master)](https://travis-ci.com/dalvorsn/users-auth-api) [![Coverage Status](https://coveralls.io/repos/github/dalvorsn/users-auth-api/badge.svg?branch=master&t=6QOWSp)](https://coveralls.io/github/dalvorsn/users-auth-api?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Instalação

Instalar dependencias através do comando npm install.
Configurar variaveis de ambiente, de acordo com o formato de .env.sample.

Para configuração do travis CI e coveralls é necessário possui conta em ambos, e configurar as seguintes variaveis de ambiente no build do travis:

- COVERALLS_REPO_TOKEN (gerado em coveralls.io)
- COVERALLS_SERVICE_NAME ('travis' para repositorios públicos e 'travis-pro' para privados)
- JWT_SECRET_KEY

Opcionalmente a instancia do mongoDB pode ser feita localmente através do docker-compose (https://docs.docker.com/compose/install/):

```
docker-compose up -d mongodb
```

## Execução de testes

```
npm run test
```

## Execução em localhost (nodemon)

```
npm run dev
```

## Consumo do serviço

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/14051062/TW6xp8ze)

