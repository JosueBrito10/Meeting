const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/cadastro", (req, res) => {
    const { email, senha, telefone } = req.body;

    const sql = "INSERT INTO usuarios (email, senha, telefone) VALUES (?, ?, ?)";
    db.query(sql, [email, senha, telefone], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Erro ao cadastrar!");
        }

        res.send("Cadastro realizado com sucesso!");
    });
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.send("Erro ao logar");
        if (results.length === 0) return res.send("Usuário não encontrado");

        const usuario = results[0];

        if (senha !== usuario.senha) {
            return res.send("Senha incorreta");
        }

        if (!senhaCorreta) return res.send("Senha incorreta");

        res.send("Login realizado com sucesso!");
    });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));