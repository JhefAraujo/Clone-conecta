const express = require("express");
const app = express();
const port = 3000;

function gerarStringAleatoria(tamanho) {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var resultado = "";

    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
}

result = gerarStringAleatoria(15);

// Rota para a página inicial
app.get("/", (req, res) => {
    res.send('localhost:3000/' + result);
});

app.get(`/${result}`, (req, res) => {
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="pt-br">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="theme-color" content="#000000">
      <title>Catálogo</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap');
  
          @font-face {
              font-family: 'SuaFonte';
              src: url('vogue.ttf');
              src: url('vogue.ttf') format('truetype');
              /* Adicione outros formatos (e.g., woff2, ttf) conforme necessário para compatibilidade com navegadores */
          }
  
          * {
              padding: 0;
              margin: 0;
              box-sizing: border-box;
              scroll-behavior: smooth;
              font-family: 'Roboto', serif;
          }
  
          html,
          body {
              width: 100vw;
              overflow-x: hidden;
          }
  
          p {
              font-weight: 100;
          }
  
          main {
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              height: 100vh;
              overflow-x: hidden;
              font-weight: 400;
          }
  
          main h1 {
              font-size: 300%;
              text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
              font-weight: lighter;
              font-family: 'Noto Serif Display', serif;
          }
  
          main p {
              position: absolute;
              bottom: 10vh;
              left: 50vw;
              transform: translateX(-50%);
          }
  
          .filter {
              width: 100vw;
              height: 100vh;
              position: absolute;
              z-index: -1;
              top: 0;
              left: 0;
              filter: brightness(0.5);
              background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
          }
  
          .filter video {
              position: absolute;
              top: 0;
              left: 0;
              object-fit: cover;
              object-position: center top;
              height: 100vh;
              width: 100vw;
              z-index: -2;
              background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
          }
  
          .products {
              background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              row-gap: 25px;
              padding: 5vh;
              min-height: 100vh;
              width: 100vw;
              flex-direction: column;
              position: relative;
              z-index: 0;
          }
  
          .card {
              border-radius: 1px;
              height: 107vw;
              width: 87vw;
              overflow: hidden;
              position: relative;
              z-index: 1;
              outline: 1px solid rgba(255, 255, 255, 0.534);
              border-radius: 2px;
          }
  
          .card img {
              z-index: 0;
              width: 100%;
              min-height: 100%;
              object-fit: cover;
              transition-duration: 0.5s;
          }
  
          .card img:hover {
              transform: scale(1.1);
          }
  
          .cardInfo {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.7);
              -webkit-backdrop-filter: blur(5px);
              backdrop-filter: blur(5px);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 20%;
          }
  
          .visible {
              animation: reveal 1.5s;
          }
  
          .element {
              opacity: 0;
          }
  
          @keyframes reveal {
              0% {
                  opacity: 0;
                  filter: brightness(0);
              }
  
              100% {
                  opacity: 1;
                  filter: brightness(1);
              }
          }
  
          a {
              color: white;
          }
  
          .price {
              position: absolute;
              bottom: 5px;
              right: 5px;
              font-weight: 300;
          }
  
          .titulo {
              position: absolute;
              height: 1em;
              top: 8%;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              width: 95%;
              font-weight: 300;
              overflow: hidden;
              font-weight: bold;
          }
  
          .leftArrow {
              position: absolute;
              top: 45%;
              left: 0;
              transform: translateY(-50%);
              width: 50px;
              height: 50px;
              background-color: rgba(0, 0, 0, 0.6);
              -webkit-backdrop-filter: blur(5px);
              backdrop-filter: blur(5px);
              border-radius: 0 10px 10px 0;
              display: flex;
              align-items: center;
              justify-content: center;
          }
  
          .rightArrow {
              position: absolute;
              top: 45%;
              right: 0;
              transform: translateY(-50%);
              width: 50px;
              height: 50px;
              background-color: rgba(0, 0, 0, 0.6);
              -webkit-backdrop-filter: blur(5px);
              backdrop-filter: blur(5px);
              border-radius: 10px 0px 0px 10px;
              display: flex;
              align-items: center;
              justify-content: center;
          }
  
          .carousel {
              display: flex;
              transition-duration: 0.5s;
              transform: translateX(0);
              min-height: 100%;
          }
  
          .loader {
              background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
              display: flex;
              align-items: center;
              justify-content: center;
              position: fixed;
              top: 0;
              left: 0;
              z-index: 11;
              height: 100vh;
              width: 100vw;
              transition-duration: 1s;
          }
  
          header {
              position: fixed;
              z-index: 10;
              top: 1vh;
              height: 10vh;
              width: 85vw;
              background-color: rgba(0, 0, 0, 0.6);
              -webkit-backdrop-filter: blur(15px);
              backdrop-filter: blur(15px);
              overflow: hidden;
              left: 50%;
              transform: translateX(-50%);
              border-radius: 10vh;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: white;
              border: 1px solid rgba(7, 7, 7, 0.7);
          }
  
          header img {
              height: 10vh;
              width: 10vh;
              padding-top: 1vh;
              padding-bottom: 1vh;
              filter: drop-shadow(3px 3px 2px rgba(5, 5, 5, 1));
              z-index: 10;
              margin: auto;
              transition: all 0.5s;
          }
  
          .loader img {
              width: 80vw;
          }
  
          .buy {
              color: white;
              position: absolute;
              bottom: 2%;
              left: 50%;
              transform: translateX(-50%);
              padding: 10px;
              background-color: goldenrod;
              border-radius: 35px;
              width: 30%;
              text-align: center;
              height: 40px;
          }
  
          .quantity {
              color: white;
              position: absolute;
              bottom: 2%;
              left: 50%;
              transform: translateX(-50%);
              border-radius: 35px;
              width: 40%;
              text-align: center;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
          }
  
          .plus {
              background-color: goldenrod;
              border-radius: 50%;
              height: 100%;
              aspect-ratio: 1 / 1;
              display: flex;
              align-items: center;
              justify-content: center;
          }
  
          .minus {
              background-color: goldenrod;
              border-radius: 50%;
              height: 100%;
              aspect-ratio: 1 / 1;
              display: flex;
              align-items: center;
              justify-content: center;
          }
  
          .send {
              height: 8vh;
              width: 8vh;
              background-color: goldenrod;
              border-radius: 50%;
              animation: walk 0.5s ease-in-out;
              align-items: center;
              justify-content: center;
              transform: translateX(-1vh);
          }
  
          @keyframes walk {
              0% {
                  opacity: 0;
                  transform: translateX(-50px);
              }
  
              100% {
                  opacity: 1;
                  transform: translateX(-1vh);
              }
          }
  
          @keyframes reverseWalk {
              0% {
                  transform: translateX(0);
              }
  
              100% {
                  transform: translateX(-100%);
              }
          }
  
          @media screen and (min-width: 650px) {
              ::-webkit-scrollbar {
                  display: none;
              }
  
              .card {
                  width: 27vw !important;
                  height: 450px !important;
                  margin: auto;
              }
  
              #products {
                  display: grid;
                  margin: auto !important;
                  grid-template-columns: 1fr 1fr 1fr;
              }
  
              header {
                  width: 26vw !important;
              }
  
              .loader img {
                  width: 45vw !important;
              }
          }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,300&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap" rel="stylesheet">
      <script src="https://kit.fontawesome.com/2a683e0d82.js" crossorigin="anonymous"></script>
  </head>
  
  <body>
      <div class="loader">
          <img class="logo" src="https://raw.githubusercontent.com/JhefAraujo/Clone-conecta/0006c106a38a3a2358166227f9320cc91f684f39/logoVetor.svg" alt="Logo Mallorca">
      </div>
      <header>
          <img src="https://raw.githubusercontent.com/JhefAraujo/Clone-conecta/main/logowrite.svg" alt="Logo Mallorca">
          <p style="display: none;">enviar pedido -></p>
          <div style="display: none;" class="send" onclick="sendWhatsAppMessage()"></div>
      </header>
      <main>
          <h1>Verano</h1>
          <a href="#products">
              <p>Clique para explorar</p>
          </a>
          <div class="filter">
              <video src="https://github.com/JhefAraujo/Clone-conecta/raw/main/bgvideo.mp4" playsinline autoplay muted loop></video>
          </div>
      </main>
      <section class="products" id="products">
      </section>
      <script>
          var pedido = {};
          var quantidade = 0;
          function showQuantity(element) {
              parent = element.parentElement;
              minus = parent.children[4].children[0];
              plus = parent.children[4].children[2];
              parent.children[3].style.display = 'none';
              parent.children[4].style.display = 'flex';
              parent.children[4].children[1].innerHTML++;
              quantidade++;
              document.getElementsByTagName('header')[0].children[1].style.display = 'block';
              document.getElementsByTagName('header')[0].children[2].style.display = 'flex';
              document.getElementsByTagName('header')[0].children[0].style.margin = '0';
              carrinho();
          }
          function plusElem(element) {
              parentPlus = element.parentElement;
              parentPlus.children[1].innerHTML++;
              quantidade++;
              carrinho();
          }
          function minusElem(element) {
              parentPlus = element.parentElement;
              parentAbsol = parentPlus.parentElement;
              parentPlus.children[1].innerHTML--;
              if (parentPlus.children[1].innerHTML == 0) {
                  parentPlus.style.display = 'none';
                  parentAbsol.children[3].style.display = 'block';
              }
              quantidade--;
              carrinho();
          }
          function carrinho() {
              document.getElementsByTagName('header')[0].children[2].innerHTML = quantidade;
              if (quantidade == 0) {
                  document.getElementsByTagName('header')[0].children[1].style.display = 'none';
                  document.getElementsByTagName('header')[0].children[2].style.display = 'none';
                  document.getElementsByTagName('header')[0].children[0].style.margin = 'auto';
              }
          }
          async function fetchAndAppend() {
              url = 'https://script.google.com/macros/s/AKfycbzUAPR0RI1BkPc5n17zGMnzWam-JKpT9ICzc-0gs6_V5Q22UmLfviLLar9Me-Y2SUCSew/exec';
              response = await fetch(url);
              brute = await response.json();
              for (let i = 0; i < brute.length; i++) {
                  const element = brute[i];
                  imagem = element[0].split(' ');
                  if (element[8] == "Verano") {
                      criaCard = document.createElement('div');
                      criaCard.setAttribute('class', 'card element');
                      criaCard.innerHTML = \`<div class="carousel"><img src="\${imagem[0]}"alt=""></div>
                                              <div class="cardInfo"><p class="titulo">\${element[2].slice(11)}</p></div>
                                              <p class="price">R$\${element[6]},00</p>
                                              <p onclick="showQuantity(this)" class="buy">Eu quero!</p>
                                              <div style="display: none;" class="quantity">
                                              <div onclick="minusElem(this)" class="minus">-</div>
                                              <p class="numb"></p>
                                              <div onclick="plusElem(this)" class="plus">+</div>
                                              </div>\`
                      document.getElementById('products').appendChild(criaCard);
                      if (imagem.length > 1) {
                          criaCard.innerHTML += '<div class="leftArrow" onclick="carouselleft(this)"><i class="fa-solid fa-arrow-left fa-lg"></i></div><div class="rightArrow" onclick="carouselright(this)"><i class="fa-solid fa-arrow-right fa-lg"></i></div>'
                          criaCard.children[0].innerHTML = \`<div class="carousel">
                  <img src="\${imagem[0]}"alt="">
                  <img src="\${imagem[1]}"alt="">
              </div>\`
  
                      }
                  }
              }
              document.getElementsByClassName('loader')[0].style.opacity = '0';
              setTimeout(() => {
                  document.getElementsByClassName('loader')[0].style.display = 'none';
              }, 1000);
          }
          fetchAndAppend();
          window.addEventListener("load", function () {
              setTimeout(function () {
                  // This hides the address bar:
                  window.scrollTo(0, 1);
              }, 0);
          });
          window.addEventListener('scroll', () => {
              produto = document.getElementsByClassName('card');
              for (let i = 0; i < produto.length; i++) {
                  const element = produto[i];
                  if (element.getBoundingClientRect().y < 600) {
                      element.setAttribute("class", "visible card");
                  }
              }
          });
          function carouselright(element) {
              element.parentElement.children[0].style.transform = 'translateX(-100%)';
          }
          function carouselleft(element) {
              element.parentElement.children[0].style.transform = 'translateX(0)';
          }
          function sendWhatsAppMessage() {
              // Número de telefone e mensagem
              var phoneNumber = '11990199155';
              var message = 'Sua mensagem aqui';
  
              // Imagem base64 (substitua 'SUA_IMAGEM_BASE64' com a sua imagem real em base64)
              var imageBase64 = 'data:image/png;base64,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';
  
              // Construa o link do WhatsApp com a imagem
              var whatsappLink = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message) + '&attachment=' + encodeURIComponent(imageBase64);
  
              // Abra o link no WhatsApp
              window.open(whatsappLink);
          }
      </script>
  </body>
  
  </html>
  `;
    res.send(htmlContent);
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
