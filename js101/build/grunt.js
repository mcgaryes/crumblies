module.exports = function(grunt) {
    
    "use strict";

	// config
    grunt.initConfig({
        lint: {
            files: [
                'grunt.js', 
                '../discussions/*.js'
            ]
        },
        docco: {
            debug: {
                src: [
                    '../discussions/001/*.js'
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
                newcap: true,
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