/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  WebView,
  BackAndroid,
  ToolbarAndroid,
} from 'react-native';

import DashboardAndroid from './js/views/dashboard/DashboardAndroid';
import PostAndroid from './js/views/post/PostAndroid';

var _navigator;



export default class HackNewsDemo extends Component {
	
	
  componentDidMount(){
	BackAndroid.addEventListener('hardwareBackPress', () => {
		  if (_navigator.getCurrentRoutes().length === 1  ) {
			 return false;
		  }
		  _navigator.pop();
		  return true;
	});
  }
  render() {
    return (
      <Navigator style = {styles.container}
		tintColor={'#FF6600'}
		initialRoute={{id:'Dashboard'}}
		renderScene= {this.navigatorRenderScene}
	  />
    );
  }
  
  navigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'Dashboard':
        return (<DashboardAndroid navigator={navigator} />);
      case 'Post':
        return (<PostAndroid navigator={navigator}
                      title={route.title}
                      post={route.post}/>);
      case 'Web':
          return (
            <View style={{flex: 1}}>
                <ToolbarAndroid style={styles.toolbar}
                                title={route.title}
                                navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
                                onIconClicked={navigator.pop}
                                titleColor={'#FFFFFF'}/>
                <WebView source={{uri: route.url}}
                         javaScriptEnabled={true}/>
            </View>
          );
    }
  }
}

const styles = StyleSheet.create({
	
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  }
});

AppRegistry.registerComponent('HackNewsDemo', () => HackNewsDemo);
