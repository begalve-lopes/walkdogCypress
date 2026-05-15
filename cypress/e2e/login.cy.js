import { generate } from "gerador-validador-cpf";

import { LoginPage } from "../support/pages/loginPage";

describe("Walkdog Login", () => {
  context("Login quando o usuário tem cadastro", () => {
    it("Deve fazer login com sucesso", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const user = {
        name: "João da Silva",
        email: "joao.silva@example.com",
        cpf: generate(),
        numero: "123",
        complemento: "casa",
        url: "cypress/fixtures/carta.png",Elísio
      };

      loginPage.formUser(user.cpf, user.name, user.email);
      loginPage.formEndereco(user.numero, user.complemento);
      loginPage.formActividade(user.url);
      loginPage.submit();

      loginPage.shouldValidateMessage(
        "Recebemos o seu cadastro e em breve retornaremos o contato.",
      );
    });
  });

  context("Login quando o CEP estiver vázio", () => {
    it("Deve exibir mensagem de erro ao informar CEP  é inválido", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const validetedUser = [
        "Informe o seu nome completo",
        "Informe o seu melhor email",
        "Informe o seu CPF",
        "Informe o seu CEP",
        "Informe um número maior que zero",
        "Adcione um documento com foto (RG ou CHN)",
      ];

      const user = {
        name: "João da Silva",
        email: "joao.silva@example.com",
        cpf: generate(),
        cep: "112222",
      };

      loginPage.formUser(user.cpf, user.name, user.email);

      loginPage.formEnderecoErrado(user.cep);
      loginPage.shouldDisplayErrorMessage("Informe um CEP válido");
    });
  });

  context("Login quando o CEP estiver vázio", () => {
    it("Deve exibir mensagem de erro ao informar CEP  é inválido", () => {
      const loginPage = new LoginPage();
      loginPage.open();
      const validetedUsers = [
        "Informe o seu nome completo",
        "Informe o seu melhor email",
        "Informe o seu CPF",
        "Informe o seu CEP",
        "Informe um número maior que zero",
        "Adcione um documento com foto (RG ou CHN)",
      ];

      const user = {
        name: "",
        email: "",
        cpf: "",
        numero: "",
        cep: "",
        url: "",
      };

      loginPage.formUser(user.cpf, user.name, user.email);
      loginPage.formActividade(user.url);
      loginPage.formEnderecoErrado(user.cep, user.numero, user.complemento);
      loginPage.submit();

      validetedUsers.forEach((mensagem) => {
        loginPage.shouldDisplayErrorMessage(mensagem);
      });
    });
  });
});
