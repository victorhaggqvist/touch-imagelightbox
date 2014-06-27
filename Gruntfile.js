/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    watch: {
      main: {
        options: {
          reload: true
        },
        files: ['index.php', 'sass/demo.scss'],
        tasks: ['sass']
      }
    },
    responsive_images: {
      full: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'web',
            width: 800
          },
          {
            name: 'thumb',
            height: 100
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['images/original/*.jpg'],
          cwd: './',
          custom_dest: 'images/{%= name %}/'
        }]
      }
    },
    sass: {
      main: {
        options: {
          style: 'compressed'
        },
        files: {
          'demo.css': 'sass/demo.scss'
        }
      }
    },
    copy: {
      lightbox_js: {
        expand: true,
        flatten: true,
        src: ['bower_components/touch-imagelightbox/dist/touch-imagelightbox.min.js'],
        dest: './',
        filter: 'isFile'
      },
      lightbox_css: {
        expand: true,
        flatten: true,
        src: ['bower_components/touch-imagelightbox/dist/touch-imagelightbox.min.css'],
        dest: './',
        filter: 'isFile'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task.
  grunt.registerTask('default', ['responsive_images', 'sass', 'copy']);

};
