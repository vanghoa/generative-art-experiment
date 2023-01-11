const division = 45;
let objects = [];
let objectsline = [];
let button1;
let xoff1a = -100;
let xoff2a = -50;
let xoff3a = 50;
let xoff4a = 100;
let incn = .1;
//////////////////////////////////////////////////////////////////////////// VAR SECTION

function setup() {
  createCanvas(windowWidth, windowHeight);
  button1 = createButton('Dừng');
  button1.position(0,0);
  button1.mousePressed(Redrawthui);

  //noLoop();
  frameRate(20);

}

///////////////////////////////////////////////////////////////////////////////////
function draw() {

  background(120);
  objects = [];
  objectsline = [];

  ///////////////////////
  const divisionlong = max(width,height)/min(width,height) * division;

  let widthdiv;
  let heightdiv;

  if (max(width,height) == width) {
    widthdiv = divisionlong;
    heightdiv = division;
  } else {
    widthdiv = division;
    heightdiv = divisionlong;
  }

  const widthSz = width/widthdiv;
  const heightSz = height/heightdiv;
  for (let i=0; i<= heightdiv; i++) {
    line(0, i*heightSz, width, i*heightSz);
  }
  for (let i=0; i<= widthdiv; i++) {
    line(i*widthSz, 0, i*widthSz, height);
  }


  /*
  objects.push({
    x: round(random(0,division*2/3 - 1)),
    y: round(random(0,division*1/3))
  });

  objects.push({
    x: round(random(division*2/3, division)),
    y: round(random(0,division*2/3 - 1))
  });

  objects.push({
    x: round(random(division*1/3 + 1, division)),
    y: round(random(division*2/3, division))
  });

  objects.push({
    x: round(random(0, division*1/3)),
    y: round(random(division*1/3 + 1, division))
  });
  */
/////////////////////////////
  inc = mouseX/mouseY * 1.2;
  if (inc == 0 || !Number.isFinite(inc)) { inc = .1; }

  const xoff1 = xoff1a + inc + incn;
  const xoff2 = xoff2a + inc + incn;
  const xoff3 = xoff3a + inc + incn;
  const xoff4 = xoff4a + inc + incn;

  objects.push({
    x: round(map(noise(xoff1),.2,.8,0,widthdiv*2/3 - 1)),
    y: round(map(noise(xoff1+10),.2,.8,0,heightdiv*1/3))
  });

  objects.push({
    x: round(map(noise(xoff2),.2,.8,widthdiv*2/3, widthdiv)),
    y: round(map(noise(xoff2+10),.2,.8,0,heightdiv*2/3 - 1))
  });

  objects.push({
    x: round(map(noise(xoff3),.2,.8,widthdiv*1/3 + 1, widthdiv)),
    y: round(map(noise(xoff3+10),.2,.8,heightdiv*2/3, heightdiv))
  });
  
  objects.push({
    x: round(map(noise(xoff4),.2,.8,0, widthdiv*1/3)),
    y: round(map(noise(xoff4+10),.2,.8,heightdiv*1/3 + 1, heightdiv))
  });

  incn += .02;

  ///////////////////////
  veline(0,1);
  veline(1,2);
  veline(2,3);
  veline(0,3);
  ////////////////////////
  objectsline.forEach((obj, index) => {
    push();
    fill(0,0,0);
    rect(obj.x*widthSz, obj.y*heightSz, widthSz, heightSz);
    pop();
  });
  ///////////////////
  let mauid = [255,255,255,255,255,255];
  objects.forEach((obj, index) => {
    push();
    mauid.forEach((item, index) => {mauid[index] = 255;})

    mauid[index] = 0;

    fill(mauid[0], mauid[1], mauid[2]);
    rect(obj.x*widthSz, obj.y*heightSz, widthSz, heightSz);
    pop();
  });

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function Redrawthui() {
  if (isLooping()) {
    noLoop();
  } else { loop(); }
}


function veline(i,k) {
    let lonx, nhox, lony, nhoy, kcdx, kcdy;
    let checker = false;

    if (objects[i].x > objects[k].x) {
      lonx = objects[i].x; nhox = objects[k].x;
    }
      else /*if (objects[i].x < objects[k].x)*/ {
        lonx = objects[k].x; nhox = objects[i].x;
     }

    if (objects[i].y > objects[k].y) {
      lony = objects[i].y; nhoy = objects[k].y;
    }
      else /*if (objects[i].y < objects[k].y)*/ {
        lony = objects[k].y; nhoy = objects[i].y;
      }

    
    if (lony - nhoy <= 0) {kcdy = 1;}
    else {kcdy = lony - nhoy;}

    if (lonx - nhox <= 0) {kcdx = 1;}
    else {kcdx = lonx - nhox;}

    

    for (let n=nhox; n<=lonx; n++) {
      let diemy = sqrt(pow(dist(objects[i].x, objects[i].y, objects[k].x, objects[k].y)*((n - nhox)/(kcdx)), 2) - pow(n - nhox, 2));

      if ((n == nhox) && !(  (objects[i].x == nhox && objects[i].y == floor(nhoy + diemy))   ||   (objects[k].x == nhox && objects[k].y == floor(nhoy + diemy)))   ){
        checker = true;
      }

      if (checker) {
        diemy = kcdy - diemy; 
      }

      //////////////////////////// Made by Bao Anh
      for (let t=nhoy; t<=lony; t++) {
        let diemx = sqrt(pow(dist(objects[i].x, objects[i].y, objects[k].x, objects[k].y)*((t - nhoy)/(kcdy)), 2) - pow(t - nhoy, 2));
        if (checker){
          diemx = kcdx - diemx;
        }
        /////////////////////////////
        objectsline.push({
          x: ceil(nhox + diemx),
          y: t
        })
/*
        objectsline.push({
          x: ceil(nhox + diemx),
          y: t
        })
*/      
      }

      objectsline.push({
        x: n,
        y: ceil(nhoy + diemy)
      })
/*
      objectsline.push({
        x: n,
        y: ceil(nhoy + diemy)
      })
*/      
    }

}