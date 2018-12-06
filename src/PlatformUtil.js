//@flow
'use strict';
import {Platform} from 'react-native';

const PlatformUtil = {
    isAndroid() {
        return Platform.OS == 'android';
    },

    isIOS() {
        return Platform.OS == 'ios';
    }
};

module.exports = PlatformUtil;
