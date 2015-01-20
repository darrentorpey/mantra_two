/**
 * Mouse listener
 */
class Mouse {
  constructor( canvas ) {
    this.canvas = canvas;
    this.listeners = [];
    this.listenersApplied = {};
  }

  *clicks() {
    yield canvas.dom.getBoundingClientRect();
  }

  _startListener( canvas ) {
    if ( this.listenersApplied.click ) {
      return;
    }

    canvas.dom.addEventListener( 'click', ( e ) => {
      // let { x, y } = canvas.getBounds();
      var canvasPosition = canvas.getBounds();

      var relativePos = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
      };

      this.listeners.forEach( function( listener ) {
        listener( relativePos );
      });
    });

    this.listenersApplied.click = true;
  }

  listenToClicks( canvas, listener ) {
    this._startListener( canvas );

    this.listeners.push( listener );
  }

  logClicks( canvas ) {
    this.listenToClicks( canvas, function( click ) {
      console.log( `Click @ ${ click.x }, ${ click.y }` );
    });
  }

  logTileClicks( canvas, tileGrid ) {
    this.watchTileClicks( canvas, tileGrid, function( click ) {
      logTile( tileGrid.getTileAt( click ) );
    });
  }

  watchTileClicks( canvas, tileGrid, listener ) {
    this.listenToClicks( canvas, function( pos ) {
      var gridPos = tileGrid.getGridPosition( pos );

      if ( gridPos.x >= 0 && gridPos.y >= 0 ) {
        listener( gridPos );
      }
    });
  }
}

var logTile = ( tile ) => {
  console.log( 'tile:', tile );
  // console.log( `Tile: %c ${ color }`, `color: ${ color }` );
  console.log( `%c Tile @ ${ tile.x }, ${ tile.y }`, `color: ${ tile.color }` );
};

export default Mouse;
