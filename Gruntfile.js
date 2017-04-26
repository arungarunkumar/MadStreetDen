module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({
    less: {
      options: {
        paths: ["assets/style"],
				plugins: [
					new (require('less-plugin-autoprefix'))({browsers: ["chrome > 10", "firefox > 10", "ie > 7", "android > 2", "ios > 5"]}),
				]
			},
			build: {
                files: {
                    "assets/style/build/main.css": ["assets/style/main.less"]
        		}
			}
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/style/build',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/style/build',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: ['assets/style/*.less'],
                tasks: ['less:build']
            },
            options: {
                atBegin: true
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ["chrome > 10", "firefox > 10", "ie > 7", "android > 2", "ios > 5"]
                    })
                ]
            },
            dist: {
                src: 'assets/style/*.css'
            }
        }
    });
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', [
        'less',
        'cssmin'
    ]);
};
