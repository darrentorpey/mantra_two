import Canvas from 'display/canvasDrawing';
import { Grid } from 'mapping/grid';

var canvas = Canvas.create();

document.body.appendChild( canvas.dom );

console.log( 'canvas:', canvas );

var grid = Grid.create({
  width: 8,
  height: 5,
  tileWidth: 64,
  tileHeight: 64
});

var colorMap = {
	'W': 'white',
	'G': 'green',
	'B': 'blue',
	'L': 'lightblue',
}

var addBox = ( { x, y, color } ) => {
	canvas.drawSquare( { x, y, w: 20, h: 20, style: colorMap[ color ] || color } );
};

// canvas.drawSquare( { x: 10, y: 10, w: 20, h: 20, style: 'white' } );
addBox( { x: 10, y: 10, color: 'white' } );
addBox( { x: 35, y: 10, color: 'green' } );
addBox( { x: 60, y: 10, color: 'blue' } );
addBox( { x: 85, y: 10, color: 'lightblue' } );
addBox( { x: 110, y: 10, color: 'G' } );
addBox( { x: 135, y: 10, color: 'G' } );


var asciiMap = `
___W__G__LL_B
__B_____B____
_W___W____LW_
`;


function logGrid() {
  for ( let tile of grid.getTiles() ) {
    console.log( tile.toString() );
  }
}

Object.assign( window, {
  canvas,
  grid,
  logGrid
});
