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
		    		'sass/*.scss',
		    		'sass/**/*.scss'
		    	],
                tasks: [ 'sass', 'postcss' ]
            },
            init: {
                files: [
                    'bower_components/**/',
                ],
                tasks: [ 'copy' ]
            }
        },

        /*Task - Compile SASS*/
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    'css/main.css': 'sass/main.scss'
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
                src: 'css/*.css'
            }
        },

        /*Task - Copy over Vendor Scripts*/
        copy: {
            /*customSass: {
                files: [
                    {
                        src: 'bower_components/sass-custom/sass/custom/**',
                        dest: 'sass/custom/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }*/
        }

    } );

    grunt.registerTask( 'default', [] );
    grunt.registerTask( 'init', [ 'copy' ] );
};
