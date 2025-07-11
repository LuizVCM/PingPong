 // seleciona o canvas da página onde o jogo vai acontecer
 const canvas = document.getElementById('game');

 // Pega o contexto 2d do canvas para desenhar as nossas formas, imagens e tudo o que vossa criatividade precisar :0

 const ctx = canvas.getContext('2d')

 // Seleciona o elemento html que vai mostrar la pontuacíon del jugador
 const scoreDisplay = document.getElementById('score')

 // Objeto que representa a raquete que o jogador controla
 const raquete = {
    x: 10, // posição horixontal da raquete (ela fica fixa perto do lado esquerdo)
    y: canvas.height / 2 - 40, // posição vertical inicial (centraliza na tela)
    largura: 10, // largura da raquete
    altura: 80, // altura da nossa raquete
    velocidade: 12 // velocidade com que a raquete se move opara cima e para baixo

 }
 // Objeto que representa a bola do jogo
 const bola = {
    x: canvas.width / 2, // poiciona horizontal inicial (no meio do canvas)
    y: canvas.height / 2, // na vertical também
    raio: 10,             // tamanho da bola (raio do círculo)
    dx: 6,      // velocidade e direção horizontal da bola (4px por frame)
    dy: 6     // velocidade e direção vertical da bola (tbm 4px por frame)

 }
 // variável que guarda a pontuação do jogador (começa com 0)
 let pontuacao = 0
 // variável para saber se o jogo acabou (inicialmente falso)
 let jogoAcabou = false
 // Objeto que vai guardarse as teclas de "seta para cima" estiver pressionada
 const teclas ={
    ArrowUp: false, // vai ser true quando a seta para cima estiver pressionada
    ArrowDown: false // tbm true quando a tecla para baixo estiver pressionada
 }
 // Adicionada um "ouvinte" para quando uma tecla for pressionada
 document.addEventListener('keydown', (evento) => {
    if( evento.key === 'ArrowUp' ) teclas.ArrowUp = true // marca que a seta para cima está pressionada
    if(evento.key === 'ArrowDown') teclas.ArrowDown = true // marca que a seta para baixo está pressionada
 }) 
 // Adiciona um "ouvinte" para quando a tecla for solta
 document.addEventListener('keyup', (evento) => {
    if(evento.key === 'ArrowUp') teclas.ArrowUp = false // marca que a 'seta para cima' for solta
    if(evento.key === 'ArrowDown') teclas.ArrowDown = false // queca que a 'seta para baixo' for solta
 })
 //Função que atualiza a lógica do jogo emcada frame
 function atualizar(){
    if(jogoAcabou) return // se o jogo acabou, para a atualização
    // Move a raquete para cima se a tecla 'seta para cima' estiver pressionada
    if(teclas.ArrowUp) raquete.y -= raquete.velocidade
    // Move a raquete para baixo se a tecla 'seta para baixo' estiver pressionada
    if(teclas.ArrowDown) raquete.y += raquete.velocidade // Impede que a raquete ultrapasse o limite superior da tela
    if(raquete.y < 0) raquete.y = 0 // Impede que a raquete ultrapasse o limite inferior da tela
    if(raquete.y + raquete.altura > canvas.height){
        raquete.y = canvas.height - raquete.altura
    }
    // Atualiza a posição horizontal da bola e somando a velocidade 'dx'
    bola.x += bola.dx 
    // Fazemos isso para a posição vertical tbm
    bola.y += bola.dy
    // verifica se a bola bateu no topo da tela
    if(bola.y - bola.raio < 0){
      bola.dy *= -1 // Inverte a direção vertical da bola para baixo
    }
    // verifica se a bola bateu na parte inferior da tela
    if(bola.y + bola.raio > canvas.height) {
      bola.dy *= -1 //  Inverte a direção da bola para cima
    }
    // verifica se a bola está colidindo com a raquete
    if(bola.x - bola.raio < raquete.x + raquete.largura && // a bola chegou na largura da raquete
      bola.y > raquete.y && 
      bola.y < raquete.y + raquete.altura // a bola está acima da base da raquete

   ){
      bola.dx *= -1 // Inverte a direção horizontal da bola (rebate para a direita)
      pontuacao++ // incrementa a pontuação do jogador
      scoreDisplay.textContent = pontuacao // atualiza a pontuação na tela
   }
   // verifica se a bola saiu pela esquerda da tela (perdeu, playboy)
   if(bola.x - bola.raio < 0){
      jogoAcabou = true  // marca que o jogo terminou
      // Espera um pouquinho antes de mostrar o alerta para o jogador
      setTimeout(() => {
         alert(`Fim do jogo! Perdeu, cara! ❌❌❌❌❌. Sua pontuação é: ${pontuacao}`)
         document.location.reload() //recarrega a página para reiniciar o jogo
      }, 100)
   }
   //  verifica se a bola bateu na parede direiuta da tela
   if(bola.x + bola.raio > canvas.width){
      bola.dx *= -1 // Inverte a direção horizontal da bola (rebate para esquerda)
   }
 }

 // Função que desenha todos os elementos na tela
 function desenhar(){
   ctx.clearRect(0, 0, canvas.width, canvas.height)  // limpa a tela para desenhar l próximo frame
   // desenha a raquete (retÂngulo)
   ctx.fillStyle = 'white' // define  cor do preenchimento
   ctx.fillRect(raquete.x, raquete.y, raquete.largura, raquete.altura)
   // desenhando a bola
   ctx.beginPath()
   ctx.arc(bola.x, bola.y, bola.raio, 0 , Math.PI * 2)
   ctx.fillStyle = 'red'
   ctx.fill()
   ctx.closePath()
 }
 // Função que roda o loop do jogo
 function loopDoJogo(){
   atualizar() // Atualiza a lógica do jogo
   desenhar() // desenha os elementos na tela
   // continua o loop enquanto o jogo não acabou
   if(!jogoAcabou){
      requestAnimationFrame(loopDoJogo)  // Chama o loop novamente no próximo frame
   }
 }
 loopDoJogo()  // começa o jogo chamando o loop pela primeira vez