#!/usr/bin/env node
var helper = require('./helper');

module.exports = function (ctx) {

    console.log('**********************************');
    console.log('* Selligent Cordova before build *');
    console.log('**********************************');

    var currentBuildPlatforms = ctx.opts.cordova.platforms;
    console.log("* Current build platforms: ", currentBuildPlatforms);

    // no need to configure below
    var rootdir = process.argv[2];
    if (rootdir) {
        currentBuildPlatforms.forEach(function (platform, index, array) {
            console.log("* Running build hooks for " + platform)
            switch (platform) {
                case "android":
                    helper.rebuildGradleExtras();
                    break;
                default:
                    console.log("** No specific 'before build'-hooks to be performed for platform " + platform);
                    break;
            }
        });
    }
    console.log('******* Build Hook Finished *******')
};