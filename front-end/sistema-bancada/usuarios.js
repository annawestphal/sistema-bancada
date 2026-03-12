  const tabela = document.getElementById("userTable");
  const inputBusca = document.getElementById("search");

  if (!tabela || !inputBusca) {
    console.error("ERRO: Falta #userTable ou #search no HTML");
    return;
  }

  function renderTabela(lista) {
    tabela.innerHTML = "";

    lista.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td class="acoes">
          <button class="edit-btn" data-id="${user.id}">Editar</button>
          <button class="delete-btn" data-id="${user.id}">Excluir</button>
        </td>
      `;

      tabela.appendChild(tr);
    });
  }

  renderTabela(usuarios);

  // 🔎 BUSCA
  inputBusca.addEventListener("input", () => {
    const termo = inputBusca.value.toLowerCase();

    const filtrados = usuarios.filter(u =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo)
    );

    renderTabela(filtrados);
  });

  // clique nos botões
  tabela.addEventListener("click", (e) => {

    const btn = e.target;
    const id = btn.dataset.id;

    if (!id) return;

    if (btn.classList.contains("edit-btn")) {
      editarUsuario(id)
    };

    if (btn.classList.contains("delete-btn")) {
      excluirUsuario(id)
    };

  });

  function editarUsuario(id) {
    fetch("http://localhost:1880/api/usuarios/editar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: Number(id) })
    })
    .then(r => r.json())
    .then(res => {
      alert("ID enviado para editar: " + id);
      console.log(res);
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao enviar para Node-RED (editar)");
    })
  };

  function excluirUsuario(id) {

    if (!confirm("Tem certeza que deseja excluir?")) return;

    try{

    fetch("http://localhost:1880/api/usuarios/excluir", {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id})
    })
    .then(r => r.json())
    .then(res => {
      alert("ID enviado para excluir: " + id);
      console.log(res)
    });
  }catch(err){
      console.error(err);
      alert("Erro ao tentar excluir");
    };
  }
