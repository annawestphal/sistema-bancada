
const form = document.getElementById("loginForm");




async function entrar(e){
    e.preventDefault();

    let input_email = document.getElementById('usuario');
    let input_senha = document.getElementById('senha');

    if(!input_email || !input_senha){
        alert("Inputs não encontrados")
        return;
    }

    let email = input_email.value;
    let senha = input_senha.value;

    try{

        let resposta = await fetch("http://localhost:1880/api/autentificar",{
            method:'POST',
            body:JSON.stringify({email,senha})
            //body:{email,senha}
        })

        if(resposta.status == 200){
            alert("Login realizado com sucesso!");
            window.location.href = "bancada.html";
        }else{
            alert("Usuário ou senha inválidos")
        }
    }catch(erro){
        alert("Erro ao buscar, confira o console para ver mais detalhes.")
        console.error(erro);
    }
}