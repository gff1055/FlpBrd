console.log('[DevSoutinho] Flappy Bird');

// Gerencia o som de HIT
const somHit  = new Audio();						
somHit.src    = './Efeitos/efeitos_hit.wav';

// Gerencia os sprites
const sprites = new Image();						
sprites.src   = './sprites.png';

const canvas = document.querySelector('canvas');	// Gerencia os canvas do jogo
const contexto = canvas.getContext('2d');			// Gerencia o contexto
let frames = 0;										// Gerencia os frames do jogo




// [Plano de Fundo]
const planoDeFundo = {

	spriteX: 390,			// Posicoes da Sprite do plano de fundo
	spriteY: 0,
	largura: 275,			// Dimensoes da Sprite
	altura: 204,
	x: 0,					// Posicao no canvas
	y: canvas.height - 204,
  
	/**
	* FUNCAO     : desenha
	* OBJETIVO   : desenha o plano de fundo na tela
	*/
	desenha(){
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


/**
 * FUNCAO     : criaChao
 * OBJETIVO   : cria um objeto para o Chao
 * RETORNO    : O objeto chao
 */
function criaChao(){
	const chao = {
		spriteX :0,						// Posicao X da sprite do chao
    	spriteY :610,					// Posicao Y da sprite do chao
		largura :224,					// Largua da Sprite do chao
    	altura  :112,					// Altura da Sprite do chao
		x       :0,						// Posicao X no canvas
    	y       :canvas.height - 112,	// Posicao Y no canvas


		/**
    	* FUNCAO     : criaChao.atualiza
    	* OBJETIVO   : atualiza os valores relativos ao chao   
    	*/
		atualiza(){
			const movimentoDoChao	= 1;
    		const repeteEm			= chao.largura / 2;
    		const movimentacao		= chao.x - movimentoDoChao;
			chao.x 					= movimentacao % repeteEm;
    	},


		/**
    	* FUNCAO     : criaChao.desenha
    	* OBJETIVO   : desenha o chao com base nos valores atuais   
    	*/
		desenha(){
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

	sX: 134,							// Posicao X da sprite da mensagem
	sY: 0,								// Posicao Y da sprite da mensagem
	w:  174,							// Largua da Sprite da mensagem
	h:  152,							// Altura da Sprite do chao
	x:  (canvas.width / 2) - 174 / 2,	// Posicao X no canvas
	y:  50,								// Posicao Y no canvas
  

	/**
	* FUNCAO     : desenha
	* OBJETIVO   : desenha a mensagem "GET READY" na tela
	*/
	desenha(){
		contexto.drawImage(
			sprites,
			mensagemGetReady.sX, mensagemGetReady.sY,
			mensagemGetReady.w, mensagemGetReady.h,
			mensagemGetReady.x, mensagemGetReady.y,
			mensagemGetReady.w, mensagemGetReady.h
		);
	}
}


/// [mensagemGameOver] Tela de inicio
const mensagemGameOver = {

	sX: 134,							// Posicao X da sprite da mensagem
	sY: 153,								// Posicao Y da sprite da mensagem
	w:  226,							// Largua da Sprite da mensagem
	h:  200,							// Altura da Sprite da mensagem
	x:  (canvas.width / 2) - 226 / 2,	// Posicao X no canvas
	y:  50,								// Posicao Y no canvas

	/**
	* FUNCAO     : desenha
	* OBJETIVO   : desenha a mensagem "GET READY" na tela
	*/
	desenha(){
		contexto.drawImage(
			sprites,
			mensagemGameOver.sX, mensagemGameOver.sY,
			mensagemGameOver.w, mensagemGameOver.h,
			mensagemGameOver.x, mensagemGameOver.y,
			mensagemGameOver.w, mensagemGameOver.h
		);
	}
}

/* Pontuacao das medalhas */
ranking = {
	normalSpriteX: 0,
	normalSpriteY: 77,
	ouroSpriteX: 0,
	ouroSpriteY: 123,
	prataSpriteX: 48,
	prataSpriteY: 77,
	bronzeSpriteX: 48,
	bronzeSpriteY: 123,
}


/* Objeto para definir e carregar a medalha */
medalha = {
	sX: ranking.normalSpriteX,							// Posicao X da sprite da mensagem
	sY: ranking.normalSpriteY,								// Posicao Y da sprite da mensagem
	w:  45,							// Largua da Sprite da mensagem
	h:  46,							// Altura da Sprite do chao
	x:  75,	// Posicao X no canvas
	y:  135,								// Posicao Y no canvas

	//prata
	//sX: 48,							// Posicao X da sprite da mensagem
	//sY: 77,								// Posicao Y da sprite da mensagem
  
	//ouro
	//sX: 0,							// Posicao X da sprite da mensagem
	//sY: 123,								// Posicao Y da sprite da mensagem

	//bronze
	//sX: 48,							// Posicao X da sprite da mensagem
	//sY: 123,								// Posicao Y da sprite da mensagem

	inicializa(){
		this.sX = ranking.normalSpriteX;							// Posicao X da sprite da mensagem
		this.sY = ranking.normalSpriteY;								// Posicao Y da sprite da mensagem
		this.w = 45;							// Largua da Sprite da mensagem
		this.h = 46;							// Altura da Sprite do chao
		this.x = 75;	// Posicao X no canvas
		this.y = 135;
	},
	

	/*
	FUNCAO: loadType
	OBJETIVO: Carregar os dados da medalha que o player conseguiu
	PARAMETRO: A pontuacao do player
	*/

	loadType(pPontuacao){
		if(pPontuacao>=16 && pPontuacao<30){
			medalha.sX = ranking.bronzeSpriteX;
			medalha.sY = ranking.bronzeSpriteY;
		}
		else if(pPontuacao>=31 && pPontuacao<45){
			medalha.sX = ranking.prataSpriteX;
			medalha.sY = ranking.prataSpriteY;
		}
		else if(pPontuacao>=45){
			medalha.sX = ranking.ouroSpriteX;
			medalha.sY = ranking.ouroSpriteY;
		}
	},
	

	/**
	* FUNCAO     : desenha
	* OBJETIVO   : desenha a mensagem "GET READY" na tela
	*/
	
	desenha(){
		//console.log(this);
		medalha.loadType(globais.placar.pontuacao);
		contexto.drawImage(
			sprites,
			medalha.sX, medalha.sY,
			medalha.w, medalha.h,
			medalha.x, medalha.y,
			medalha.w, medalha.h
		);
	}
}







/**
 * FUNCAO     : fazColisao
 * OBJETIVO   : Testa se houve colisao
 * PARAMETROS :
 * 
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
		spriteX: 0,			// Posicao X da sprite do flappy bird	
		spriteY: 0,			// Posicao Y da sprite do flappy bird	
		largura: 33,		// Largura da sprite do flappy bird
		altura: 24,			// Altura da sprite do flappy bird
		x: 10,				// Posicao X no canvas
		y: 50,				// Posicao Y no canvas
		gravidade: 0.12,	// Gravidade sobre o flappy bird
		velocidade: 0,		// Velocidade do flappy bird
		pulo: 2,			// Pulo do flappy bird

		movimentos:[
			{spriteX: 0, spriteY: 0},
			{spriteX: 0, spriteY: 26},
			{spriteX: 0, spriteY: 52},
			{spriteX: 0, spriteY: 26},
		],

		frameAtual: 0,
  

    	/**
    	* FUNCAO     : flappybird.pula
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
    			mudaParaTela(telas.gameOver);
				return;
			}

			flappyBird.velocidade = flappyBird.velocidade + (flappyBird.gravidade/2);
    		flappyBird.y          = flappyBird.y + flappyBird.velocidade;
		},

		/**
    	* FUNCAO     : atualizaOFrameAtual
    	* OBJETIVO   : atualizar o frameatual para ajudar na renderizacao das asas do flappy bird 
    	*/
		atualizaOFrameAtual(){
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

			// Se passar o intervalo o flappy bird bate a asa...
			if(passouOIntervalo){
				const baseDoIncremento = 1;
				const incremento = baseDoIncremento + flappyBird.frameAtual;
				const baseRepeticao = flappyBird.movimentos.length;

				// manipulando o bater de asas...
				flappyBird.frameAtual = incremento % baseRepeticao;
			}
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
        		spriteX, spriteY,         						// Ponto de referencia da imagem
        		flappyBird.largura, flappyBird.altura,          // Largura e altura do pedaco
        		flappyBird.x, flappyBird.y,                     // Ponto de referencia no canvas
        		flappyBird.largura, flappyBird.altura           // Largura e altura do pedaco
			);  
		}
	}
  	return flappyBird;
}



/**
    	* FUNCAO     : criaCanos
    	* OBJETIVO   : cria os diversos canos na tela
*/
function criaCanos(){
	const canos = {

		/**Dimensões do cano */
		largura: 52,
		altura: 400,

		/** Valores dos sprites dos canos */
		chao:{
			spriteX: 0,
			spriteY: 169,
		},
		ceu:{
			spriteX: 52,
			spriteY: 169,
		},

		espaco: 80,

		espacamentoEntreCanos: 200,


		/**
    	* FUNCAO     : desenha
    	* OBJETIVO   : desenha os canos na tela
		*/
		desenha(){

			/** Desenha os pares da canos*/
			canos.pares.forEach(function(par){

				const yRandom = par.y;
				//const espacamentoEntreCanos = 200;
				const canoCeuX = par.x;
				const canoCeuY = yRandom; 
		
				// [Cano do Céu]
				contexto.drawImage(
					sprites, 
					canos.ceu.spriteX, canos.ceu.spriteY,
					canos.largura, canos.altura,
					canoCeuX, canoCeuY,
					canos.largura, canos.altura,
				)
				
				// [Cano do Chão]
				const canoChaoX = par.x;
				const canoChaoY = canos.altura + canos.espacamentoEntreCanos + yRandom; 
				
				contexto.drawImage(
					sprites, 
					canos.chao.spriteX, canos.chao.spriteY,
					canos.largura, canos.altura,
					canoChaoX, canoChaoY,
					canos.largura, canos.altura,
				)
		
				/* pares de canos*/
				par.canoCeu = {
					x: canoCeuX,
					y: canos.altura + canoCeuY
				}

				par.canoChao = {
					x: canoChaoX,
					y: canoChaoY
				}
			})
			

		},



		temColisaoComOFlappyBird(par){

			const cabecaDoFlappy = globais.flappyBird.y;
			const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
			
			if(globais.flappyBird.x + globais.flappyBird.largura >= par.x){
				console.log("flappy bird invadiu");
				if(cabecaDoFlappy <= par.canoCeu.y){
					return true;
				}
				if(peDoFlappy >= par.canoChao.y){
					return true;
				}
			}
			return false;
		},


		pares: [],


		atualiza(){
			
			const passou100frames = frames % 100 === 0;
			
			if(passou100frames){
				canos.pares.push({
					x: canvas.width,
					y: -150 * (Math.random() + 1)
				});
				canos.espacamentoEntreCanos = canos.espacamentoEntreCanos - 2;
			}			
			canos.pares.forEach(function(par){
				par.x = par.x - 2;
				if(canos.temColisaoComOFlappyBird(par)){
					mudaParaTela(telas.gameOver);
					somHit.play();
				}
				if(par.x + canos.largura <= 0){
					canos.pares.shift();
				}
			});
		}
	}
	
	return canos;
  
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

/** 
 * FUNCAO	: criaPlacar
 * OBJETIVO	: Mostra a pontuacao do jogador
 * RETORNO	: informações do placar
*/
function criaPlacar(){
	const placar = {

			pontuacao: 0,

			inicializa(){
				medalha.inicializa();	
			},

			desenha(){
				contexto.font = "24px 'Press Start 2P'";
				contexto.textAlign = 'right';
				contexto.fillStyle = 'white';
				contexto.fillText(`${placar.pontuacao} pts`, canvas.width-10, 35);
				//placar.pontuacao;
			},

			atualiza(){
				const intervalo_de_frames = 100;
				const passou_o_intervalo = frames % intervalo_de_frames === 0;
			
				if(passou_o_intervalo){
					placar.pontuacao = placar.pontuacao + 1;
			}
		}

	}
	return placar;
}


// Objeto que contem todas as telas do jogo
const telas = {

	// Tela de inicio
	inicio:{

	    /** 
	    * FUNCAO     : inicializa
	    * OBJETIVO   : Inicializar os componentes do jogo
	    */
		inicializa(){
			globais.flappyBird = criaFlappyBird();
			globais.chao = criaChao();
			globais.canos = criaCanos();

			globais.placar = criaPlacar();
			globais.placar.inicializa();
		},


    	/** 
    	* FUNCAO     : desenha
    	* OBJETIVO   : Chamar os metodos de desenho de cada elemento da tela de inicio
    	*/
		desenha(){
			planoDeFundo.desenha();
			globais.flappyBird.desenha();
			
			globais.chao.desenha();
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

		inicializa(){
			
		},

    	/** 
    	* FUNCAO     : desenha
    	* OBJETIVO   : Chamar os metodos de desenho de cada elemento em execucao no jogo
    	*/
		desenha(){
			planoDeFundo.desenha();
			globais.canos.desenha();
			globais.chao.desenha();
			globais.flappyBird.desenha();
			globais.placar.desenha();
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
			globais.canos.atualiza();
			globais.chao.atualiza();
			globais.flappyBird.atualiza();
			globais.placar.atualiza();
		}

	},

	gameOver:{
		desenha(){
			mensagemGameOver.desenha();
			medalha.desenha();
		},

		atualiza(){

		},

		click(){
			setTimeout(function(){
				mudaParaTela(telas.inicio);
				console.log("FUI EXECUTADDDO");
			}, 1000);
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

});

mudaParaTela(telas.inicio);
loop();