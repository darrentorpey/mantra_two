import Canvas from 'display/canvasDrawing';
import { Grid } from 'mapping/grid';

var canvas = Canvas.create();

document.body.appendChild( canvas.dom );

var grid = Grid.create({
  width: 8,
  height: 5,
  tileWidth: 64,
  tileHeight: 64
});

var colorMap = {
  '_': null,
	' ': null,
  'W': '#DDDDDD',
  '1': '#F92672',
  '2': '#66D9EF',
  '3': '#A6E22E',
  '4': '#FD971F',
  '5': '#E6DB74',
  '6': '#AE81FF',
  '7': '#DDDDDD'
};

var asciiMap = `
WWWWWWWWWWWWWWWWWWWWWWW
W                     W
W  5 3 4 5  6        1W
W 2              35  1W
W  5     4 6          W
W    4  4 2   7       W
W  2     32           W
W     6  1   43 1     W
W              5      W
W      1  5           W
W             4       W
W   1           3     W
W   4          3  24  W
W          15    14   W
W  5            2 3   W
W    2    3           W
W                  5  W
W      11             W
WWWWWWWWWWWWWWWWWWWWWWW
`;

var addBox = function( { x, y, color } ) {
  canvas.drawSquare( { x, y, w: 20, h: 20, style: colorMap[ color ] || color } );
};

var renderMap = function( start, asciiMap ) {
  _.each( asciiMap.split( '\n' ), function( row, rowIndex ) {
    _.each( Array.from( row ), function( cell, colIndex ) {
      var color = colorMap[ cell ];
      if ( color ) {
        addBox( { x: start.x + ( colIndex * 25 ), y: start.y + ( ( rowIndex - 1 ) * 25 ), color: color } );
      }
    });
  });
};

renderMap( { x: 9, y: 5 }, asciiMap )

var logGrid = function() {
  for ( let tile of grid.getTiles() ) {
    console.log( tile.toString() );
  }
};

Object.assign( window, {
  canvas,
  grid,
  logGrid
});
