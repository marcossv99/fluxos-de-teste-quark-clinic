/**
 * preenche o form de cadastro de usuário com dados aleatórios
 * usa o objeto usuario gerado pela função gerarDados em utils.js
 */
Cypress.Commands.add("preencherFormularioCadastro", (usuario) => {
  cy.get('input[name="nome"]').type(usuario.nome);
  cy.get('input[name="telefone"]').type(usuario.telefone);
  cy.get('select[name="genero"]').select(usuario.genero);
  cy.get('input[name="dataNascimento"]').type(usuario.dataNascimento);
  cy.get('input[name="email"]').type(usuario.email);
  cy.get('select[name="tipoDocumento"]').select(usuario.tipoDocumento);
  cy.get('input[name="numeroDocumento"]').type(usuario.numeroDocumento);
  cy.get('input[name="senha"]').type(usuario.senha);
  cy.get('input[name="confirmarSenha"]').type(usuario.senha);
  cy.get('input[type="checkbox"]').check();
});

/**
 * comando para fazer login de um usuário existente
 */
Cypress.Commands.add("fazerLogin", (email, senha) => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-cy="btn-login"]').length) {
      cy.get('[data-cy="btn-login"]').click({ force: true });
    } else {
      cy.contains("Login", { matchCase: false }).click({ force: true });
    }
  });

  cy.get('[data-cy="modal-login-conteudo"]', { timeout: 10000 }).should(
    "be.visible",
  );

  cy.get('[data-cy="campo-usuario-input"]:visible')
    .should("be.visible")
    .clear()
    .type(email, { force: true });

  cy.get('[data-cy="campo-senha-input"]:visible')
    .should("be.visible")
    .clear()
    .type(senha, { force: true });

  cy.get('[data-cy="checkbox-aceita-politicas"] input').check({ force: true });

  cy.intercept("POST", "**/login").as("postLogin");

  cy.get('[data-cy="btn-submit-login"]').click({ force: true });

  cy.wait("@postLogin")
    .its("response.statusCode")
    .should((status) => {
      expect([200, 201]).to.include(status);
    });

  cy.get('[data-cy="btn-login"]').should("not.exist");
});

/**
 * comando para agendar uma consulta presencial completa
 * retorna para a home após concluir o agendamento
 */
Cypress.Commands.add("agendarConsulta", () => {
  cy.get('[data-cy="btn-consulta-presencial"]').click();

  cy.get('[data-cy="agendamento-container"]', { timeout: 15000 }).should(
    "be.visible",
  );

  cy.get('[data-cy="convenio-radio-148"]').check({ force: true });

  cy.get('[data-cy^="agenda-main-header"]', { timeout: 20000 })
    .first()
    .scrollIntoView()
    .click({ force: true });

  cy.get('[data-cy^="agenda-item-horario-texto"]', { timeout: 20000 })
    .first()
    .scrollIntoView()
    .click({ force: true });

  cy.get('[data-cy="pacientes-list-row"]', { timeout: 15000 }).should(
    "be.visible",
  );

  cy.get('[data-cy="paciente-card-radio-input"]')
    .first()
    .check({ force: true });

  cy.get('[data-cy="confirmacao-btn-confirmar"]', { timeout: 30000 })
    .should("be.visible")
    .scrollIntoView()
    .click();

  cy.get('[data-cy="finalizacao-msg-sucesso"]', { timeout: 20000 }).should(
    "contain.text",
    "Agendamento efetuado com Sucesso",
  );
});
