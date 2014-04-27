module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ''
			},
			dist: {
				// the files to concatenate
				src: [
					'src/app/module.js',
					'src/app/controllers/*.js',
					'src/app/services/*.js'
				],

				// the location of the resulting JS file
				dest: 'www/app/<%= pkg.name %>.js'
			}
		},
		copy: {
		css:{
			src: 'src/css/style.css',
			dest: 'www/css/<%= pkg.name %>.css'
		},
		data:{
			expand: true, 
			flatten: true,
			src: 'src/data/*',
			dest: 'www/data/'
		},
		products:{
			expand: true, 
			flatten: true,
			src: 'src/products/*',
			dest: 'www/products/'
		},
		images:{
			expand: true, 
			flatten: true,
			src: 'src/images/*',
			dest: 'www/images/'
		},
		fonts:{
			expand: true, 
			flatten: true,
			src: 'src/fonts/*',
			dest: 'www/fonts/'
		},
		views:{
			expand: true, 
			flatten: true,
			src: 'src/views/*',
			dest: 'www/views/'
		},
		lib: {
			expand: true, 
			cwd: 'src/lib/',
				src: [
					'bootstrap/css/bootstrap.css',
					'jquery-ui/css/ui-lightness/jquery-ui-1.9.2.custom.css',
					'jquery/js/jquery.js',
					'jquery-ui/js/jquery-ui-1.9.2.custom.js',
					'jquery-ui-touch-punch/jquery.ui.touch-punch.js',
					'bootstrap/js/bootstrap.min.js',
					'angular/angular.js',
					'angular/angular-route.js',
					'angular/angular-touch.js'
				],
				dest: 'www/lib/',
			},
		},
		processhtml: {
			dist: {
				files: {
					'www/index.html': 'src/index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('default', ['concat', 'copy', 'processhtml']);

};