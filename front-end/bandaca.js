
window.onload =()=>{
   polling(5)

}

function polling(segundos){
    setTimeout(()=>{
        console.log('buscando..')
        bsucarDadosBancada()
            polling(segundos)
    },segundos*1000)

}
function bsucarDadosBancada(){
    fetch('http://10.77.241.170:1880/api/smartsense/api/usuario/cadastrar')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}const bancadas = [
    {
        id: "B01",
        status: "online",
        basesTotal: 28,
        basesDisponiveis: 20,
        basesIndisponiveis: 8,
        img: "img/bancada_estoque (5).png"
    },

    {
        id: "B02",
        status: "online",
        basesTotal: null,
        img: "img/bancada_expedicao.png"
    },

    {
        id: "B03",
        status: "online",
        basesTotal: null,
        img: "img/bancada_montagem.png"
    },

    {
        id: "B04",
        status: "online",
        basesTotal: 12,
        basesDisponiveis: 9,
        basesIndisponiveis: 3,
        img: "img/bancada_processo.png"
    }

];


// GRID
const grid = document.getElementById("grid");

function carregarBancadas() {
    grid.innerHTML = "";

    bancadas.forEach(b => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${b.img}" class="card-img">

            <h3>${b.id}</h3>
            <small class="${b.status === "online" ? "status-online" : "status-offline"}">
    Status: ${b.status}
</small>


            ${
                b.basesTotal !== null 
                ? `<p><strong>Bases totais:</strong> ${b.basesTotal}</p>`
                : `<p></p>`
            }

          <div class="acoes">
    <button class="btn" onclick="verEstoque('${b.id}')">Ver Estoque</button>
    <button class="btn" onclick="verInfo('${b.id}')">Informações</button>
</div>

        `;
        grid.appendChild(card);
    });
}


// 📌 GERAR TABELA VISUAL DE BOLINHAS (dinâmico)
function gerarLinhasBolinhas(b) {

    let linhas = [];

    if (b.id === "B01") {
        linhas = [6, 6, 6, 6, 4];
    }

    if (b.id === "B04") {
        linhas = [4, 4, 4];
    }

    let html = "";
    let totalDisponiveis = b.basesDisponiveis;
    let totalIndisponiveis = b.basesIndisponiveis;

    linhas.forEach(qtd => {
        html += `<div class="linha-bolinhas">`;

        for (let i = 0; i < qtd; i++) {
            let cor = "disponivel";

            if (totalDisponiveis > 0) {
                cor = "disponivel";
                totalDisponiveis--;
            } else {
                cor = "indisponivel";
                totalIndisponiveis--;
            }

            html += `<div class="bolinha ${cor}"></div>`;
        }

        html += `</div>`;
    });

    return html;
}



//// 🟦 FUNÇÃO: VER ESTOQUE
function verEstoque(id) {
    const b = bancadas.find(x => x.id === id);

    if (b.basesTotal === null) {
        alert("Esta bancada não possui controle de bases.");
        return;
    }

    const modal = document.createElement("div");
    modal.classList.add("estoque-modal");

    modal.innerHTML = `
        <div class="estoque-box">
            <h2>Estoque de Bases - ${b.id}</h2>

            <table class="estoque-tabela">
                <tr>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                </tr>

                <tr>
                    <td style="color:#00aaff;">Disponíveis</td>
                    <td>${b.basesDisponiveis}</td>
                </tr>

                <tr>
                    <td style="color:#ff4444;">Indisponíveis</td>
                    <td>${b.basesIndisponiveis}</td>
                </tr>

                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>${b.basesTotal}</strong></td>
                </tr>
            </table>

            <h3 style="margin-top:18px;">Visual das Bases</h3>

            <div class="visual-est">
                ${gerarLinhasBolinhas(b)}
            </div>

            <div class="legendas">
                <div><span class="bolinha disponivel"></span> Disponível</div>
                <div><span class="bolinha indisponivel"></span> Indisponível</div>
            </div>

            <button class="btn fechar" onclick="this.parentElement.parentElement.remove()">Fechar</button>
        </div>
    `;

    document.body.appendChild(modal);
}



// 🟦 NOVA FUNÇÃO: INFORMAÇÕES DA BANCADA
function verInfo(id) {
    const b = bancadas.find(x => x.id === id);

    const modal = document.createElement("div");
    modal.classList.add("estoque-modal");

    modal.innerHTML = `
        <div class="estoque-box">
            <h2>Informações da Bancada - ${b.id}</h2>

            <div class="info-extra" style="margin-top: 15px; font-size: 14px; line-height: 1.6;">
                <p><strong>Timestamp:</strong> --</p>
                <p><strong>Data:</strong> --</p>
                <p><strong>Umidade:</strong> --</p>
                <p><strong>AI00:</strong> --</p>
                <p><strong>Vrms:</strong> --</p>
                <p><strong>Irms:</strong> --</p>
                <p><strong>APPP:</strong> --</p>
                <p><strong>ACTP:</strong> --</p>
            </div>

            <button class="btn fechar" style="margin-top:20px;" onclick="this.parentElement.parentElement.remove()">
                Fechar
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}



// INICIAR
carregarBancadas();

    document.body.appendChild(modal);





// INICIAR
carregarBancadas();


