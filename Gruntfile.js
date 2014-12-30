module.exports = function( grunt ) {
    grunt.loadNpmTasks( 'grunt-eslint' );

	grunt.initConfig({
		eslint: {
			options: {
				quiet: true
			},
			target: [ '*.js' ]
		}
	});

	grunt.registerTask( 'default', [ 'eslint' ] );
};
