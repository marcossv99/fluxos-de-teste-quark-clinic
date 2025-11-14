/**
 * fluxo 4: envio de comprovante
 */

describe("Fluxo de envio de comprovante", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fazerLogin("thomas-pereira91@profemme.com.br", "Um5iajo2Ji");
    cy.agendarConsulta();
  });

  it("Deve enviar comprovante de agendamento com sucesso", () => {
    cy.get('[data-cy="finalizacao-btn-transferencia"]', { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.get('[data-cy="pagamento-form"]', { timeout: 15000 }).should(
      "be.visible",
    );

    const caminhoComprovante = "cypress/fixtures/comprovante.png";
    cy.get('#comprovante[type="file"]').selectFile(caminhoComprovante, {
      force: true,
    });

    cy.get('[data-cy="pagamento-form-textarea-observacao"]').type(
      "Comprovante de teste automatizado",
    );

    cy.intercept("POST", "**/comprovante").as("postComprovante");

    cy.get('[data-cy="pagamento-form-btn-enviar"]').click();

    cy.wait("@postComprovante", { timeout: 20000 })
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    cy.contains(/obrigado|sucesso|enviado/i, { timeout: 15000 }).should(
      "be.visible",
    );
  });
});
