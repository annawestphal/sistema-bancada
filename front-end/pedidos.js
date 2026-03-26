const pedidos = [
  { id: 401, status: "Em processo", modulo: "Montagem", criado: "2025-12-04", entrega: "2025-12-06", base: "Azul", paredes: ["Vermelho", "Preto", "Azul"], finalizado: false, atrasado: false },
  { id: 402, status: "Aguardando módulo", modulo: "Processo", criado: "2025-12-04", entrega: "2025-12-05", base: "Preto", paredes: ["Azul", "Vermelho", "Preto"], finalizado: false, atrasado: true },
  { id: 403, status: "Finalizado", modulo: "Expedição", criado: "2025-12-02", entrega: "2025-12-05", base: "Vermelho", paredes: ["Azul", "Preto", "Vermelho"], finalizado: true, atrasado: false },
];

const lista = document.getElementById("lista-pedidos");
const detalhes = document.getElementById("detalhes");
const search = document.getElementById("search");
const filtros = document.querySelectorAll(".kpi.filter");

let filtroAtual = "all";

function corHex(c) {
  return c === "Azul" ? "#3b82f6" : c === "Vermelho" ? "#ef4444" : "#000";
}

function aplicarFiltro(p) {
  if (filtroAtual === "prod") return !p.finalizado && !p.atrasado;
  if (filtroAtual === "done") return p.finalizado;
  if (filtroAtual === "late") return p.atrasado;
  return true;
}

function render() {
  lista.innerHTML = "";
  const termo = search.value?.trim();

  pedidos
    .filter(aplicarFiltro)
    .filter(p => !termo || p.id.toString().includes(termo))
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "order-item";
      div.innerHTML = `
        <strong>#${p.id}</strong>
        <div class="order-meta">
          <span>${p.modulo}</span>
          <span class="badge">${p.status}</span>
        </div>
      `;
      div.onclick = () => select(p, div);
      lista.appendChild(div);
    });

  document.getElementById("kpiAll").textContent = pedidos.length;
  document.getElementById("kpiProd").textContent = pedidos.filter(p => !p.finalizado && !p.atrasado).length;
  document.getElementById("kpiDone").textContent = pedidos.filter(p => p.finalizado).length;
  document.getElementById("kpiLate").textContent = pedidos.filter(p => p.atrasado).length;
}

function select(p, el) {
  document.querySelectorAll(".order-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");

  detalhes.innerHTML = `
    <h2>Pedido #${p.id}</h2>
    <div class="detail-grid">
      <div class="detail-box"><span>Data do pedido</span>${p.criado}</div>
      <div class="detail-box"><span>Entrega prevista</span>${p.entrega}</div>
      <div class="detail-box"><span>Status</span>${p.status}</div>
      <div class="detail-box"><span>Módulo atual</span>${p.modulo}</div>
    </div>

    <h3>Cores</h3>
    <div class="colors">
      <div><span class="color-dot" style="background:${corHex(p.base)}"></span>Base: ${p.base}</div>
      ${p.paredes.map((c, i) => `
        <div><span class="color-dot" style="background:${corHex(c)}"></span>Parede ${i+1}: ${c}</div>
      `).join("")}
    </div>
  `;
}

filtros.forEach(f => {
  f.onclick = () => {
    filtros.forEach(x => x.classList.remove("active"));
    f.classList.add("active");
    filtroAtual = f.dataset.filter;
    render();
  };
});

<><button onclick="editarPedido(${pedido.id})">Editar</button>
<button onclick="excluirPedido(${pedido.id})">Excluir</button></>


function excluirPedido(id){

    if(!confirm("Deseja excluir esse pedido?")) return;

    fetch("http://localhost:1880/api/pedido/excluir",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("Pedido excluído",data)
        location.reload()
    })
}
function editarPedido(id){

    fetch("http://localhost:1880/api/pedidos/editar",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("Editar pedido",data)
    })
    function adicionarPedido(){

    let cliente = document.getElementById("cliente").value;
    let produto = document.getElementById("produto").value;
    let quantidade = document.getElementById("quantidade").value;

    fetch("http://localhost:1880/api/cadastrar/pedido",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            cliente:cliente,
            produto:produto,
            quantidade:quantidade
        })
    })
    .then(res=>res.json())
    .then(resposta=>{
        alert("Pedido adicionado!");
        buscarPedidos();
    });

}
}
search.oninput = render;
render();
function novoPedido() {
  document.getElementById("modalPedido").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalPedido").style.display = "none";
}

function salvarPedido() {
  const cliente = document.getElementById("cliente").value;
  const produto = document.getElementById("produto").value;

  console.log({ cliente, produto });

  alert("Pedido cadastrado!");
  fecharModal();
}
