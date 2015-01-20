class Tile {
  constructor( x, y, height = 1, width = 1) {
    Object.assign( this, { x, y, height, width } );
  }

  toString() {
    return `{Tile} @[${ this.x }, ${ this.y }] [${ this.width }x${ this.height }]`;
  }
}

class ColoredTile extends Tile {
  constructor( params ) {
    var { x, y, height, width } = params;
    super( x, y, height, width );

    this.color = params.color;
  }
}

function genArray( generator ) {
  var things = [];

  for ( let thing of generator() ) {
    things.push( thing );
  }

  return things;
}

class Grid {
  constructor( width, height, tileWidth, tileHeight ) {
    this.width = width;
    this.height = height;

    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;  

    this.tiles = genArray( this.getTiles.bind( this ) );
  }

  *getTiles() {
      for ( let y = 0; y < this.height; y++ ) {
      for ( let x = 0; x < this.width; x++ ) {
            yield new Tile( x * this.tileWidth, y * this.tileHeight, this.height, this.width );
        }
    }
  }
}

Grid.create = function( { width, height, tileWidth, tileHeight } ) {
  return new Grid( width, height, tileWidth, tileHeight );
}

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

class TileGrid extends Grid {
  constructor( config ) {
    var { width, height, tileWidth, tileHeight } = config;
    super( width, height, tileWidth, tileHeight );

    Object.assign( this, { offset: { x: 0, y: 0 } }, config );

    this._internalGrid = {};
    this._sparseMap = [];
    this.dimensions = { width: 0, height: 0 };
  }

  getGridId( x, y ) {
    return `${ x }, ${ y }`;
  }

  addBox( canvas, { x, y, color } ) {
    canvas.drawSquare( { x, y, w: this.tileWidth, h: this.tileHeight, style: colorMap[ color ] || color } );
  }

  addTile( x, y, color ) {
    var newTile = new ColoredTile( { x, y, tileHeight: this.tileHeight, tileWidth: this.tileWidth, color: color } );

    this._sparseMap.push( { x: x, y: y } );

    this.tiles.push( newTile );

    this._internalGrid[ this.getGridId( x, y ) ] = newTile;
  }

  render( { canvas, offset } ) {
    _.each( this.data.split( '\n' ), function( row, rowIndex ) {
      this.dimensions.height += 1;

      _.each( Array.from( row ), function( cell, colIndex, total ) {
        var color = colorMap[ cell ];

        this.dimensions.width = total.length;

        if ( color ) {
        this.addTile( colIndex, rowIndex - 1, color );

          this.addBox( canvas, {
            x: offset.x + ( colIndex * this.tileWidth ),
            y: offset.y + ( ( rowIndex - 1 ) * this.tileHeight ),
            color: color
          });
        }
      }, this );
    }, this );
  }

  getGridPosition( pos ) {
    return {
      x: Math.floor( ( pos.x - 1 - this.offset.x ) / this.tileWidth ),
      y: Math.floor( ( pos.y - 1 - this.offset.y ) / this.tileHeight )
    };
  }

  getTileAt( { x, y } ) {
    return this._internalGrid[ this.getGridId( x, y ) ];
  }
}

/**
 * The problem is here is that the render needs to happen before the width and height can be determined
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
TileGrid.render = function( config ) {
  var tileGrid = TileGrid.create( config );

  tileGrid.render( _.pick( config, 'canvas', 'offset' ) );

  tileGrid.width = _.max( [ for ( item of tileGrid._sparseMap ) item.x ] );
  tileGrid.height = _.max( [ for ( item of tileGrid._sparseMap ) item.y ] );

  // console.log( 'tileGrid.width:', tileGrid.width + 1 );
  // console.log( 'tileGrid.height:', tileGrid.height + 1 );

  return tileGrid;
}

TileGrid.create = function( config ) {
  return new TileGrid( config );
};

export { Grid, TileGrid };
