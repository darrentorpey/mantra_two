import Canvas from 'display/canvas/canvasDrawing';
import { Grid, TileGrid } from 'mapping/grid';
import debug from 'helpers/debugHelpers';
import Mouse from 'controls/mouse';

var canvas = Canvas.makeSimple();
var mouse = new Mouse( canvas );

mouse.logClicks( canvas );

var asciiMap = `
WWWWWWWWWWWWWWWWWWWWWWWWW
W1                      W
W 2  3 4 5  6        12 W
W  3             35  11 W
W   4    4 6            W
W    5  4 2   7         W
W  2  6  32             W
W        1   43 1       W
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

var tileGrid = TileGrid.create( {
  data:       asciiMap,
  tileWidth:  16,
  tileHeight: 16
});

tileGrid.render({
  canvas: canvas,
  offset: { x: 0, y: 0 },
  // offset: { x: 8, y: 5 },
});

mouse.logTileClicks( canvas, tileGrid );

// var asciiMapSmall = `
// 123
// 456
// 712
// `;

// var tileGridSmall = TileGrid.create( {
//   data:       asciiMapSmall,
//   tileWidth:  20,
//   tileHeight: 20
// });

// tileGridSmall.render({
//   canvas: canvas,
//   offset: { x: 0, y: 0 },
// });

Object.assign( window, {
  debug,
  tileGrid,
  canvas
});
