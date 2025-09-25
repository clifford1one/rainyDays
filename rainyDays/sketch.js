//variables globales
let colors = [];
let parawa = [false, false, false, false];
let lloviendo = [false, false, false, false];
let gotas = [];
//https://p5js.org/reference/p5/Array/

function setup() {
  createCanvas(640, 360);

  // variables de color, esto me permite hacer pruebas de manera más expedita
  colors[0] = color(187, 189, 246);
  colors[1] = color(152, 147, 218);
  colors[2] = color(121 - 30, 122 - 30, 158);
  colors[3] = color(79, 91, 134);

  noStroke();
  soundFormats("mp3");
  volumenLluvia = 0;

  // Iniciar la canción
  weveGot.loop();
  weveGot.setVolume(0.5);

  // Configurar sonido de lluvia
  xubasco.loop();
  xubasco.setVolume(0);
}

function draw() {
  background(200);

  // Dibujar las 4 secciones
  for (let i = 0; i < 4; i++) {
    // Fondo de la sección
    fill(colors[i]);
    rect(i * 160, 0, 160, height);

    // Dibujar lluvia si está activa
    if (lloviendo[i]) {
      hacerLluvia(i);
      dibujarLluvia();
    }

    // dibujo un fondo para que la lluvia no se vea por debajo del paraguas
    if (parawa[i]) {
      noStroke();
      fill(colors[i]);
      rect(i * 160, height / 2 - 50, 160, 100);
    }
  }

  // Dibujar personajes
  for (let i = 0; i < 4; i++) {
    let x = i * 160 + 30; // Posición X centrada
    //https://p5js.org/es/reference/p5/for/

    if (parawa[i]) {
      // Versión con paraguas. los utilizo números decimales para que el clace con la imagen en estado neutral sea perfecto.
      if (i == 0) image(reyPalomoParawa, x - 6, height / 2 - 62, 102, 128);
      if (i == 1) image(wonejoParawa, x - 3, height / 2 - 61, 81, 121);
      if (i == 2)
        image(washintonParawa, x - 6.5, height / 2 - 64.5, 98.2, 124.5);
      if (i == 3) image(asraelParawa, x - 3.2, height / 2 - 61.8, 94.6, 121.8);
    } else if (lloviendo[i]) {
      // Versión triste, cuando llueve sin paraguas
      if (i == 0) image(reyPalomoSad, x, height / 2 - 30, 90, 96);
      if (i == 1) image(wonejoSad, x, height / 2 - 30, 75, 90);
      if (i == 2) image(washintonSad, x, height / 2 - 30, 85, 90);
      if (i == 3) image(asraelSad, x, height / 2 - 30, 85, 90);
    } else {
      // Versión neutral/feliz
      if (i == 0) image(reyPalomo, x, height / 2 - 30, 90, 96);
      if (i == 1) image(wonejo, x, height / 2 - 30, 75, 90);
      if (i == 2) image(washinton, x, height / 2 - 30, 85, 90);
      if (i == 3) image(asrael, x, height / 2 - 30, 85, 90);
    }
  }

  //teclas (interfaz de usuario)
  push();
  imageMode(CENTER);
  image(key1, (width / 24) * 2, (height / 5) * 4, 40, 40);
  image(keyQ, (width / 24) * 4, (height / 5) * 4, 40, 40);

  image(key2, (width / 24) * 8, (height / 5) * 4, 40, 40);
  image(keyW, (width / 24) * 10, (height / 5) * 4, 40, 40);

  image(key3, (width / 24) * 14, (height / 5) * 4, 40, 40);
  image(keyE, (width / 24) * 16, (height / 5) * 4, 40, 40);

  image(key4, (width / 24) * 20, (height / 5) * 4, 40, 40);
  image(keyR, (width / 24) * 22, (height / 5) * 4, 40, 40);
  pop();
  //https://p5js.org/reference/p5/image/

  // Controlar sonido de lluvia
  let seccionesLluvia = 0;
  for (let i = 0; i < 4; i++) {
    if (lloviendo[i]) seccionesLluvia++;
  }

  // sonido lluvia y variación de volumen
  //esta parte fue hecha con ayuda de deepseek, lerp sirve para que la variación de volumen sea paulatina
  if (seccionesLluvia > 0) {
    volumenLluvia = lerp(volumenLluvia, seccionesLluvia * 0.25, 0.1);
  } else {
    volumenLluvia = lerp(volumenLluvia, 0, 0.1);
  }
  xubasco.setVolume(volumenLluvia);
}

//define cada cuanto se crean las gotas, y la sección definida para cada una
//utilizo canil como una variable que refiere a la sección de cada personaje
function hacerLluvia(canil) {
  if (frameCount % 4 == 0) {
    gotas.push({
      x: random(canil * 160, (canil + 1) * 160),
      y: 0,
      canil: canil,
    });
  }
}
//https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects

//dibujar y mover las gotas de lluvia
function dibujarLluvia() {
  for (let i = 0; i < gotas.length; i++) {
    fill(90, 90, 250);
    ellipse(gotas[i].x, gotas[i].y, 3, 10);
    gotas[i].y += 5;
    // cuando las gotas salen del canvas, se eliminan
    if (gotas[i].y > height) {
      gotas.splice(i, 1);
      i--;
    }
  }
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
//https://p5js.org/reference/p5/splice/

function keyPressed() {
  // vulnerar personaje
  if (key == "1") lloviendo[0] = !lloviendo[0];
  if (key == "2") lloviendo[1] = !lloviendo[1];
  if (key == "3") lloviendo[2] = !lloviendo[2];
  if (key == "4") lloviendo[3] = !lloviendo[3];

  // activar refugio
  if (key == "q") parawa[0] = !parawa[0];
  if (key == "w") parawa[1] = !parawa[1];
  if (key == "e") parawa[2] = !parawa[2];
  if (key == "r") parawa[3] = !parawa[3];
}
//https://p5js.org/reference/p5/key/
