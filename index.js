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


app.get("/", async (req, res) => {
  const loja = await Loja.findAll();

  res.render("index", {
    loja,
  });
});

// app.get("/criar", (req, res) => {
//   res.render("criar", {message});
// });

app.get("/cadastro", (req, res) => {
  res.render("cadastroLoja", {
    message: "Cadastre sua loja!",
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

app.post("/editar/:id", async (req, res) => {
  const loja = await Loja.findByPk(req.params.id);

  const { nome, descricao, imagem, cnpj, contato, email } = req.body;

  Loja.nome = nome;
  Loja.descricao = descricao;
  Loja.imagem = imagem;
  Loja.cnpj = cnpj;
  Loja.contato = contato;
  Loja.email = email;

  const LojaEditado = await loja.save();

  res.render("editar", {
    loja: LojaEditado,
    message: "Loja editado com sucesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const loja = await Loja.findByPk(req.params.id);

  if (!loja) {
    res.render("deletar", {
      loja,
      message: "Loja não encontrado!",
    });
  }

  res.render("deletar", {
    loja, message
  });
});


app.post("/deletar/:id", async (req, res) => {
  const loja = await Loja.findByPk(req.params.id);

  if (!loja) {
    res.render("deletar", {
      mensagem: "Loja não encontrado!",
    });
  }

  await loja.destroy();

  res.redirect("/");
});

app.get("/quemsomos", (req, res) => {
  res.render("quemSomos");
});



app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));