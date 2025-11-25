const db = require("./db");
const bcrypt = require("bcryptjs");

exports.fazerLogin = (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Erro no servidor");
        }

        if (results.length === 0) {
            return res.send("Usuário não encontrado");
        }

        const usuario = results[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.send("Senha incorreta");
        }

        res.send("Login realizado com sucesso!");
    });
};
