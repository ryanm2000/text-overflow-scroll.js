module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    sass: {
      dist: {
        files: {
          'dist/styles/demo.css': 'src/styles/demo.scss'       // 'destination': 'source'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('deploy', ['githubPages:target']);
  grunt.registerTask('default', ['sass']);

};
