export default function Canvas( data ) {
	_.extend( this, data );
}

Canvas.create = function() {
	var canvasDom = document.createElement( 'canvas' );

	_.extend( canvasDom, {
		id: 'Main',
		width: 640,
		height: 480
	});

	_.extend( canvasDom.style, {
		zIndex: 8,
		position: 'absolute',
		backgroundColor: 'rgb( 50, 50, 50 )',
		border: '1px solid'
	});

	return new Canvas({
		dom: canvasDom,
		context: canvasDom.getContext( '2d' )
	});
};

/**
 * Draw a square
 * @param  {*}:
 *  - size: the length of each side of the square
 * @return {[type]}        [description]
 */
Canvas.prototype.drawSquare = function( params ) {
    this.context.fillStyle = params.style;

    this.context.strokeStyle = params.style;

	this.context.lineWidth = params.borderWidth || 1;

	if ( params.hollow ) {
		this.context.strokeRect( params.x, params.y, params.w, params.h )
	} else {
		this.context.fillRect( params.x, params.y, params.w, params.h )
	}
	this.drawRectangle( _.omit( params ) )
};

/**
 * Draw a rectangle
 * @param  {*}:
 * @return {[type]}        [description]
 */
Canvas.prototype.drawRectangle  = function( params ) {
    this.context.fillStyle = params.style;

    this.context.strokeStyle = params.style;

	this.context.lineWidth = params.borderWidth || 1;

	if ( params.hollow ) {
		this.context.strokeRect( params.x, params.y, params.w, params.h )
	} else {
		this.context.fillRect( params.x, params.y, params.w, params.h )
	}
};
