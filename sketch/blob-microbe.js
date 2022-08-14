const inc = 0.07;
let zoff = 0
let arr = [];
let trace;
const size_ = 1000;
const offsetsize = 100;
const gap = 1000/30;
const gap_ = gap*2;

function setup() {
  pixelDensity(1);
  createCanvas(size_, size_, WEBGL);

  trace = createGraphics(size_, size_);
  trace.background(255,0,0);

  let yoff = 0;
  
  for (let y = -height/2 + offsetsize; y < height/2 - offsetsize; y+=gap) {
    for (let x = -width/2 + offsetsize; x < width/2 - offsetsize; x+=gap) {
      arr.push({x: random(x-gap_,x+gap_), 
                y: random(y-gap_,y+gap_),
                x_: random(x-gap_,x+gap_), 
                y_: random(y-gap_,y+gap_)
               }); 
    }
  }
}

function draw() {
  let count = 0;
  let yoff = 0;
  ortho();
  
  //clear();
  background(255);
  noStroke();
  noiseDetail(3, 0.6);
  
  for (let y = -height/2 + offsetsize; y < height/2 - offsetsize; y+=gap) {
    let xoff = 0;
    
    for (let x = -width/2 + offsetsize; x < width/2 - offsetsize; x+=gap) {
      let r = noise(xoff, yoff, zoff);
      
      if (r < 0.6) {
        if (r > 0.55) {
          push();
          translate(arr[count].x_, arr[count].y_, 0);
          normalMaterial();
          //ambientMaterial(255, 0, 255);
          //ambientLight(0);
          sphere(map(r,0.3,0.5,1,2));
          pop();
        }
        
        arr[count].x = random(x-gap_,x+gap_);
        arr[count].y = random(y-gap_,y+gap_);
      } else {
        push();
        translate(arr[count].x, arr[count].y, map(r,0.2,1,-100,200));
        normalMaterial();
        //ambientMaterial(255, 0, 255);
        //ambientLight(0);
        sphere(pow(r, (1-r)*10)*70);
        pop();
        
        arr[count].x_ = random(x-gap_,x+gap_);
        arr[count].y_ = random(y-gap_,y+gap_);
      }
      count++;
      
      xoff += inc;
    }
    yoff += inc;
  }

  loadPixels();
  trace.loadPixels();

  for (let x = 1; x < width; x++ ) {
    for (let y = 0; y < height; y++ ) {
      let loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      let r = pixels[loc   ]; 
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];
      
      // Pixel to the left location and color
      let leftLoc = ((x - 1) + y * width) * 4;
      let rleft = pixels[leftLoc   ]; 
      let gleft = pixels[leftLoc + 1];
      let bleft = pixels[leftLoc + 2];      
      // New color is difference between pixel and left neighbor
      let diff = abs((r+g+b)/3 - (rleft+gleft+bleft)/3);
      diff = (diff > 8) ? 255 : 0;
      trace.pixels[loc    ] = diff;
      trace.pixels[loc + 1] = diff;
      trace.pixels[loc + 2] = diff;
      trace.pixels[loc + 3] = 255; // Always have to set alpha
    }
  }
  trace.updatePixels();
  //translate(-width/2,-height/2);
  clear();
  image(trace,-size_/2,-size_/2);

  zoff += 0.02;
  noLoop();
}
