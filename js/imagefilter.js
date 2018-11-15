var beforecanvas = document.getElementById("before");
var aftercanvas = document.getElementById("after");
var kitten = document.getElementById("evilthing");

var originalimg = null; //Global Image variable for use in functions
var beforeimg = null;
function uploadImage() {
  var imgFile = document.getElementById("fileimage");
  originalimg = new SimpleImage(imgFile);
  beforeimg = new SimpleImage(imgFile);
  beforeimg.drawTo(beforecanvas);
}

function grayScale() {
  for (var pixel of beforeimg.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg); 
  }
  var grayimage = beforeimg;
  grayimage.drawTo(aftercanvas);
}
function greenShift() {
  for (var pixel of beforeimg.values()) {
    var oldgreen = pixel.getGreen();
    if (oldgreen <= 205) {
      pixel.setGreen(oldgreen + 50);
    } else {
      pixel.setGreen(255);
    }}
  var greenimage = beforeimg;
  greenimage.drawTo(aftercanvas);
}
function redShift() {
  for (var pixel of beforeimg.values()) {
    var oldred = pixel.getRed();
    if (oldred <= 205) {
      pixel.setRed(oldred + 50);
    } else {
      pixel.setRed(255);
    }}
  var redimage = beforeimg;
  redimage.drawTo(aftercanvas);
}
function blueShift() {
  for (var pixel of beforeimg.values()) {
    var oldblue = pixel.getBlue();
    if (oldblue <= 205) {
      pixel.setBlue(oldblue + 50);
    } else {
      pixel.setBlue(255);
    }}
  var blueimage = beforeimg;
  blueimage.drawTo(aftercanvas);
}
function redHue() {
  for (var pixel of beforeimg.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if (avg < 128) {
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      var colorval = (avg*2)-255;
      pixel.setGreen(colorval);
      pixel.setBlue(colorval);
    }
  }
  var redhue = beforeimg;
  redhue.drawTo(aftercanvas);
}
function failedGreenScreen() {
  for (var pixel of beforeimg.values()) {
    var green = pixel.getGreen();
    if (green < 200) {
      pixel.setGreen(255);
      pixel.setRed(0);
      pixel.setBlue(0);
    } else {
      pixel.setGreen(0);
      pixel.setRed(0);
      pixel.setBlue(0);
    }
  }
  var greenify = beforeimg;
  greenify.drawTo(aftercanvas);
}
function duck_rainbows() {
  var height = beforeimg.getHeight();
  for (var pixel of beforeimg.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var X2 = 2 * avg;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(X2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(X2 - 255);
        pixel.setBlue(X2 - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(X2);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(X2 - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(X2);
        pixel.setGreen(X2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(X2 - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(X2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(X2-255);
        pixel.setGreen(255);
        pixel.setBlue(X2 - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(X2);
      } else {
        pixel.setRed(X2-255);
        pixel.setGreen(X2 - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(X2);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(X2 - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  var rainify = beforeimg;
  rainify.drawTo(aftercanvas);
}
function insideImage(coordinate, size) {
  if (coordinate < 0) {
    return 0;
  }
  if (coordinate >= size) {
    return size -1;
  }
  return coordinate;
}
function nearbyPixel(beforeimg, x, y, diameter) {
  var dx = Math.random() * diameter - diameter /2;
  var dy = Math.random() * diameter - diameter /2;
  var nx = insideImage(x + dx, beforeimg.getWidth());
  var ny = insideImage(y + dy, beforeimg.getHeight());
  return beforeimg.getPixel(nx, ny);
}
function imageBlur() {
  var afterimage = new SimpleImage(beforeimg.getWidth(), beforeimg.getHeight());
  for (var pixel of beforeimg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random()> 0.5) {
      var nearby = nearbyPixel(beforeimg, x, y, 15);
      afterimage.setPixel(x, y, nearby);
    } else {
      afterimage.setPixel(x, y, pixel);
    }
  }
  afterimage.drawTo(aftercanvas);
}



function resetImage() {
  originalimg.drawTo(aftercanvas);
}
function clearCanvas() {
  var ctx = beforecanvas.getContext("2d");
  ctx.clearRect(0,0, beforecanvas.width, beforecanvas.height);
  var ctx = aftercanvas.getContext("2d");
  ctx.clearRect(0,0, aftercanvas.width, aftercanvas.height);
}
