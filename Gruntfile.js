module.exports = function ( grunt ) {
    require( 'matchdep' )
        .filterDev( 'grunt-*', './package.json' )
        .forEach( grunt.loadNpmTasks );

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        /*Grunt Watch*/
        watch: {
            options: {
                reload: true,
                atBegin: true
            },
            css: {
                files: [
		    		'Sass/*.scss',
		    		'Sass/**/*.scss'
		    	],
                tasks: [ 'sass', 'postcss' ]
            }
        },

        /*Task - Compile SASS*/
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    'Stylesheets/main.css': 'Sass/main.scss'
                }
            }
        },

        /* Task - PostCSS*/
        postcss: {
            options: {
                map: true,
                processors: [
                    require( 'autoprefixer' )( {
                        browsers: [ 'last 2 versions' ]
                    } )
                ]
            },
            dev: {
                src: 'Stylesheets/*.css'
            }
        }

    } );

    grunt.registerTask( 'default', [ 'watch' ] );
};
