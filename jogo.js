console.log('[DevSoutinho] Flappy Bird');

// Gerencia o som de HIT
const somHit  = new Audio();
somHit.src    = './Efeitos/efeitos_hit.wav';

// Gerencia os sprites
const sprites = new Image();
sprites.src   = './sprites.png';

// Gerencia os canvas do jogo
const canvas = document.querySelector('canvas');

// Gerencia o contexto
const contexto = canvas.getContext('2d');

let frames = 0;




// [Plano de Fundo]
const planoDeFundo = {

  spriteX:  390,
  spriteY:  0,
  largura:  275,
  altura:   204,
  x:        0,
  y:        canvas.height - 204,
  
  /**
  * FUNCAO     : desenha
  * OBJETIVO   : desenha o plano de fundo na tela
  */
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


// [Chao]
function criaChao() {

  const chao = {
    spriteX :0,
    spriteY :610,
    largura :224,
    altura  :112,
    x       :0,
    y       :canvas.height - 112,

    atualiza(){
      const movimentoDoChao = 1;
      const repeteEm        = chao.largura / 2;
      const movimentacao    = chao.x - movimentoDoChao;
      chao.x 				= movimentacao % repeteEm;
    },

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

  return chao;
}

/// [mensagemGetReady] Tela de inicio
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w:  174,
  h:  152,
  x:  (canvas.width / 2) - 174 / 2,
  y:  50,
  
  /**
  * FUNCAO     : desenha
  * OBJETIVO   : desenha a mensagem "GET READY" na tela
  */
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







/**
 * FUNCAO     : fazColisao
 * OBJETIVO   : Testa se houve colisao
 * PARAMETROS : 
 * RETORNO    
 *            : true  (houve colisao)
 *            : false (nao houve colisao)
 */
function fazColisao(flappyBird, chao){
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY       = chao.y;

  // Verificando se o FlappyBird esta acima do chao
  if(flappyBirdY >= chaoY){
    return true;
  }

  return false;
}



/**
 * FUNCAO     : criaFlappyBird
 * OBJETIVO   : cria um objeto para o FlappyBird
 * PARAMETROS : 
 * RETORNO    : O objeto flappyBird
 */

function criaFlappyBird(){
  
  const flappyBird = {
    spriteX:    0,
    spriteY:    0,
    largura:    33,
    altura:     24,
    x:          10,
    y:          50,
    gravidade:  0.25,
    velocidade: 0,
	pulo:       4.6,
	
	movimentos:[
		{spriteX: 0, spriteY: 0},
		{spriteX: 0, spriteY: 26},
		{spriteX: 0, spriteY: 52},
	],

	frameAtual: 0,
  

    /**
    * FUNCAO     : pula
    * OBJETIVO   : fazer o flappyBird pular   
    */
    pula(){
        flappyBird.velocidade = - flappyBird.pulo;
    },
  

    /**
    * FUNCAO     : atualiza
    * OBJETIVO   : atualizar a posicao do flappyBird   
    */
    atualiza(){
      
    	/* Se houver colisao
    	é executado um som de hit e o jogo vai para a tela de inicio */
    	if(fazColisao(flappyBird, globais.chao)){
        	somHit.play();
    		mudaParaTela(telas.inicio);
    		return;
    	}
      
    	flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    	flappyBird.y          = flappyBird.y + flappyBird.velocidade;
	},
	
	atualizaOFrameAtual(){
		const baseDoIncremento = 1;
		const incremento = baseDoIncremento + flappyBird.frameAtual;
		const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
	},
  

    /**
    * FUNCAO     : desenha
    * OBJETIVO   : desenha o flappyBird na tela
    */
    desenha(){
		const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
		flappyBird.atualizaOFrameAtual();
    	contexto.drawImage(
        	sprites,                                        // Imagem
        	spriteX, spriteY,         // Ponto de referencia da imagem
        	flappyBird.largura, flappyBird.altura,          // Largura e altura do pedaco
        	flappyBird.x, flappyBird.y,                     // Ponto de referencia no canvas
        	flappyBird.largura, flappyBird.altura           // Largura e altura do pedaco
      	);
    }
  }

  return flappyBird;
}






const globais = {};

// Variavel para gerenciar a tela atual
let telaAtiva = {};



/** 
 * FUNCAO     : mudaParaTela
 * OBJETIVO   : Muda a tela atual do jogo
 * PARAMETRO  : A nova tela a ser exibida
*/
function mudaParaTela(novaTela){
  telaAtiva = novaTela;
  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
}



// Objeto que contem todas as telas do jogo
const telas = {

  // Tela de inicio
  inicio:{

    /** 
    * FUNCAO     : inicializa
    * OBJETIVO   : Inicializar o Flappy Bird
    */
    inicializa(){
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
    },

    /** 
    * FUNCAO     : desenha
    * OBJETIVO   : Chamar os metodos de desenho de cada elemento da tela de inicio
    */
    desenha(){
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
      mensagemGetReady.desenha();
    },

    /** 
    * FUNCAO     : atualiza
    * OBJETIVO   : Atualizar cada um dos itens na tela de inicio
    */
    atualiza(){
      globais.chao.atualiza();
    },

    /** 
    * FUNCAO     : click
    * OBJETIVO   : Acionar a tela de jogo
    */
    click(){
      mudaParaTela(telas.jogo);
    }
  },


  // Tela do jogo em acao
  jogo:{

    /** 
    * FUNCAO     : desenha
    * OBJETIVO   : Chamar os metodos de desenho de cada elemento em execucao no jogo
    */
    desenha(){
      planoDeFundo.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
    },

    /** 
    * FUNCAO     : click
    * OBJETIVO   : Acionar o comando para o Flappybird pular
    */
    click(){
      globais.flappyBird.pula();
    },

    /** 
    * FUNCAO     : atualiza
    * OBJETIVO   : Atualizar os itens em execucao no jogo
    */
    atualiza(){
      globais.flappyBird.atualiza();
    }
  }
}


/** 
* FUNCAO     : loop
* OBJETIVO   : Aciona a tela atual para comecar a ser renderizada infinitamente
*/
function loop(){
  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames = frames + 1;
  requestAnimationFrame(loop);                      // Realiza uma animação por meio de uma função específica
}


/** 
* FUNCAO     : anonima
* OBJETIVO   : Acionar o evento de click do mouse na tela atual
*/
window.addEventListener('click', function(){
  /* Testa se a tela atual tem o metodo click */
  if(telaAtiva.click){
    telaAtiva.click();
  }
})

mudaParaTela(telas.inicio);
loop();