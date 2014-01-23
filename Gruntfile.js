module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githubPages: {
      target: {
        options: {
          // The default commit message for the gh-pages branch
          commitMessage: 'push'
        },
        // The folder where your gh-pages repo is
        src: '_site'
      }
    }
  });

  grunt.loadNpmTasks('grunt-github-pages');

  grunt.registerTask('deploy', ['githubPages:target']);

};
