# Testes automatizados CAC-TAT

## Pre-requisitos

- Como pre-requisito precisa ter instalado na sua máquina o node e npm para instalar a biblioteca cypress

## Instalação do Node e Cypress

### - Instale o NVM para usar diferentes versões do NODE

https://github.com/coreybutler/nvm-windows/releases

### - Instalar NODE com NVM

`nvm install 16.16.6`

### - Verificar se o NODE e NPM estão instalados corretamente na sua máquina

`node -v && npm -v`

### - Crie um arquivo package.json para configurar o projeto e verificar dependências

`npx init -y` 

### - Instale o Cypress no seu projeto de forma local

`npx install cypress@13.3.0 --save-dev`

obs: caso queira usar typescript ao inves de javascript veja nas configurações extra

### - Em seguida verifique se foi instalado corretamente

`npx cypress -v`

## Configurações extra

### - Caso queira usar typescript ao inves de javascript

> - instale o typescript no projeto `npx install typescript --save-dev`
> - crie um arquivo chamado `tsconfig.json` e dentro do arquivo coloque as configurações do typescript conforme abaixo.
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```
> - Atualize o arquivo `cypress.config.ts`:
```
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,

  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
```
obs: caso não tenha crie o arquivo `cypress.config.ts`

## Inicialização do projeto

1 - Antes de iniciar o projeto é necessario modificar o `script` do arquivo `package.json`

```json
"scripts": {
  "cy:open": "cypress open",
  "test": "cypress run"
},
```

2 - Por fim, no terminal, na raiz do projeto, execute o comando `npx cypress open` para abrir a interface e `npx cypress run` para rodar os testes no proprio terminal