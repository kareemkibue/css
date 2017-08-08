/*Config*/
var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var runSequence = require( 'run-sequence' );
var sourceMaps = require( 'gulp-sourcemaps' );
/*SASS/CSS*/
var autoPrefixer = require( 'gulp-autoprefixer' );
var cssMin = require( 'gulp-cssnano' );
var sass = require( 'gulp-sass' );
/*Config*/
var vendorCssFiles = [
    'node_modules/normalize.css/normalize.css'
];

gulp.task( 'watch', function() {
    gulp.watch( 'sass/**/*.scss', [ 'css' ] );
} );

gulp.task( 'build', function( callback ) {
    return runSequence(
        'vendorStyles',
        'css'
    );
} );

gulp.task( 'vendorStyles', function() {
    return gulp.src( vendorCssFiles )
        .pipe( concat( '_vendor.scss' ) )
        .pipe( gulp.dest( 'sass/base/' ) );
} );

gulp.task( 'css', function() {
    return gulp.src( 'sass/main.scss' )
        .pipe( sass()
            .on( 'error', sass.logError ) )
        .pipe( sourceMaps.init() )
        .pipe( autoPrefixer( {
            browsers: [ 'last 2 versions' ],
            cascade: false
        } ) )
        .pipe( sourceMaps.write( '.' ) )
        .pipe( gulp.dest( 'Stylesheets' ) );
} );