/**
 * fluxo 3: agendamento de consulta
 */

describe("Fluxo de agendamento", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fazerLogin("thomas-pereira91@profemme.com.br", "Um5iajo2Ji");
  });

  it("deve agendar uma consulta presencial", () => {
    cy.agendarConsulta();
  });
});
