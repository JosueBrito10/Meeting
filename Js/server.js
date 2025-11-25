const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)";

    db.query(sql, [nome, email, senhaHash], (err) => {
        if (err) return res.send("Erro ao cadastrar: " + err);
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

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) return res.send("Senha incorreta");

        res.send("Login realizado com sucesso!");
    });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));