module.exports = function(grunt) {
    
    "use strict";

	// config
    grunt.initConfig({
        lint: {
            files: ['grunt.js']
        },
        docco: {
            debug: {
                src: [
                    '../discussions/001/*.js',
                    '../discussions/002/*.js',
                    '../discussions/003/003_prototype_mixins.js',
                    '../discussions/004/004_chaining.js',
                    '../discussions/005/005_singleton.js',
                    '../discussions/006/006_abstract_factory.js',
                    '../discussions/007/007_composite.js',
                    '../discussions/008/008_decorator.js'
                ],
                options: {
                    output: '../docs/'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: false,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            },
            globals: {}
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-docco');

    // tasks
    grunt.registerTask('default', 'lint docco');
    
};