module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('deploy', ['githubPages:target']);

};
