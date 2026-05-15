import { generate } from "gerador-validador-cpf";

import { LoginPage } from "../support/pages/loginPage";
import cep from "cep-promise";

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
        url: "cypress/fixtures/carta.png",
        cep: "99042-610",
      };

      loginPage.formUser(user.cpf, user.name, user.email);
      loginPage.formEndereco(user.cep, user.numero, user.complemento);
      loginPage.formActividade(user.url);
      loginPage.submit();

      loginPage.shouldValidateMessage(
        "Recebemos o seu cadastro e em breve retornaremos o contato.",
      );
    });
  });

  context("Login quando não informa o email válido", () => {
    it("Deve exibir mensagem de erro ao informar email é inválido", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const user = {
        name: "João da Silva",
        email: "www.gamil.com",
        cpf: generate(),
        numero: "123",
        complemento: "casa",
        url: "cypress/fixtures/carta.png",
        cep: "99042-610",
      };
      loginPage.formUser(user.cpf, user.name, user.email);
      loginPage.formEndereco(user.cep, user.numero, user.complemento);
      loginPage.formActividade(user.url);
      loginPage.submit();
      loginPage.shouldDisplayErrorMessage("Informe um email válido");
    });
  });

  context("Login quando não informa o cep válido", () => {
    it("Deve exibir mensagem de erro ao informar cep é inválido", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const user = {
        name: "João da Silva",
        email: "joao.silva@example.com",
        cpf: "537.553.680-30",
        numero: "123",
        complemento: "casa",
        url: "cypress/fixtures/carta.png",
        cep: "99042-610",
      };
      loginPage.formUser(user.cpf, user.name, user.email);
      loginPage.formEndereco(user.cep, user.numero, user.complemento);
      loginPage.formActividade(user.url);
      loginPage.submit();
      loginPage.shouldDisplayErrorMessage("CPF inválido");
    });
  });

  context("Erro quando o CEP não é válido", () => {
    it("Deve exibir mensagem de erro ao co campo do cep quando estiver errado", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const user = {
        name: "João da Silva",
        email: "joao.silva@example.com",
        cpf: generate(),
        cep: "112222",
        numero: "123",
      };

      loginPage.formUser(user.cpf, user.name, user.email);

      loginPage.formEndereco(user.cep);
      loginPage.shouldDisplayErrorMessage("Informe um CEP válido");
    });

    it("Deve exibir mensagem de erro ao campo do cep quando estiver vazio ", () => {
      const loginPage = new LoginPage();
      loginPage.open();

      const user = {
        name: "João da Silva",
        email: "joao.silva@example.com",
        cpf: generate(),
        cep: "",
        numero: "123",
      };

      loginPage.formUser(user.cpf, user.name, user.email);

      loginPage.formEndereco(user.cep);
      loginPage.shouldDisplayErrorMessage("Informe um CEP válido");
    });
  });

  context("Login quando todos os campos estão vázio", () => {
    it("Deve exibir mensagem de erro para todos os campos", () => {
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
      loginPage.formEndereco(user.cep, user.numero, user.complemento);
      loginPage.submit();

      validetedUsers.forEach((mensagem) => {
        loginPage.shouldDisplayErrorMessage(mensagem);
      });
    });
  });
});
