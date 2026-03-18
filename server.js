const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// BANCO DE DADOS FAKE (por enquanto)
const usuarios = [
  {
    cpf: "12345678900",
    certificados: [
      {
        nome: "HTML e CSS",
        instituicao: "Alura",
        data: "10/02/2026",
        link: "/certificados/html-css.pdf"
      }
    ]
  },
  {
    cpf: "11122233344",
    certificados: [
      {
        nome: "JavaScript",
        instituicao: "Udemy",
        data: "15/02/2026",
        link: "/certificados/js.pdf"
      }
    ]
  }
];

// ROTA
app.post("/certificados", (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ mensagem: "CPF não enviado" });
  }

  const cpfLimpo = cpf.replace(/\D/g, "");

  const usuario = usuarios.find(u => u.cpf === cpfLimpo);

  if (!usuario) {
    return res.status(404).json({ mensagem: "CPF não encontrado" });
  }

  res.json({ certificados: usuario.certificados });
});

// SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});