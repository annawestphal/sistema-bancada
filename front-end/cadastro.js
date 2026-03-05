const tipoUsuario = document.getElementById("tipo").value;

if (tipoUsuario === "") {
  alert("Selecione o tipo de usuário");
  return;
}

console.log(tipoUsuario); // aluno ou professor
fetch("http://localhost:1880/api/usuario/cadastrar",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nome:nome,
            sobrenome:sobrenome,
              tipo_usuario:tipo_usuario,
             email:email,
            dt_nascimento:dt_nascimento,
            senha:senha
        })
    })
    .then(res=>res.json())
    .then(resposta=>{
        alert("usuario criado!");
        buscarPedidos();
    });
