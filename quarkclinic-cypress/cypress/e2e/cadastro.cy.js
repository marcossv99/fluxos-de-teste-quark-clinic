import { gerarCPFValido, gerarDados } from "../support/utils";

describe("Fluxo de Cadastro de Usuário", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("Deve cadastrar um novo usuário com sucesso", () => {
    const usuario = gerarDados();

    cy.get('[data-cy="btn-cadastro"]').should("be.visible").click();

    cy.get(".modal-dialog:visible", { timeout: 10000 }).should("be.visible");

    cy.get('[data-cy="campo-nome-input"]:visible').type(usuario.nome);
    cy.get('[data-cy="campo-telefone-input"]:visible').type("11999999999");
    cy.get('[data-cy="campo-sexo-select"]:visible').select("MASCULINO");
    cy.get('[data-cy="campo-data-nascimento-input"]:visible').type(
      "10/10/1990",
    );
    cy.get('[data-cy="campo-email-input"]:visible').type(usuario.email);

    cy.get('[data-cy="campo-tipo-documento-select"]:visible').select("CPF");
    cy.get('[data-cy="campo-numero-documento-input"]:visible').type(
      gerarCPFValido(),
    );

    cy.get('[data-cy="campo-senha-input"]:visible').type(usuario.senha);
    cy.get('[data-cy="campo-confirmar-senha-input"]:visible').type(
      usuario.senha,
    );

    cy.get("#cb-cadastro").check({ force: true });

    cy.intercept("POST", "**/api/social/usuarios").as("postCadastro");

    cy.get('[data-cy="btn-criar-conta"]').click({ force: true });

    cy.wait("@postCadastro")
      .its("response.statusCode")
      .should((status) => {
        expect([200, 201]).to.include(status);
      });
  });
});
