function Canvas( data ) {
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

Canvas.prototype.getBounds = function() {
	var pos = this.dom.getBoundingClientRect();

	return {
		x: pos.left,
		y: pos.top
	};
}

Canvas.makeSimple = function( config ) {
	var canvas = Canvas.create();

	document.body.appendChild( canvas.dom );

	return canvas;
};

export default Canvas;
