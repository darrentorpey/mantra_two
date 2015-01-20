import Canvas from 'display/canvas/canvas';

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

export default Canvas;
