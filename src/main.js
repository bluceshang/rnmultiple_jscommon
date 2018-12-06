//@flow
'use strict';

import 'react';
import {NativeModules, AppRegistry} from 'react-native';
import PlatformUtl from './PlatformUtil';

if (PlatformUtl.isAndroid()) {
    const {setCustomSourceTransformer} = require('resolveAssetSource');
    const PixelRatio = require('PixelRatio');
    const AssetSourceResolver = require('AssetSourceResolver');
    const assetPathUtils = require('../node_modules/react-native/local-cli/bundle/assetPathUtils');

    const getAssetPathInDrawableFolder = (asset) => {
        const scale = AssetSourceResolver.pickScale(asset.scales, PixelRatio.get());
        const drawableFolder = assetPathUtils.getAndroidResourceFolderName(asset, scale);
        const fileName = assetPathUtils.getAndroidResourceIdentifier(asset);
        return `${drawableFolder}/${fileName}.${asset.type}`;
    };

    setCustomSourceTransformer((resolver) => {
        const {SourceCode} = NativeModules;
        let bundlePath = SourceCode.scriptURL;
        if (bundlePath.startsWith('assets://')) {
            bundlePath = bundlePath.substring(9, bundlePath.lastIndexOf('/') + 1);
            const rootURL = `asset:///${bundlePath}`;
            const asset = resolver.asset;
            return resolver.fromSource(
                rootURL + getAssetPathInDrawableFolder(asset)
            );
        }
        return resolver.defaultAsset();
    });
}


import FramePage from './FramePage';

AppRegistry.registerComponent('FramePage', () => FramePage);
