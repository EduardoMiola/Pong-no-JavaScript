// variaveis da Bola
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;

// variaveis da velocidade
let vel_x_bola = 6;
let vel_y_bola = 6;


//variaveis da raquete
let xRaquete = 8;
let yRaquete = 150;
let raqueteCompr = 15;
let raqueteAltura = 90;

//varaiveis do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let vel_y_oponente;

//placar do jogo
let meusPontos = 0;
let oponentePontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;
let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentoBola();
  colisaoBola();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  colisaoMinhaRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoMinhaRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBola(){
  circle(xBola, yBola, diametro)
}

function mostraRaquete(x,y){
    rect(x, y, raqueteCompr, raqueteAltura)
}

function movimentoBola(){
  xBola += vel_x_bola;
  yBola += vel_y_bola;
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
}


function colisaoBola(){
  if (xBola + raio > width || xBola - raio < 0 ){
    vel_x_bola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0){
    vel_y_bola *= -1;
  }
}

function colisaoMinhaRaquete(x,y){
  colidiu = collideRectCircle(x, y, raqueteCompr, raqueteAltura, xBola, yBola, raio)
  if(colidiu){
    vel_x_bola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente (){
  vel_y_oponente = yBola - yRaqueteOponente - raqueteCompr/2 - 50;
  yRaqueteOponente += vel_y_oponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text("pong do dudu", 325, 26);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(oponentePontos, 470, 26);
}

function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23
    }
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola <10){
    oponentePontos +=1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}