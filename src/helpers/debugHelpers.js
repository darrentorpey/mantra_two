var Debug = {};

Debug.logGrid = function( grid ) {
  for ( let tile of grid.tiles ) {
    console.log( tile.toString() );
  }
};

export default Debug;
