const inc = 0.07;
let zoff = 0
let arr = [];
let trace;
const size_ = 500;
const offsetsize = 100;
const dist_gap = size_/30;
const pos_rand_gap = dist_gap*2;
const radius_ = 100;

function setup() {
  pixelDensity(1);
  createCanvas(size_, size_, WEBGL);

  trace = createGraphics(size_, size_);

  let yoff = 0;
  
  for (let y = -height/2 + offsetsize; y < height/2 - offsetsize; y+=dist_gap) {
    for (let x = -width/2 + offsetsize; x < width/2 - offsetsize; x+=dist_gap) {
      arr.push({x: random(x-pos_rand_gap,x+pos_rand_gap), 
                y: random(y-pos_rand_gap,y+pos_rand_gap),
                x_: random(x-pos_rand_gap,x+pos_rand_gap), 
                y_: random(y-pos_rand_gap,y+pos_rand_gap)
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
  trace.background(0,0,0);
  noStroke();
  noiseDetail(3, 0.6);
  
  for (let y = -height/2 + offsetsize; y < height/2 - offsetsize; y+=dist_gap) {
    let xoff = 0;
    
    for (let x = -width/2 + offsetsize; x < width/2 - offsetsize; x+=dist_gap) {
      let r = noise(xoff, yoff, zoff);
      
      if (r < 0.6) {
        if (r > 0.45) {
          push();
          translate(arr[count].x_, arr[count].y_, 0);
          normalMaterial();
          sphere(map(r,0.3,0.5,1,2));
          pop();
        }
        
        arr[count].x = random(x-pos_rand_gap,x+pos_rand_gap);
        arr[count].y = random(y-pos_rand_gap,y+pos_rand_gap);
      } else {
        push();
        translate(arr[count].x, arr[count].y, map(r,0.2,1,-100,200));
        normalMaterial();
        sphere(pow(r, (1-r)*10)*radius_);
        pop();
        
        arr[count].x_ = random(x-pos_rand_gap,x+pos_rand_gap);
        arr[count].y_ = random(y-pos_rand_gap,y+pos_rand_gap);
      }
      count++;
      
      xoff += inc;
    }
    yoff += inc;
  }

  
  loadPixels();
  trace.loadPixels();

  for (let x = 1; x < width; x++ ) {
    for (let y = 1; y < height; y++ ) {
      let loc = (x + y * width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      let r = pixels[loc   ]; 
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];
      
      // Pixel to the left location and color
      let left = pos_compare(-1,0);
      let top = pos_compare(0,-1);
      let right = pos_compare(1,0);
      let bot = pos_compare(0,1);

      //let max_diff = max(left,top,right,bot);
      let ave_diff = (left + top + right + bot)/4;

      // New color is difference between pixel and left neighbor
      //let diff = (ave_diff > 5) ? ave_diff*40 : ave_diff;

      let diff = ave_diff;

      if (ave_diff > 3) {
        diff = ave_diff*map(ave_diff,3,5,0,40);;
      }

      trace.pixels[loc    ] += diff;
      trace.pixels[loc + 1] += diff;
      trace.pixels[loc + 2] += diff;

      /*
      trace.pixels[loc + 4    ] -= diff;
      trace.pixels[loc + 4 + 1] -= diff;
      trace.pixels[loc + 4 + 2] -= diff;
*/
      trace.pixels[loc + 3] = 255; // Always have to set alpha

      function pos_compare(x_, y_) {
        let loc = (x + x_ + (y + y_) * width) * 4;
        let pix = {
          r: pixels[loc    ],
          g: pixels[loc + 1],
          b: pixels[loc + 2],
        }
        return abs((r+g+b)/3 - (pix.r + pix.g + pix.b)/3);
      }

    }
  }
  trace.updatePixels();
  clear();
  image(trace,-width/2,-height/2);
  
  zoff += 0.01;
  noLoop();
}