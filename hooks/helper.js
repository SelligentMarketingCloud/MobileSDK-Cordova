const fs = require('fs');

const destinyGradleExtrasFile = 'platforms/android/app/build-extras.gradle'
const repositories = [
  'jcenter()',
  'maven { url "https://maven.google.com" }'
]

const dependencies = [];

const applyPlugins = [
  "apply plugin: 'com.google.gms.google-services'"
]

const androidDefaultConfigs = [
  'multiDexEnabled true'
]

function splitContenPostBuildExtras(existingFileContent) {
  const pattern = 'ext.postBuildExtras = {';

  return existingFileContent.split(pattern);
}

function rebuildSection(section = '', pattern, iteration, prepend = '', append = '') {
  const [before, after] = section.split(pattern).map(x => x.trim());

  if (!after) {
    return before + '\n' + prepend + pattern + '\n' + iteration.join('\n') + '\n' + '}' + append;
  } else {
    // Add any lines that DONT already exist
    return before + '\n' + pattern + '\n' + iteration.filter(i => !after.includes(i))
      .join('\n') + '\n' + after;
  }
}

function rebuildRepositories(postBuildExtras) {
  const pattern = 'repositories {'

  return rebuildSection(postBuildExtras, pattern, repositories);
}

function rebuildDependencies(postBuildExtras) {
  const pattern = 'dependencies {'

  return rebuildSection(postBuildExtras, pattern, dependencies);
}

function rebuildAndroidDefaultConfigs(postBuildExtras) {
  const pattern = 'defaultConfig {'

  return rebuildSection(postBuildExtras, pattern, androidDefaultConfigs, '\nandroid {\n', '\n}');
}

function addApplyPlugins(postBuildExtras) {
  // Add any plugins that aren't added yet
  return postBuildExtras + `\n` + applyPlugins.filter(p => !postBuildExtras.includes(p))
    .join('\n');
}

module.exports = {
  rebuildGradleExtras: function () {
    let existingFileContent = '';
    let newFileContent = '';
    let infoComment = '/** KEEP THIS SECTION AS LAST SECTION **/'

    if (fs.existsSync(destinyGradleExtrasFile)) {
      existingFileContent = fs.readFileSync(destinyGradleExtrasFile, 'utf8') || '';
    }

    const [existingGradleContent, postBuildExtras] = splitContenPostBuildExtras(existingFileContent);
    let newPostbuildExtras = (postBuildExtras || '').trim();

    // Remove that last }
    if (newPostbuildExtras.length && newPostbuildExtras[newPostbuildExtras.length - 1] === '}') {
      newPostbuildExtras = newPostbuildExtras.slice(0, newPostbuildExtras.length - 1);
    }

    // Start rebuilding the gradle sections
    newPostbuildExtras = rebuildRepositories(newPostbuildExtras);
    newPostbuildExtras = rebuildDependencies(newPostbuildExtras);
    newPostbuildExtras = rebuildAndroidDefaultConfigs(newPostbuildExtras);
    newPostbuildExtras = addApplyPlugins(newPostbuildExtras);

    newFileContent = existingGradleContent;

    if (!newFileContent.includes(infoComment)) newFileContent += '\n' + infoComment + '\n';
    newFileContent += 'ext.postBuildExtras = {\n';
    newFileContent += newPostbuildExtras;
    newFileContent += '\n}';

    fs.writeFileSync(destinyGradleExtrasFile, newFileContent);
  }
};