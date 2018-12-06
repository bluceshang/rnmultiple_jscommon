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
            fs.writeFile('common.mainfest.json', JSON.stringify(fileToMap));
            return id;
        }
    };
}

module.exports = {
    serializer: {
        createModuleIdFactory: createModuleIdFactory
    }
};
