let pedidos = [
    { cliente: "Bia", valor: 120, status: "pago" },
    { cliente: "João", valor: 80, status: "pendente" },
    { cliente: "Maria", valor: 200, status: "pago" },
    { cliente: "", valor: 50, status: "pago" },
    { cliente: "Carlos", valor: -10, status: "pago" }
];

let pedidosValidos = pedidos.filter(function(pedido) {
    return pedido.cliente !== "" &&
           typeof pedido.valor === "number" &&
           pedido.valor > 0;
});

let pedidosPagos = pedidosValidos.filter(function(pedido) {
    return pedido.status === "pago";
});

let totalFaturado = pedidosPagos.reduce(function(total, pedido) {
    return total + pedido.valor;
}, 0);

console.log("Total faturado: R$ " + totalFaturado.toFixed(2));

pedidosPagos.forEach(function(pedido) {
    console.log(
        pedido.cliente + " — R$ " + pedido.valor.toFixed(2)
    );
});


let formularioCep = document.querySelector("#formularioCep");
let campoCep = document.querySelector("#cep");
let botaoCep = document.querySelector("#botaoCep");
let statusCep = document.querySelector("#statusCep");
let resultadoCep = document.querySelector("#resultadoCep");
let historicoLista = document.querySelector("#historico");

let historico = [];


formularioCep.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    let cep = campoCep.value.trim();

    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "Digite um CEP com 8 números.";
        return;
    }

    botaoCep.disabled = true;
    statusCep.textContent = "Buscando...";
    resultadoCep.replaceChildren();

    try {
        let resposta = await fetch(
            "https://viacep.com.br/ws/" + cep + "/json/",
            {
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!resposta.ok) {
            throw new Error("Falha na conexão.");
        }

        let dados = await resposta.json();

        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado";
            return;
        }

        statusCep.textContent = "";

        let ruaTitulo = document.createElement("dt");
        let ruaTexto = document.createElement("dd");

        ruaTitulo.textContent = "Rua";
        ruaTexto.textContent = dados.logradouro;

        let bairroTitulo = document.createElement("dt");
        let bairroTexto = document.createElement("dd");

        bairroTitulo.textContent = "Bairro";
        bairroTexto.textContent = dados.bairro;

        let cidadeTitulo = document.createElement("dt");
        let cidadeTexto = document.createElement("dd");

        cidadeTitulo.textContent = "Cidade";
        cidadeTexto.textContent = dados.localidade;

        let ufTitulo = document.createElement("dt");
        let ufTexto = document.createElement("dd");

        ufTitulo.textContent = "UF";
        ufTexto.textContent = dados.uf;

        resultadoCep.append(
            ruaTitulo,
            ruaTexto,
            bairroTitulo,
            bairroTexto,
            cidadeTitulo,
            cidadeTexto,
            ufTitulo,
            ufTexto
        );

        historico.push({
            cep: cep,
            cidade: dados.localidade,
            uf: dados.uf
        });

        historicoLista.replaceChildren();

        historico.forEach(function(item) {
            let li = document.createElement("li");

            li.textContent =
                item.cep + " - " +
                item.cidade + " - " +
                item.uf;

            historicoLista.append(li);
        });

    } catch (erro) {
        statusCep.textContent = "Falha na conexão.";
    } finally {
        botaoCep.disabled = false;
    }
});


let formularioPokemon = document.querySelector("#formularioPokemon");
let campoPokemon = document.querySelector("#pokemon");
let botaoPokemon = document.querySelector("#botaoPokemon");
let statusPokemon = document.querySelector("#statusPokemon");
let resultadoPokemon = document.querySelector("#resultadoPokemon");


formularioPokemon.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    let nome = campoPokemon.value.trim().toLowerCase();

    if (nome === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon.";
        return;
    }

    botaoPokemon.disabled = true;
    statusPokemon.textContent = "Buscando...";
    resultadoPokemon.replaceChildren();

    try {
        let resposta = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + nome
        );

        if (!resposta.ok) {
            if (resposta.status === 404) {
                throw new Error("Pokémon não encontrado");
            }

            throw new Error("Falha na conexão.");
        }

        let dados = await resposta.json();

        statusPokemon.textContent = "";

        let titulo = document.createElement("h2");
        titulo.textContent = dados.name;

        let imagem = document.createElement("img");
        imagem.src = dados.sprites.front_default;
        imagem.alt = dados.name;

        let tipos = document.createElement("p");

        let nomesTipos = dados.types.map(function(tipo) {
            return tipo.type.name;
        });

        tipos.textContent = "Tipos: " + nomesTipos.join(", ");

        resultadoPokemon.append(
            titulo,
            imagem,
            tipos
        );

    } catch (erro) {
        statusPokemon.textContent = erro.message;
    } finally {
        botaoPokemon.disabled = false;
    }
});