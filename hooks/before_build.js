#!/usr/bin/env node

//
// This hook copies various resource files 
// from our version control system directories 
// into the appropriate platform specific location
//


// configure all the files to copy.  
// Key of object is the source file, 
// value is the destination location.  
// It's fine to put all platforms' icons 
// and splash screen files here, even if 
// we don't build for all platforms 
// on each developer's box.
module.exports = function (ctx) {

    console.log('**********************************');
    console.log('* Selligent Cordova before build *');
    console.log('**********************************');

    var fs = require('fs');
    var path = require('path');

    // key is the source of the file, the value is the destination of the file
    var filesToCopy = [
        {
            "../src/android/build-extras.gradle":
                "platforms/android/app/build-extras.gradle"
        }
    ];

    var currentBuildPlatforms = ctx.opts.cordova.platforms;
    console.log("* Current build platforms: ", currentBuildPlatforms);

    // no need to configure below
    var rootdir = process.argv[2];
    if (rootdir) {
        currentBuildPlatforms.forEach(function (platform, index, array) {
            console.log("* Running build hooks for " + platform)
            switch (platform) {
                case "android":
                    filesToCopy.forEach(function (obj) {
                        Object.keys(obj).forEach(function (key) {
                            var destinationForFile = obj[key];
                            var srcfile = path.join(__dirname, key);
                            var destfile = path.join(destinationForFile);
                            var destdir = path.dirname(destfile);
                            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                                console.log("** Copying " + srcfile + " to " + destfile);
                                fs.createReadStream(srcfile).pipe(
                                    fs.createWriteStream(destfile));
                            }
                        });
                    });
                    break;
                default:
                    console.log("** No specific 'before build'-hooks to be performed for platform " + platform);
                    break;
            }
        });
    }
    console.log('******* Build Hook Finished *******')
};