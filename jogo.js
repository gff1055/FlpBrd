console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');




// [Plano de Fundo]
const planoDeFundo = {

  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  
  desenha() {
    contexto.fillStyle = '#70c5ce';                 // Cor do ceu
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};




/// [mensagemGetReady] Tela de inicio
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}




// [Chao]
const chao = {
  
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};




const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,

  atualiza(){
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },

  desenha(){
    contexto.drawImage(
      sprites,                                        // Imagem
      flappyBird.spriteX, flappyBird.spriteY,         // Ponto de referencia da imagem
      flappyBird.largura, flappyBird.altura,          // Largura e altura do pedaco
      flappyBird.x, flappyBird.y,                     // Ponto de referencia no canvas
      flappyBird.largura, flappyBird.altura           // Largura e altura do pedaco
    );
  }
}




let telaAtiva = {}




function mudaParaTela(novaTela){
  telaAtiva = novaTela
}




const telas = {

  inicio:{

    desenha(){
      mensagemGetReady.desenha();
    },

    atualiza(){

    }
  },

  jogo:{

    desenha(){
      planoDeFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
    },

    atualiza(){
      flappyBird.atualiza();
    }
  }
}




function loop(){
  requestAnimationFrame(loop);                      // Realiza uma animação por meio de uma função específica
}

mudaParaTela(telas.inicio);
loop();