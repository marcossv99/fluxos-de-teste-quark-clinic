# Teste E2E - Quark Clinic (Desafio Técnico QA)

Este projeto contém a automação de testes end-to-end para a plataforma Quark Clinic.

## Tecnologias Utilizadas

- [Cypress 15.4.0](https://www.cypress.io/)
- Node.js v22.15.0

## Estrutura do Projeto

```
quarkclinic-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.cy.js
│   │   ├── login.cy.js
│   │   ├── agendamento.cy.js
│   │   └── comprovante.cy.js
│   │
│   ├── fixtures/
│   │   └── comprovante.png
│   │
│   └── support/
│       ├── commands.js
│       ├── utils.js
│       └── e2e.js
│
└── cypress.config.js
```

## Instalação e Execução

```bash
# Clonar o projeto
git clone https://github.com/marcossv99/fluxos-de-teste-quark-clinic.git
cd fluxos-de-teste-quark-clinic/quarkclinic-cypress

# Instalar dependências
npm install

# Executar os testes (modo headless)
npx cypress run

# Ou abrir a interface gráfica
npx cypress open
```


