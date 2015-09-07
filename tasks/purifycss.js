/*
 * grunt-purifycss
 * https://github.com/purifycss/grunt-purify-css
 *
 * Copyright (c) 2015 Phoebe Li, Matthew Rourke, Kenny Tran
 * Licensed under the MIT license.
 */

'use strict';

var glob = require('glob');
var purify = require('purify-css');

module.exports = function(grunt) {

  grunt.registerMultiTask('purifycss', 'Clean unnecessary CSS', function(task) {
    // Merge task-specific and/or target-specific options with these defaults.
    var data = this.data;
    if(task){
      var data = this.data[task];
    }
    var options = this.options({
    });

    var src = [];
    data.target.src.forEach(function(pathPattern) {
      var files = glob.sync(pathPattern);
      console.log("Source Files: ", files);
      src = src.concat(files);
    });

    var styles = [];
    data.target.css.forEach(function(pathPattern) {
      var style = glob.sync(pathPattern);
      console.log("Style Files: ", style);
      styles = styles.concat(style);
    });

    var pure = purify(src, styles, {write: false, info: true});

    grunt.file.write(data.target.dest, pure);
    grunt.log.writeln('File "' + data.dest + '" created.');
  });

};
