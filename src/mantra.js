import Canvas from 'display/canvas';

var canvas = Canvas.create();

window.canvas = canvas;

document.body.appendChild( canvas.dom );

console.log( 'canvas:', canvas );

canvas.drawSquare( { x: 10, y: 10, w: 20, h: 20, style:  'white' } );
