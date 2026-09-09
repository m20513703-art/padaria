/* ==========================================================
   PADARIA SÃO MIGUEL
   SITE + COMANDA + WHATSAPP
   ========================================================== */

let comanda = [];


/* =========================
   FORMATAÇÃO
========================= */

function dinheiro(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =========================
   TROCAR TELA
========================= */

function mostrarTela(id) {

    document.querySelectorAll(".tela").forEach(function(tela) {

        tela.classList.remove("ativa");

    });


    const tela = document.getElementById(id);

    if (tela) {

        tela.classList.add("ativa");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   INÍCIO
========================= */

function voltarInicio() {

    mostrarTela("inicio");

}


/* =========================
   CARDÁPIO
========================= */

function abrirCardapio() {

    mostrarTela("cardapio");

}


/* =========================
   CATEGORIA
========================= */

function mostrarCategoria(categoria) {

    const elemento =
        document.getElementById(categoria);

    if (!elemento) {
        return;
    }

    document.querySelectorAll(".categoria-produtos")
        .forEach(function(secao) {

            secao.style.display = "none";

        });


    elemento.style.display = "block";

    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================
   ADICIONAR PRODUTO
========================= */

function adicionarProduto(nome, preco) {

    const produto =
        comanda.find(function(item) {

            return item.nome === nome;

        });


    if (produto) {

        produto.quantidade++;

    } else {

        comanda.push({

            nome: nome,

            preco: Number(preco),

            quantidade: 1

        });

    }


    atualizarComanda();

}


/* =========================
   CALCULAR TOTAL
========================= */

function calcularTotal() {

    let total = 0;


    comanda.forEach(function(item) {

        total +=
            item.preco *
            item.quantidade;

    });


    return total;

}


/* =========================
   ATUALIZAR COMANDA
========================= */

function atualizarComanda() {

    const lista =
        document.getElementById("listaComanda");

    const total =
        document.getElementById("totalComanda");


    if (!lista) {
        return;
    }


    if (comanda.length === 0) {

        lista.innerHTML = `

            <div class="comanda-vazia">

                <span>🧾</span>

                <p>
                    Sua comanda está vazia.
                </p>

            </div>

        `;

    } else {

        lista.innerHTML = "";


        comanda.forEach(function(item, indice) {

            const subtotal =
                item.preco *
                item.quantidade;


            const div =
                document.createElement("div");


            div.className =
                "item-comanda";


            div.innerHTML = `

                <div class="item-comanda-topo">

                    <strong>
                        ${item.nome}
                    </strong>

                    <span class="item-preco">
                        ${dinheiro(subtotal)}
                    </span>

                </div>


                <div class="controles">

                    <button
                        type="button"
                        onclick="diminuirQuantidade(${indice})">
                        −
                    </button>


                    <strong>
                        ${item.quantidade}
                    </strong>


                    <button
                        type="button"
                        onclick="aumentarQuantidade(${indice})">
                        +
                    </button>


                    <button
                        type="button"
                        class="remover"
                        onclick="removerProduto(${indice})">
                        🗑
                    </button>

                </div>

            `;


            lista.appendChild(div);

        });

    }


    if (total) {

        total.textContent =
            dinheiro(calcularTotal());

    }

}


/* =========================
   AUMENTAR
========================= */

function aumentarQuantidade(indice) {

    if (!comanda[indice]) {
        return;
    }


    comanda[indice].quantidade++;


    atualizarComanda();

}


/* =========================
   DIMINUIR
========================= */

function diminuirQuantidade(indice) {

    if (!comanda[indice]) {
        return;
    }


    comanda[indice].quantidade--;


    if (comanda[indice].quantidade <= 0) {

        comanda.splice(indice, 1);

    }


    atualizarComanda();

}


/* =========================
   REMOVER
========================= */

function removerProduto(indice) {

    if (!comanda[indice]) {
        return;
    }


    comanda.splice(indice, 1);


    atualizarComanda();

}


/* =========================
   ABRIR COMANDA
========================= */

function abrirComanda() {

    atualizarComanda();

    mostrarTela("comanda");

}


/* =========================
   FECHAR COMANDA
========================= */

function fecharComanda() {

    if (comanda.length === 0) {

        alert(
            "Sua comanda está vazia.\n\n" +
            "Adicione algum produto antes de fechar."
        );

        return;

    }


    const total =
        calcularTotal();


    let mensagem =
        "🥖 *PADARIA SÃO MIGUEL*%0A%0A";


    mensagem +=
        "🧾 *NOVO PEDIDO*%0A%0A";


    comanda.forEach(function(item) {

        const subtotal =
            item.preco *
            item.quantidade;


        mensagem +=
            item.quantidade +
            "x " +
            item.nome +
            " - " +
            dinheiro(subtotal) +
            "%0A";

    });


    mensagem +=
        "%0A💰 *TOTAL: " +
        dinheiro(total) +
        "*";


    const observacao =
        document.getElementById("observacao");


    if (
        observacao &&
        observacao.value.trim() !== ""
    ) {

        mensagem +=
            "%0A%0A📝 *OBSERVAÇÃO:*%0A" +
            encodeURIComponent(
                observacao.value.trim()
            );

    }


    mensagem +=
        "%0A%0A📍 Rua Guanabara, 26" +
        "%0ADivinolândia - SP";


    const numero =
        "5519981123401";


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        mensagem;


    window.open(
        url,
        "_blank"
    );


    mostrarTela("sucesso");

}


/* =========================
   NOVA COMANDA
========================= */

function novaComanda() {

    comanda = [];


    const observacao =
        document.getElementById("observacao");


    if (observacao) {

        observacao.value = "";

    }


    atualizarComanda();


    mostrarTela("inicio");

}


/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarComanda();

        mostrarTela("inicio");


        /* mostra somente a primeira categoria */

        document
            .querySelectorAll(".categoria-produtos")
            .forEach(function(secao) {

                secao.style.display = "none";

            });


        const paes =
            document.getElementById("paes");


        if (paes) {

            paes.style.display = "block";

        }

    }
);