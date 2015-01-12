import Canvas from 'display/canvas/canvasDrawing';
import { Grid, TileGrid } from 'mapping/grid';
import debug from 'helpers/debugHelpers';
import Mouse from 'controls/mouse';

var canvas = Canvas.makeSimple();

var asciiMap = `
WWWWWWWWWWWWWWWWWWWWWWWWW
W                       W
W  5 3 4 5  6        12 W
W 2              35  11 W
W  5     4 6            W
W    4  4 2   7         W
W  2     32             W
W     6  1   43 1       W
W              5        W
W      1  5         5   W
W             4         W
W   1           3       W
W   4          3  24    W
W          15    14     W
W  5            2 3     W
W    2    3             W
W                  5    W
W      11               W
WWWWWWWWWWWWWWWWWWWWWWWWW
`;

var tileGrid = TileGrid.render( {
  canvas: canvas,
  data: asciiMap,
  offset: { x: 10, y: 5 },
  tileWidth: 24,
  tileHeight: 24,
  gridOffset: { x: 10, y: 5 }
});

var mouse = new Mouse( canvas );

/**
mouse.listenToClicks( canvas, function( click ) {
  console.log( 'click', click );
});
*/

mouse.watchTileClicks( canvas, tileGrid, function( click ) {
  console.log( 'click tile', click );
});

Object.assign( window, {
  debug,
  tileGrid,
  canvas
});
