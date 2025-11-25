document.getElementById("formCadastro").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita recarregar a página

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;

    // Envia para o server.js
    
    const resposta = await fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha,
            telefone: telefone
        })
    });

    const resultado = await resposta.text();
    alert(resultado);
});
