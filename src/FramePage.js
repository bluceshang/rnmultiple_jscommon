//@flow
'use strict';

import React from 'react';
import {View, Text, Image} from 'react-native';

export default class FramePage extends React.Component {

    render() {
        return (
            <View>
                <Text style={{marginLeft: 20, marginTop: 20, fontSize: 16, color: '#333'}}>权利的游戏</Text>
                <Image style={{marginLeft: 20, marginTop: 8, width: 262, height: 192}}
                       source={require('./resource/girl_no_one.jpeg')}/>
            </View>);
    }
}
