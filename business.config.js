/* eslint-disable no-undef */
//@flow
'use strict';
const fs = require('fs');
const crypto = require('crypto');

function createModuleIdFactory() {
    const fileToMap = Object.create({});
    const projectRootPath = __dirname;
    const usedIds = {};
    let startId = 0;
    return path => {
        let name = '';
        if (path.indexOf('node_modules/react-native/Libraries/') > 0) {
            name = path.substr(path.lastIndexOf('/') + 1);
        } else if (path.indexOf(projectRootPath) == 0) {
            name = path.substr(projectRootPath.length + 1);
        }
        name = name.replace('.js', '');
        name = name.replace('.png', '');
        name = name.replace(new RegExp('/', 'gm'), '_');
        if (fileToMap[name]) {
            return fileToMap[name].base64;
        } else {
            const hash = crypto.createHash('md5');
            hash.update(name);
            const id = hash.digest('base64');
            const hashCode = startId++;
            usedIds[id] = path;
            fileToMap[name] = {base64: id, id: hashCode};
            fs.writeFile('business.mainfest.json', JSON.stringify(fileToMap));
            return id;
        }
    };
}

function postProcessModulesFilter(module) {
    // const projectRootPath = __dirname;
    // console.log("---" + JSON.stringify({path: module.path, type: module.output[0].type}))
    if (module['path'].indexOf('__prelude__') >= 0) {
        return false;
    }
    if (module['path'].indexOf('/node_modules/') > 0) {
        if ('js/script/virtual' == module['output'][0]['type']) {
            return true;
        }
        return false;
    }
    return true;
}

module.exports = {
    serializer: {
        createModuleIdFactory: createModuleIdFactory,
        processModuleFilter: postProcessModulesFilter
    }
};
