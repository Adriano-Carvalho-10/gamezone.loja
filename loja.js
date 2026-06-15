// ======================
// GAMEZONE PREMIUM
// ======================

const carrinho = [];

// ======================
// CARRINHO
// ======================

function toggleCarrinho() {
    const carrinhoDiv = document.getElementById("carrinho");
    carrinhoDiv.classList.toggle("active");
}

// ======================
// ADICIONAR PRODUTO
// ======================

function comprar(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    toggleCarrinho();
}

// ======================
// ATUALIZAR CARRINHO
// ======================

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const total = document.getElementById("total");
    const contador = document.getElementById("cartCount");

    lista.innerHTML = "";
    let soma = 0;

    carrinho.forEach((item, index) => {

        soma += item.preco;

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.nome}</strong><br>
            R$ ${item.preco.toFixed(2)}<br><br>
            <button onclick="removerItem(${index})" style="
                background:red;color:white;border:none;
                padding:5px 10px;cursor:pointer;border-radius:5px;">
                Remover
            </button>
        `;

        lista.appendChild(li);
    });

    total.innerText = `R$ ${soma.toFixed(2)}`;
    contador.innerText = carrinho.length;
}

// ======================
// REMOVER ITEM
// ======================

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// ======================
// CHECKOUT
// ======================

function abrirCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    document.getElementById("checkoutModal").style.display = "flex";
}

function fecharCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

// ======================
// FINALIZAR COMPRA
// ======================

function finalizarCompra() {

    const nome = document.getElementById("nomeCliente").value || "Não informado";
    const cep = document.getElementById("cepCliente").value || "Não informado";
    const endereco = document.getElementById("enderecoCliente").value || "Não informado";
    const pagamento = document.getElementById("formaPagamento").value;
    const parcelas = document.getElementById("parcelas").value;

    let total = 0;
    let listaProdutos = "";

    carrinho.forEach(item => {
        total += item.preco;
        listaProdutos += `%0A- ${item.nome}: R$ ${item.preco.toFixed(2)}`;
    });

    const numeroPedido = Math.floor(100000 + Math.random() * 900000);

    const texto =
        `%F0%9F%9B%92 *NOVO PEDIDO %23${numeroPedido}*` +
        `%0A%0A%F0%9F%91%A4 *Cliente:* ${encodeURIComponent(nome)}` +
        `%0A%F0%9F%93%8D *Endere%C3%A7o:* ${encodeURIComponent(endereco)} - CEP: ${encodeURIComponent(cep)}` +
        `%0A%0A%F0%9F%9B%8D *Produtos:*${listaProdutos}` +
        `%0A%0A%F0%9F%92%B3 *Pagamento:* ${pagamento} - ${parcelas}` +
        `%0A%F0%9F%92%B0 *Total:* R%24 ${total.toFixed(2)}`;

    const pedido = {
        numero: numeroPedido,
        total: total.toFixed(2),
        pagamento,
        parcelas,
        data: new Date().toLocaleString("pt-BR")
    };

    salvarPedido(pedido);

    window.open(`https://wa.me/5589988029771?text=${texto}`, "_blank");

    carrinho.length = 0;
    atualizarCarrinho();
    fecharCheckout();
}

// ======================
// PESQUISA
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const pesquisa = document.getElementById("searchInput");

    if (!pesquisa) return;

    pesquisa.addEventListener("keyup", () => {

        const valor = pesquisa.value.trim().toLowerCase();
        const produtos = document.querySelectorAll(".produto");

        if (!valor) {
            produtos.forEach(p => p.style.display = "block");
            removerAviso();
            return;
        }

        let encontrados = 0;

        produtos.forEach(produto => {
            const texto = produto.innerText.toLowerCase();
            if (texto.includes(valor)) {
                produto.style.display = "block";
                encontrados++;
            } else {
                produto.style.display = "none";
            }
        });

        if (encontrados > 0) {
            removerAviso();
            document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
        } else {
            mostrarAviso(valor);
        }
    });
});

function mostrarAviso(termo) {

    removerAviso();

    const aviso = document.createElement("p");
    aviso.id = "avisoSemProduto";
    aviso.style.cssText = `
        text-align: center;
        color: #ff6b6b;
        font-size: 1.1rem;
        margin-top: 20px;
        grid-column: 1 / -1;
    `;
    aviso.textContent = `❌ Nenhum produto encontrado para "${termo}".`;

    document.querySelector("#produtos .cards").appendChild(aviso);
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}

function removerAviso() {
    const aviso = document.getElementById("avisoSemProduto");
    if (aviso) aviso.remove();
}

// ======================
// FECHAR CHECKOUT AO CLICAR FORA
// ======================

window.addEventListener("click", e => {
    const modal = document.getElementById("checkoutModal");
    if (e.target === modal) fecharCheckout();
});

// ======================
// HISTÓRICO DE PEDIDOS
// ======================

function salvarPedido(pedido) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    carregarPedidos();
}

function carregarPedidos() {

    const historico = document.getElementById("historicoPedidos");
    if (!historico) return;

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        historico.innerHTML = "<p>Nenhum pedido realizado.</p>";
        return;
    }

    historico.innerHTML = "";

    pedidos.forEach(pedido => {
        const div = document.createElement("div");
        div.classList.add("pedido-card");
        div.innerHTML = `
            <h3>Pedido #${pedido.numero}</h3>
            <p><strong>Total:</strong> R$ ${pedido.total}</p>
            <p><strong>Pagamento:</strong> ${pedido.pagamento}</p>
            <p><strong>Parcelamento:</strong> ${pedido.parcelas}</p>
            <p><strong>Data:</strong> ${pedido.data}</p>
        `;
        historico.appendChild(div);
    });
}

window.onload = () => {
    carregarPedidos();
};

// ======================
// CONTATO WHATSAPP
// ======================

function enviarWhatsApp(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeContato").value;
    const email = document.getElementById("emailContato").value;
    const mensagem = document.getElementById("mensagemContato").value;

    const texto =
        `Ol%C3%A1! Meu nome %C3%A9 ${encodeURIComponent(nome)}.` +
        `%0AEmail: ${encodeURIComponent(email)}.` +
        `%0AMensagem: ${encodeURIComponent(mensagem)}`;

    window.open(`https://wa.me/5589988029771?text=${texto}`, "_blank");
}