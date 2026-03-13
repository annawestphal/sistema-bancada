const tabela = document.getElementById("tabelaUsuarios");
const inputBusca = document.getElementById("inputBusca");

async function buscar() {

  const email = inputBusca.value;

  try {

    const resposta = await fetch("http://localhost:1880/api/usuarios/listar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    });

    if (!resposta.ok) {
      alert("Erro ao buscar usuários");
      return;
    }

    const usuarios = await resposta.json();

    renderTabela(usuarios);

  } catch (erro) {
    console.error("Erro:", erro);
  }

}

function renderTabela(lista) {

  tabela.innerHTML = "";

  lista.forEach(usuario => {

    tabela.innerHTML += `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.sobrenome}</td>
        <td>${usuario.dt_nascimento ? usuario.dt_nascimento.split("T")[0] : ""}</td>
        <td>${usuario.tipo_usuario}</td>
        <td>${usuario.email}</td>

        <td class="acoes">
          <button class="edit-btn" data-id="${usuario.id}">Editar</button>
          <button class="delete-btn" data-id="${usuario.id}">Excluir</button>
        </td>
      </tr>
    `;

  });

}

tabela.addEventListener("click", (e) => {

  const btn = e.target;
  const id = btn.dataset.id;

  if (!id) return;

  if (btn.classList.contains("edit-btn")) {
    editarUsuario(id);
  }

  if (btn.classList.contains("delete-btn")) {
    excluirUsuario(id);
  }

});

function editarUsuario(id) {

  const linha = document.querySelector(`button[data-id="${id}"]`).closest("tr");
  const colunas = linha.querySelectorAll("td");

  const nome = colunas[1].innerText;
  const sobrenome = colunas[2].innerText;
  const nascimento = colunas[3].innerText.split("T")[0];
  const tipo = colunas[4].innerText;
  const email = colunas[5].innerText;

  colunas[1].innerHTML = `<input id="editNome" value="${nome}">`;
  colunas[2].innerHTML = `<input id="editSobrenome" value="${sobrenome}">`;
  colunas[3].innerHTML = `<input type="date" id="editNascimento" value="${nascimento || ""}">`;
  colunas[4].innerHTML = `<input id="editTipo" value="${tipo}">`;
  colunas[5].innerHTML = `<input id="editEmail" value="${email}">`;

  colunas[6].innerHTML = `
    <button onclick="salvarUsuario(${id})">Salvar</button>
  `;
}
function salvarUsuario(id){

  const nome = document.getElementById("editNome").value;
  const sobrenome = document.getElementById("editSobrenome").value;
  const nascimento = document.getElementById("editNascimento").value;
  const tipo = document.getElementById("editTipo").value;
  const email = document.getElementById("editEmail").value;

  const dados = {
    id: Number(id),
    nome: nome,
    sobrenome: sobrenome,
    dt_nascimento: nascimento,
    tipo_usuario: tipo,
    email: email
  };

  console.log("Dados enviados:", dados);

  fetch("http://localhost:1880/api/usuario/editar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(res => {
    console.log("Resposta API:", res);
    alert("Usuário atualizado");
    buscar();
  })
  .catch(err => {
    console.error("Erro:", err);
    alert("Erro ao salvar");
  });

}

function excluirUsuario(id) {

  if (!confirm("Tem certeza que deseja excluir?")) return;

  fetch("http://localhost:1880/api/usuario/excluir", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: Number(id) })
  })
  .then(() => buscar());

}

buscar();