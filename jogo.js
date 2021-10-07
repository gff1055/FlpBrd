console.log('[DevSoutinho] Flappy Bird');

const somHit  = new Audio();						// Gerencia o som de HIT
somHit.src    = './Efeitos/efeitos_hit.wav';

const sprites = new Image();						// Gerencia os sprites
sprites.src   = './sprites.png';

const canvas = document.querySelector('canvas');	// Gerencia os canvas do jogo
const contexto = canvas.getContext('2d');			// Gerencia o contexto
let frames = 0;										// Gerencia os frames do jogo




// [Plano de Fundo]
const planoDeFundo =
{
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
	desenha()
	{
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
function criaChao()
{
	const chao =
	{
		
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
		atualiza()
		{
			const movimentoDoChao	= 1;
    		const repeteEm			= chao.largura / 2;
    		const movimentacao		= chao.x - movimentoDoChao;
    		chao.x 					= movimentacao % repeteEm;
    	},

		/**
    	* FUNCAO     : criaChao.desenha
    	* OBJETIVO   : desenha o chao com base nos valores atuais   
    	*/
		desenha()
		{
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
const mensagemGetReady =
{
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
	desenha()
	{
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
 * 
 * RETORNO    
 *            : true  (houve colisao)
 *            : false (nao houve colisao)
 */
function fazColisao(flappyBird, chao){

	const flappyBirdY = flappyBird.y + flappyBird.altura;
	const chaoY       = chao.y;	

	// Verificando se o FlappyBird esta acima do chao
	if(flappyBirdY >= chaoY)
	{
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

function criaFlappyBird()
{
	const flappyBird =
	{
		spriteX: 0,			// Posicao X da sprite do flappy bird	
		spriteY: 0,			// Posicao Y da sprite do flappy bird	
		largura: 33,		// Largura da sprite do flappy bird
		altura: 24,			// Altura da sprite do flappy bird
		x: 10,				// Posicao X no canvas
		y: 50,				// Posicao Y no canvas
		gravidade: 0.25,	// Gravidade sobre o flappy bird
		velocidade: 0,		// Velocidade do flappy bird
		pulo: 4.6,			// Pulo do flappy bird

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
		pula()
		{
			flappyBird.velocidade = - flappyBird.pulo;
		},
  

    	/**
    	* FUNCAO     : atualiza
    	* OBJETIVO   : atualizar a posicao do flappyBird   
    	*/
		atualiza()
		{
    		/* Se houver colisao
    		é executado um som de hit e o jogo vai para a tela de inicio */
			if(fazColisao(flappyBird, globais.chao))
			{
				somHit.play();
    			mudaParaTela(telas.inicio);
    			return;
			}
      
    		flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    		flappyBird.y          = flappyBird.y + flappyBird.velocidade;

		},

		/**
    	* FUNCAO     : atualizaOFrameAtual
    	* OBJETIVO   : atualizar o frameatual para ajudar na renderizacao das asas do flappy bird 
    	*/
		atualizaOFrameAtual()
		{
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;

			if(passouOIntervalo)
			{
				const baseDoIncremento = 1;
				const incremento = baseDoIncremento + flappyBird.frameAtual;
				const baseRepeticao = flappyBird.movimentos.length;
				flappyBird.frameAtual = incremento % baseRepeticao;
			}
		},
  

    	/**
    	* FUNCAO     : desenha
    	* OBJETIVO   : desenha o flappyBird na tela
    	*/
		desenha()
		{
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

function criaCanos()
{
	const canos =
	{
		largura: 52,
		altura: 400,

		chao:{
			spriteX: 0,
			spriteY: 169,
		},

		ceu:{
			spriteX: 52,
			spriteY: 169,
		},

		espaco: 80,

		desenha()
		{
			const espacamentoEntreCanos = 40;
			const yRandom = -150;

			const canoCeuX = 220;
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
			const canoChaoX = 220;
			const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
			
			contexto.drawImage(
				sprites,
				canos.chao.spriteX, canos.chao.spriteY,
				canos.largura, canos.altura,
				canoChaoX, canoChaoY,
				canos.largura, canos.altura,
			)
		},
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
function mudaParaTela(novaTela)
{
	telaAtiva = novaTela;

	if(telaAtiva.inicializa)
	{
		telaAtiva.inicializa();
	}
}



// Objeto que contem todas as telas do jogo
const telas = 
{
	// Tela de inicio
	inicio:
	{
	    /** 
	    * FUNCAO     : inicializa
	    * OBJETIVO   : Inicializar os componentes do jogo
	    */
		inicializa()
		{
			globais.flappyBird = criaFlappyBird();
			globais.chao = criaChao();
			globais.canos = criaCanos();
		},


    	/** 
    	* FUNCAO     : desenha
    	* OBJETIVO   : Chamar os metodos de desenho de cada elemento da tela de inicio
    	*/
		desenha()
		{
			planoDeFundo.desenha();
			globais.chao.desenha();
			globais.flappyBird.desenha();
			globais.canos.desenha();
			//mensagemGetReady.desenha();
		},


	    /** 
	    * FUNCAO     : atualiza
	    * OBJETIVO   : Atualizar cada um dos itens na tela de inicio
	    */
		atualiza()
		{
			globais.chao.atualiza();
		},


    	/** 
    	* FUNCAO     : click
    	* OBJETIVO   : Acionar a tela de jogo
    	*/
		click()
		{
			mudaParaTela(telas.jogo);
		}
	},


	// Tela do jogo em acao
	jogo:
	{
    	/** 
    	* FUNCAO     : desenha
    	* OBJETIVO   : Chamar os metodos de desenho de cada elemento em execucao no jogo
    	*/
		desenha()
		{
			planoDeFundo.desenha();
			globais.chao.desenha();
			globais.flappyBird.desenha();
		},

    	/** 
    	* FUNCAO     : click
    	* OBJETIVO   : Acionar o comando para o Flappybird pular
    	*/
		click()
		{
			globais.flappyBird.pula();
		},

	    /** 
	    * FUNCAO     : atualiza
	    * OBJETIVO   : Atualizar os itens em execucao no jogo
	    */
		atualiza()
		{
			globais.flappyBird.atualiza();
		}

	}

}


/** 
* FUNCAO     : loop
* OBJETIVO   : Aciona a tela atual para comecar a ser renderizada infinitamente
*/
function loop()
{
	telaAtiva.desenha();
	telaAtiva.atualiza();
	frames = frames + 1;
	requestAnimationFrame(loop);                      // Realiza uma animação por meio de uma função específica
}


/** 
* FUNCAO     : anonima
* OBJETIVO   : Acionar o evento de click do mouse na tela atual
*/
window.addEventListener('click', function()
{
	/* Testa se a tela atual tem o metodo click */
	if(telaAtiva.click)
	{
		telaAtiva.click();
	}

});

mudaParaTela(telas.inicio);
loop();