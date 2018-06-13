#!/usr/bin/env node


module.exports = function (ctx) {

    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) {
        console.log(stdout);
    }

    console.log('**********************************');
    console.log('* Selligent Cordova plugin added *');
    console.log('**********************************');

    var currentBuildPlatforms = ctx.opts.cordova.platforms;

    var rootdir = process.argv[2];
    if (rootdir) {
        currentBuildPlatforms.forEach(function (platform, index, array) {
            switch (platform) {
                case "android":
                    console.log('* If you are using this plugin on the Android platform please follow these instructions:');
                    console.log('* In the root build.gradle file (under /platforms/android) add:');
                    console.log("buildscript {");
                    console.log("    dependencies {");
                    console.log("         classpath 'com.google.gms:google-services:3.2.0'  // <-- add this line");
                    console.log("    }");
                    console.log("}");
                    console.log("**** That's it, you should be able to use the plugin now! ****");
                    break;
                default:
                    console.log("* Running pod commands for iOS platform");
                    exec("cd ../platforms/ios/ && pod repo update && pod install", puts);
                    break;
            }
        });
    }
};