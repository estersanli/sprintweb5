# Semana 05 - Objetos, Dados e Assincronismo

## Descrição

Este projeto foi desenvolvido em JavaScript para praticar objetos, arrays, consumo de APIs e programação assíncrona.

O projeto possui um buscador de CEP utilizando a API ViaCEP e uma pequena Pokédex utilizando a API PokéAPI.

## Estrutura



Semana_05/ ├── index.html ├── app.js └── README.md


## Parte 1 - Pedidos

Primeiro foi criado um array com objetos de pedidos.

Cada pedido possui:

- Cliente
- Valor
- Status

Os pedidos são validados verificando se o cliente foi preenchido e se o valor é maior que zero.

Depois são selecionados apenas os pedidos com status `pago`.

O método `reduce` é utilizado para calcular o total faturado.

O método `toFixed(2)` é utilizado para mostrar os valores com duas casas decimais.

## Parte 2 - Buscador de CEP

O usuário pode digitar um CEP e realizar uma busca.

O CEP é limpo utilizando `trim()` e validado utilizando uma expressão regular.

O CEP precisa possuir exatamente 8 números.

A API utilizada é a ViaCEP:



https://viacep.com.br/ws/{cep}/json/


A requisição é feita utilizando `fetch` e `async/await`.

## Estados da tela

O buscador possui quatro situações.

### Carregando

Enquanto a consulta está sendo realizada aparece:



Buscando...


O botão também fica desabilitado.

### Erro

Caso aconteça algum problema de conexão ou erro HTTP, aparece:



Falha na conexão.


### Não encontrado

Quando a API informa que o CEP não existe, aparece:



CEP não encontrado


### Sucesso

Quando o CEP existe, são mostrados:

- Rua
- Bairro
- Cidade
- UF

Os elementos são criados utilizando `createElement` e `textContent`.

## Histórico

Os CEPs pesquisados ficam armazenados em um array de objetos.

Depois eles são mostrados na tela.

## Parte 3 - Mini Pokédex

A Pokédex utiliza a API PokéAPI.

O usuário informa o nome de um Pokémon.

O texto é convertido para letras minúsculas utilizando:



toLowerCase()


A API utilizada é:



https://pokeapi.co/api/v2/pokemon/{nome}


São mostrados:

- Nome
- Imagem
- Tipos

Se o Pokémon não existir, aparece:



Pokémon não encontrado


## Async e Await

O `async` permite trabalhar com funções assíncronas.

O `await` espera uma Promise terminar antes de continuar o código.

O `fetch` é utilizado para fazer as requisições para as APIs.

Também é necessário verificar `response.ok`, porque o `fetch` não considera erros HTTP como erro automaticamente.

## Promise.all

O `Promise.all` pode ser mais rápido quando temos várias requisições independentes.

Com vários `await` separados, uma requisição pode esperar a anterior terminar.

Com `Promise.all`, várias Promises podem começar praticamente ao mesmo tempo e o programa espera todas terminarem.

Por isso, quando as requisições não dependem umas das outras, `Promise.all` pode aproveitar melhor o tempo de rede.

## Segurança

Para colocar dados recebidos das APIs na página foram utilizados `createElement` e `textContent`.

Não foi utilizado `innerHTML` para os dados das APIs, ajudando a evitar problemas de segurança como XSS.

## Como executar

Abra o arquivo `index.html` no navegador.

Depois pressione `F12` para abrir o Console do navegador.

É necessário estar conectado à internet para consultar as APIs.

## APIs utilizadas

ViaCEP:



https://viacep.com.br/


PokéAPI:



https://pokeapi.co/

:::

Estrutura final para o GitHub
Semana_05/
│
├── index.html
├── app.js
└── README.md


Essa versão fica bem básica e compatível com o que uma aluna de 1º período já teria aprendido, mas contempla os pontos importantes da atividade: objetos, arrays, filter, reduce, fetch, async/await, response.ok, try/catch/finally, APIs, DOM dinâmico, createElement, textContent, replaceChildren() e os quatro estados da tela.
