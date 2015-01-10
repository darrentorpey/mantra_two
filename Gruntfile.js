module.exports = function( grunt ) {
    grunt.loadNpmTasks( 'grunt-eslint' );
    grunt.loadNpmTasks( 'grunt-6to5' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.initConfig({
        '6to5': {
            options: {
                sourceMap: true,
                modules: 'amd'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [ '**/*.js' ],
                    dest: 'dist/'
                }]
            }
        },
        'copy': {
            'lib': {
                'files': [{
                    src: 'lib/**',
                    dest: 'dist/'
                }]
            }
        },
		'eslint': {
			options: {
            	config: 'eslint.json',
				quiet: true
			},
			target: [ 'src/**/*.jsp' ]
		},
        'watch': {
            src: {
              files: [ 'src/**/*.js', 'lib/**/*.js' ],
              tasks: [ '6to5', 'copy' ],
            }
        }
	});

	grunt.registerTask( 'default', [ 'eslint' ] );
};
