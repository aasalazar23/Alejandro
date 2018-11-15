var image;
function bushUpload() {
  var fileinput = document.getElementById("imginput");
  image = new SimpleImage(fileinput);
  var imgcanvas = document.getElementById("can");
  image.drawTo(imgcanvas);
}
var seanimage;
function seanUpload() {
  var getsean = document.getElementById("seaninput");
  seanimage = new SimpleImage(getsean);
  var seancanvas = document.getElementById("sean");
  seanimage.drawTo(seancanvas);
}

// prep images
var bush = new SimpleImage();
function bush4Sean() {
  for (var pixel of image.values()) {
    var red = pixel.getRed();
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    var nred = floorMath(red)*16;
    var ngreen = floorMath(green)*16;
    var nblue = floorMath(blue)*16;
    pixel.setRed(nred);
    pixel.setGreen(ngreen);
    pixel.setBlue(nblue);
  }
  bush = image;
  var bushcanvas = document.getElementById("bushcanvas");
  bush.drawTo(bushcanvas);
}
var sean = new SimpleImage();
function seanHiding() {
  for (var pixel of seanimage.values()) {
    var red = pixel.getRed();
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    var nred = floorMath(red);
    var ngreen = floorMath(green);
    var nblue = floorMath(blue);
    pixel.setRed(nred);
    pixel.setGreen(ngreen);
    pixel.setBlue(nblue);
  }
  sean = seanimage;
  var seanhiding = document.getElementById("seancanvas");
  sean.drawTo(seanhiding);
}

function floorMath(RGB) {
  var RGBoutput = Math.floor(RGB/16);
  return RGBoutput
}

// combine images
var sean_in_bush = null;
function hideSean() {
  var image = new SimpleImage(bush.getWidth(), bush.getHeight());
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var bpixel = bush.getPixel(x,y);
    var spixel = sean.getPixel(x,y);
    pixel.setRed(bpixel.getRed()+spixel.getRed());
    pixel.setGreen(bpixel.getGreen()+ spixel.getGreen());
    pixel.setBlue(bpixel.getBlue()+spixel.getBlue());
  }
  sean_in_bush = image;
  var output = document.getElementById("hidingbush");
  sean_in_bush.drawTo(output);
}

//show Sean
var showsean = null;
function showSean() {
  for (var pixel of sean_in_bush.values()) {
    var fred = (pixel.getRed()%16)*16;
    var fgreen = (pixel.getGreen()%16)*16;
    var fblue = (pixel.getBlue()%16)*16;
    pixel.setRed(fred);
    pixel.setGreen(fgreen);
    pixel.setBlue(fblue);
  }
  showsean = sean_in_bush;
  var fcanvas = document.getElementById("display");
  showsean.drawTo(fcanvas);
}

// crop image
function crop(image,width,height) {
    var croppedimg = new SimpleImage(width, height);
    for (pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (x < width && y < height) {
            croppedimg.setPixel(x,y, pixel);
        }
    }
    return croppedimg;
}
