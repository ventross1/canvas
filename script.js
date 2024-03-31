// App variables
var pos = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "Maecenas aliquet accumsan leo. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Fusce wisi. Vestibulum fermentum tortor id mi. Nullam eget nisl. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Fusce nibh. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ipsum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Fusce wisi. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Praesent id justo in neque elementum ultrices. Nulla quis diam. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Aliquam in lorem sit amet leo accumsan lacinia. In dapibus augue non sapien. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.";

// Draw variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

function start() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
    var d = distance( pos, mouse );
    var fontSize = minFontSize + d/2;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-pos.y, mouse.x-pos.x);
      
      context.font = fontSize + "px Georgia";
    
      context.save();
      context.translate( pos.x, pos.y);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
      pos.x = pos.x + Math.cos(angle) * stepSize;
      pos.y = pos.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  pos.x = event.pageX;
  pos.y = event.pageY;
  
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width; 
}

function textWidth( string, size ) {
  context.font = size + "px Georgia";
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

start();