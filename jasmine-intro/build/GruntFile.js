module.exports = function(grunt) {

    'use strict';

    // config
    grunt.initConfig({
        jasmine: {
            all: {
                options: {
                    specs: '../tests/specs/*.js',
                    template: '../tests/index.tmpl'
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // tasks
    grunt.registerTask('default', ['jasmine']);
    
};