


/*=========================================================
						CONFIG
=========================================================*/


//path
var path = require('path');



//gulp
var gulp = require('gulp');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

var angularTemplateCache = require('gulp-angular-templatecache');
var mainBowerFiles = require('gulp-main-bower-files');
var filter = require('gulp-filter');
var saveLicense = require('uglify-save-license');
var runSequence = require('run-sequence');
var deleteLines = require('gulp-delete-lines');



/*=========================================================
					DEVELOPMENT TASKS
=========================================================*/

//paths
var jsPaths = ['src/app/**/*.module.js','src/app/**/*.js'];
// var sassPaths  = ['src/assets/styles/main.scss'];
var htmlTemplatePaths  = ['src/app/**/*.html'];





/*------------BUILDERS------------*/

gulp.task('buildScripts', function() {
//outputs main.js to src folder

	return gulp.src(jsPaths)
		.pipe(sourcemaps.init())
		.pipe(concat('src/main.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));
	
});

gulp.task('buildStyles', function() {
//outputs main.css to src folder

	return gulp.src('src/assets/styles/main.scss')
    .pipe(sourcemaps.init())

    // .pipe(concat('src/main.scss'))
    // .pipe(sass().on('error', sass.logError))
    .pipe(sass({ includePaths : ['src/assets/styles/'] }))
    
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src'));
	
});





/*------------INJECTORS------------*/

gulp.task('injectScripts', function() {
//injects main.js into index.html

	return gulp.src('./src/index.html')
 	.pipe(inject(gulp.src(['./src/main.js','./src/main.css']),{relative: true}))	
 	.pipe(gulp.dest('./src'));
	
});


gulp.task('injectStyles', function() {
//injects main.css into index.html

	return gulp.src('./src/index.html')
 	.pipe(inject(gulp.src(['./src/main.js','./src/main.css']),{relative: true}))	
 	.pipe(gulp.dest('./src'));
	
});





/*------------WATCHERS------------*/

gulp.task('watchScripts', function() {
	return gulp.watch(jsPaths,['buildScripts','injectScripts'])
});

gulp.task('watchStyles', function() {
	return gulp.watch(sassPaths,['buildStyles','injectStyles'])
});




/*------------DOERS------------*/

gulp.task('serve',['buildScripts','buildStyles','injectScripts','injectStyles','watchScripts','watchStyles'], function() {
// starts server, runs tasks
	
	//wiredep injects bower components
	var wiredep = require('wiredep')({src: 'src/index.html',  ignorePath: '/bower_components'});

	nodemon({
		script: 'index.js'
	})


});




/*=========================================================
					PRODUCTION TASKS
=========================================================*/
//declare paths
var jsPaths = ['src/app/**/*.module.js', '.temp/templates.js', 'src/app/**/*.js'];
var sassPaths  = ['src/**/*.scss'];
var htmlTemplatePaths  = ['src/app/**/*.html'];





gulp.task('production.cloneCleanIndex', function() {

	//INDEX CLONE
	//first copy index file to dist folder
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist'))
	.pipe(deleteLines({
      'filters': [
			      /<script/i
      			 ]
    }))
    .pipe(deleteLines({
      'filters': [
			      /<link\s+rel=["']/i
      			 ]
    }))
    .pipe(gulp.dest('./dist'));
})


gulp.task('production.removeScriptTags', function() {
//removes script tags from wiredep 	
  return gulp.src('./dist/index.html')
   .pipe(deleteLines({
      'filters': [
			      /<script/i
      			 ]
    }))
  .pipe(gulp.dest('./dist'));
});



gulp.task('production.removeLinkTags', function() {
//removes link tags from wiredep
  return gulp.src('./dist/index.html')
   .pipe(deleteLines({
      'filters': [
			      /<link\s+rel=["']/i
      			 ]
    }))
  .pipe(gulp.dest('./dist'));
});


/*------------BUILDERS------------*/

gulp.task('production.buildTemplateCache', function() {
	//TEMPLATE CACHE
	//build template cache and convert to angular script
	//put in temp folder to later reference in js build
	return gulp.src(htmlTemplatePaths)
	.pipe(angularTemplateCache({standAlone: false, module: 'app', root: 'app'}))
	.pipe(gulp.dest('./.temp'));
})



gulp.task('production.buildVendorScripts', function() {
	//VENDOR SCRIPTS BUILD
	//builds bower componenets js files
	//ends in dist/app folder
	var filterJS = filter('**/*.js', { restore: true });
	return gulp.src('./bower.json')
    .pipe(mainBowerFiles('**/*.js'))
    .pipe(filterJS)
    .pipe(concat('vendorScripts.js'))
    .pipe(uglify({output: {comments: saveLicense}}))
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./dist'));	
})



gulp.task('production.buildVendorStyles', function() {

    //VENDOR STYLES BUILD
	//builds bower componenets css files
	//ends in dist/app folder
	return gulp.src(['./bower_components/**/*.min.css'])
    .pipe(concat('./dist/vendorStyles.min.css'))
    .pipe(gulp.dest('./'))

})



gulp.task('production.buildScripts',['production.buildVendorScripts'], function() {

	//JS BUILD
	//ends in dist/app folder
	return gulp.src(jsPaths)
	.pipe(concat('./dist/main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./'));
})



gulp.task('production.buildStyles', ['production.buildVendorStyles'], function() {

	//STYLES BUILD
	//ends in dist/app folder
	return gulp.src(sassPaths)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('./dist/main.css'))
    .pipe(gulp.dest('./'));

})



/*------------INJECTORS------------*/


gulp.task('production.injectAll',[	
	'production.buildScripts',
	'production.buildStyles',
	], 

	function() {
	    //INJECT ALL
	    return gulp.src('./dist/index.html')
	 	.pipe(inject(gulp.src(['./dist/vendorScripts.js','./dist/main.js','./dist/**.css']),{relative: true}))	
	 	.pipe(gulp.dest('./dist'));

})




/*------------DOERS------------*/



gulp.task('production.build', function(){
	
	//runs tasks in sequence
	return runSequence([
					'production.cloneCleanIndex',
					'production.buildTemplateCache',
					'production.injectAll'
				],   productionBuildCompleteCB)

})//end production.build



function productionBuildCompleteCB() {
	console.log("Completed production build.")
}















































