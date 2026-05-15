import cep from "cep-promise";

export class LoginPage {
  open() {
    cy.visit("/");
    cy.url().should("include", "/signup");
  }

  formUser(cpf, nome, email) {
    if (nome) cy.get('[placeholder="Nome completo"]').type(nome);
    if (email) cy.get('[placeholder="E-mail"]').type(email);
    if (cpf) cy.get('[placeholder="CPF somente números"]').type(cpf);
  }

  formEndereco(numero, complemento) {
    cep("01001000").then((response) => {
      cy.get('[placeholder="CEP"]').clear().type(response.cep);
    });

    cy.get('[value="Buscar CEP"]').click();

    cy.get('[placeholder="Número"]').type(numero);

    cy.get('[placeholder="Complemento"]').type(complemento);
  }

  formEnderecoErrado(cep, numero, complemento) {
    cy.get('[placeholder="CEP"]').clear();

    if (cep) {
      cy.get('[placeholder="CEP"]').type(cep);
    }

    cy.get('[value="Buscar CEP"]').click();

    if (numero && complemento) {
      cy.get('[placeholder="Número"]').type(numero);

      cy.get('[placeholder="Complemento"]').type(complemento);
    }
  }

  formActividade(url) {
    cy.selecionarServicoAleatorio();
    if (url) {
      cy.get('[type="file"]').selectFile(url, { force: true });
    }
  }

  submit() {
    cy.get('[type="submit"]').click();
  }

  shouldValidateMessage(message) {
    cy.get("#swal2-html-container")
      .should("be.visible")
      .and("contain", message);
  }

  shouldDisplayErrorMessage(message) {
    cy.get(".alert-error").should("be.visible").and("contain", message);
  }
}
