function entrar() {
const usuario = document.getElementById('usuario').value;
const senha = document.getElementById('senha').value;


if (usuario === '' || senha === '') {
alert('Por favor, preencha todos os campos!');
} else {
alert('Login realizado com sucesso!');
}
window.location.href = "bancada.html"
}
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede enviar automaticamente

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Preencha todos os campos!");
        return; 
    }

    // validação básica de email
    if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um email válido!");
        return;
    }

    // senha mínima
    if (password.length < 4) {
        alert("A senha deve ter no mínimo 4 caracteres!");
        return;
    }

    // Se tudo estiver OK, enviar para a próxima página
    window.location.href = "segunda_pagina.html";
});

