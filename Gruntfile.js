'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
    	livereload: {
        	options: {
          		port: 9001,
          		base: './',
          		middleware: function(connect, options) {
            		return [lrSnippet, folderMount(connect, options.base)]
          		}
        	}
      	}
  	},
    
	regarde: {
      web: {
        files: ['index.html'],
        tasks: ['livereload']
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
	
  grunt.registerTask('live', ['livereload-start', 'connect:livereload', 'regarde']);	

};