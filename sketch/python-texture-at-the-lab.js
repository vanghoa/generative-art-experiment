let boxSz;
let gridSz;
let zTranslate;
let d1;
let dem = 0;
let poX = 0;
let check = true;
let frame = 100;
let move = frame;
let tpose = [];
let zpose = [];
let button3;
let img = [];
const xxx = '1x';

document.body.style.backgroundImage = 'linear-gradient(180deg, #FFFFFF 37.08%, #BCFFE9 82.31%, #33FFBB 117.39%)';

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  boxSz = 320; //320
  d1 = boxSz;
  gridSz = boxSz / 4;
  zTranslate = -boxSz;

  let button1 = createButton('Save it as png');
  button1.position(width-150,0);
  button1.size(150,40);
  button1.mousePressed(Chuphinh);

  
  let button2 = createButton('Create another python (wait 4 seconds, it might lag a bit)');
  button2.position(width-150,40);
  button2.size(150,60);
  button2.mousePressed(Velaicainay);

  button3 = createButton('Play video');
  button3.position(width-150,100);
  button3.size(150,60);
  button3.mousePressed(Playvideo);
  noLoop();
}

function Chuphinh() {
  saveCanvas('Python 3D', 'png');
}

function Velaicainay() {
  noiseSeed(random(1,100))
  redraw(1);
  console.log(button3);
}

function Playvideo() {
  if (check) {loop(); button3.elt.innerHTML = 'Stop video'}
  else {noLoop(); button3.elt.innerHTML = 'Play video'}
  check = !check;
}


function preload() {
  img.push(loadImage(`${xxx}/Asset 10.png`));
  img.push(loadImage(`${xxx}/Asset 7.png`));
  img.push(loadImage(`${xxx}/Asset 8.png`));
  img.push(loadImage(`${xxx}/Asset 9.png`));
  img.push(loadImage(`${xxx}/Asset 6.png`));
}

let variablele = (tcx, tcy, tcz) => {
  push();
  translate(tcx, tcy, tcz);
  box(gridSz);
  pop()
}

function draw() {
  let xoff = 10;
  let xxoff = 1000;

  let dis1;
  dem = dem + 1;

  const length = 20;
  const R = 20;
  const ptlt = 30;
  const ptlt2 = 200;
  const amblt = 120;

  clear();

  ambientLight(amblt,amblt,amblt);
  pointLight(ptlt2, ptlt2, ptlt2, -2*R*gridSz ,-1*R*gridSz,-10*R*gridSz);
  pointLight(ptlt, ptlt, ptlt, -2*R*gridSz ,-1*R*gridSz,-10*R*gridSz);

  if (!check) {
    move += frame;
  }

  console.log(frameRate());

  camera(-R*gridSz - 100 ,-R*gridSz -100 + move,-R*gridSz + 100,-R*gridSz+1500,-R*gridSz+1500 + move,0,-1,-1,0).perspective(PI/3, width/height, 20, 20000);
  //camera(-1000,-1000,-2*R*gridSz + 3000,0,0,0,1,0,0);
  rotateX(0 //- sin(millis()*0.00001)
  );

  let goc ={
    x:0,
    y:2*R*gridSz,
    z:0
  }

  noStroke();

  push();
  translate(goc.x,-goc.y,goc.z);
  for (let count = 1; count <= 5; count++) {
        translate(goc.x,goc.y,goc.z);

        for (let X = 0; X <= R * gridSz; X += gridSz) {
          for (let Y = -R * gridSz; Y <= R * gridSz; Y += gridSz) {
            let dis = dist(0, 0, 0, X, Y, 0);
            if (dis > R * gridSz - gridSz && dis < R * gridSz) {
              for (let x = X - boxSz; x <= X + boxSz; x += gridSz) {
                for (
                  let y = Y - boxSz;
                  y <= Y + boxSz;
                  y += gridSz
                ) {
                  for (
                    let z = - boxSz;
                    z <= boxSz;
                    z += gridSz
                  ) {
                    let d = dist(X, Y, 0, x, y, z);
                    if (d > boxSz - gridSz && d < boxSz) {
                      push();
                      xoff += 0.005;
                      let t = noise(xoff);
                      let vs = random(0,1);

                      let xgia;
                      if (count % 2 === 0) { xgia = x; } else { xgia = -x; }

                      if (t >= 0.525) 
                      {
                        texture(img[round(random(0, 4))])
                        let strkwt = 1.8 - count*.8;
                        if (strkwt < .1) {strkwt = .1;}
                        strokeWeight(strkwt);
                        stroke(0);
                        translate(xgia, y, z);
                        sphere(gridSz/2.1,8,8); 
                      } 
                      else {
                        xxoff +=0.009;
                        let l = noise(xxoff);
                        if (l <= 0.4) {texture(img[0]);
                        }
                          else if (l >= 0.6) {texture(img[1]);
                          }
                          else if (l <= 0.55 && l >= 0.45) {texture(img[2]);
                          }
                          else {texture(img[3]);
                          }
                        translate(xgia, y, z);
                        box(gridSz);
                      }

                      let vsx = 0.002
                      if (vs <= vsx) {
                        let xgia1 = xgia/2;
                        let y1 = y/2;
                        let z1 = z/2;
                        variablele(xgia1,y1,z1);

                        if (vs <= vsx - 0.0005) {
                          variablele(xgia1 - gridSz,y1,z1);
                        }
                        
                        if (vs <= vsx - 0.0007) {
                          variablele(xgia1 + gridSz,y1,z1);
                        }
                        
                        if (vs <= vsx - 0.0009) {
                          variablele(xgia1,y1 + gridSz,z1);
                        }

                        
                        if (vs <= vsx - 0.0011) {
                          variablele(xgia1,y1 - gridSz,z1);
                        }

                        if (vs <= vsx - 0.0013) {
                          variablele(xgia1,y1,z1 + gridSz);
                        }

                        if (vs <= vsx - 0.015) {
                          variablele(xgia1,y1,z1 - gridSz);
                        }
                      }

                      pop();
                    }
                  }
                }
              }
            }
          }
        }
  }
  pop();


}