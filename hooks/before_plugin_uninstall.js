
///usr/bin/env node

console.log('************** Attention ***************');
console.log('* If you used this plugin on the Android platform it is best to do a bit of clean-up in the root build.gradle under /platform/android:');
console.log("buildscript {");
console.log("    dependencies {");
console.log("         classpath 'com.google.gms:google-services:3.2.0'  // <-- remove this line");
console.log("    }");
console.log("}");
console.log('****************************************');
console.log('* Selligent Cordova plugin uninstalled *');
console.log('****************************************');