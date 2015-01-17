module.exports = function( grunt ) {
  grunt.loadNpmTasks( 'grunt-eslint' );
  grunt.loadNpmTasks( 'grunt-6to5' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-karma' );

  grunt.initConfig({
    '6to5': {
      options: {
        sourceMap: true,
        modules: 'amd',
        experimental: true
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
        }, {
          src: 'node_modules/grunt-6to5/node_modules/6to5/browser-polyfill.js',
          dest: 'dist/lib/polyfill.js'
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
    },

    'karma': {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
	});

	grunt.registerTask( 'default', [ 'eslint' ] );
};
