/**
 * fluxo 2: login de usuário existente
 */

describe("Fluxo de Login de Usuário", () => {
  const usuario = {
    email: "thomas-pereira91@profemme.com.br",
    senha: "Um5iajo2Ji",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("Deve fazer login com um usuário existente", () => {
    cy.fazerLogin(usuario.email, usuario.senha);
  });
});
