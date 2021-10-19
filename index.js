require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

let message = "";
let message1 = "";
let message2 = "";
let message3 = "";

const cadastroLoja = [];
const cadastroProduto = [];
const quemSomos = [];
const cadastroCliente = [];


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", {
    titulo: "Good Sales",
    cadastroLoja: cadastroLoja,
    cadastroProduto: cadastroProduto,
    quemSomos: quemSomos,
    message,
  })
});

const loja = require("./models/loja");

// app.post("/criar", async (req, res) => {
//   const { nome, descricao, imagem } = req.body;

//   const loja = await Loja.create({
//     nome,
//     descricao,
//     imagem,
//   });

//   res.render("criar", {
//     loja,
//   });
// });

app.get("/", async (req, res) => {
  const loja = await Loja.findAll();

  res.render("index", {
    loja,
  });
});

app.post("/criar", async (req, res) => {
  const { nome, descricao, imagem, cnpj, contato, email } = req.body;

  if (!nome) {
    res.render("criar", {
      mensagem: "Nome é obrigatório",
    });
  }

  if (!imagem) {
    res.render("criar", {
      mensagem: "Imagem é obrigatório",
    });
  }
  if (!cnpj) {
    res.render("criar", {
      mensagem: "Nome é obrigatório",
    });
  }

  if (!contato) {
    res.render("criar", {
      mensagem: "Imagem é obrigatório",
    });
  }

    if (!email) {
      res.render("criar", {
        mensagem: "Imagem é obrigatório",
      });
  }

  try {
    const loja = await Loja.create({
      nome,
      descricao,
      imagem,
      cnpj,
      contato,
      email,
    });

    res.render("criar", {
      loja,
    });
  } catch (err) {
    console.log(err);

    res.render("criar", {
      mensagem: "Ocorreu um erro ao cadastrar o Filme!",
    });
  }
})

app.get("/cadastro", (req, res) => {
  res.render("cadastroLoja", {
    message: "Cadastre sua loja!",
  });
});

app.get("/cadastrocliente", (req, res) => {
  res.render("cadastroCliente", {
    message: "Cadastre-se!",
  });
});

app.get("/quemsomos", (req, res) => {
  res.render("quemSomos");
});

app.post("/cadastrocliente", (req, res) => {
  const {nome, sobrenome, cpf, endereco, numero, complemento, bairro, cidade, uf, cep, email} = req.body;
  const novoCliente = ({nome: nome, sobrenome: sobrenome, cpf: cpf, endereco: endereco, numero: numero, complemento: complemento, bairro: bairro, cidade: cidade, uf: uf, cep: cep, email: email});
  cadastroCliente.push(novoCliente);
  message = `Olá, ${nome}! Seu cadastro foi realizado com sucesso! `
  res.redirect("/");
});

app.post("/new", (req, res) => {
  const {loja, categoria, logo, cnpj, contato, email} = req.body;
  console.log("AQUI ESTÁ:");
  console.log(req.body)
  const novaLoja = ({loja: loja, categoria: categoria, logo: logo, cnpj: cnpj, contato: contato, email: email});
  cadastroLoja.push(novaLoja);
  message = `A loja ${loja} foi cadastrada com sucesso!`;
  res.redirect("/");
});


app.post("/newproduto", (req, res) => {
  const {item, descricao, tamanho, imagem, valor} = req.body;
  const produto = ({item: item, descricao: descricao, tamanho: tamanho, imagem, imagem, valor: valor});
  cadastroProduto.push(produto);
  message = `Produto ${item} cadastrado com sucesso!`
  res.redirect("/");
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));