const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { //Irei usar Variaveis de Ambiente dotENV
    user: "ebertoncello@notredamecampinas.net.br",
    pass: "Enzzolegal12#",
  },
});

app.post("/send-email", (req, res) => {
    const { subject , message  } = req.body;

    // Concatenar mensagem

    const updatedSubject = subject + " - Mapa De sala";


    const mailOptions = {
      from: "ebertoncello@notredamecampinas.net.br",
      to: "enzzocsgo12345678@gmail.com", // endereço de e-mail padrão
      subject: updatedSubject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Erro ao enviar e-mail");
      } else {
        console.log("E-mail enviado: " + info.response);
        res.status(200).send("E-mail enviado com sucesso");
      }
    });
  });
  

app.listen(3000, () => {
  console.log("Servidor Node.js rodando na porta 3000");
});
