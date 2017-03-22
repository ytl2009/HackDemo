'use strict';

import React, {Component} from 'react';

import {Text,StyleSheet,View,Platform,TabBarIOS} from 'react-native';

import CustomTabBar from './CustomTabBar';

import ScrollableTabView from 'react-native-scrollable-tab-view';

//var Icon = require('react-native-vector-icons/FontAwesome');
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class TabBar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	structure: this.props.structure,
		selectedTab: this.props.selectedTab,
		iconSize: this.props.iconSize ? this.props.iconSize : 30,
		activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null
	  };
	}

	render(){
		if (Platform.OS == 'android'){
			return(
				<ScrollableTabView renderTabBar={() => <CustomTabBar />}
								   onChangeTab={(o)=>{}}
                           		   tabBarPosition={'bottom'}
                                   initialPage={this.state.selectedTab}>
                    {this.state.structure.map((tabProps, tabIndex) => 
                    	<View style={{flex:1}}
                    		  tabLabel={tabProps.title+'!$#'
                    				   +tabProps.iconName+'!$#'
                    				   +this.state.iconSize}
                    		  key={tabIndex}>
				            {tabProps.renderContent()}
				        </View>
	            	)}
                </ScrollableTabView>
			);
		}

		return(
            <TabBarIOS tintColor={this.state.activeTintColor}
            		   translucent={true}>
            	{this.state.structure.map((tabProps, tabIndex) => 
            		<Icon.TabBarItem title={tabProps.title}
            						 iconName={tabProps.iconName}
            						 iconSize={this.state.iconSize}
		          					 selected={tabIndex == this.state.selectedTab}
		          					 onPress={() => {this.setState({selectedTab: tabIndex});}}
		          					 key={tabIndex}>
		          			{tabProps.renderContent()}
		        	</Icon.TabBarItem>
            	)}
		     </TabBarIOS>
        );

	}
}

const styles = StyleSheet.create({
});
