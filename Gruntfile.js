/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %>\n' +
      '* Contributors <%= pkg.contributors.join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['js/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
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
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      main: {
        src: 'js/*.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      main: {
        options: {
          reload: true
        },
        files: ['<%= jshint.main.src %>', 'sass/*.scss'],
        // tasks: ['jshint:main', 'sass:dist_exp']
        tasks: ['sass', 'copy']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          'dist/<%= pkg.name %>.min.css': 'sass/*.scss'
        }
      },
      dist_exp: {
        options: {
          style: 'expanded',
          sourcemap: true,
          compass: true
        },
        files: {
          'dist/<%= pkg.name %>.css': 'sass/*.scss'
        }
      }
    },
    copy: {
      demo: {
        expand: true,
        flatten: true,
        src: 'dist/*.min.*',
        dest: 'demo/',
        filter: 'isFile'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass']);
  grunt.registerTask('default', ['concat', 'uglify', 'sass']);

  grunt.registerTask('demo', ['copy']);

};
