module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ''
			},
			dist: {
				// the files to concatenate
				src: [
					'src/module.js',
					'src/controllers/*.js',
					'src/services/*.js'
				],
				
				// the location of the resulting JS file
				dest: 'www/app/<%= pkg.name %>.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};

