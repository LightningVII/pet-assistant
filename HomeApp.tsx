import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import RemoteSensingTaskList from './screens/RemoteSensingTaskList';
import RemoteSensingTaskDetail from './screens/RemoteSensingTaskDetail';
import FeedbackForm from './screens/FeedbackForm';
import ImagesPicker from './screens/ImagesPicker';

const Stack = createStackNavigator();
const BadgedIcon = withBadge()(Icon)

export default () => <NavigationNativeContainer>
  <Stack.Navigator>
    <Stack.Screen name="RemoteSensingTaskList" options={{
      headerTitle: "我的任务",
      headerRight: props => <AntDesign name={'search1'} size={20} style={{ marginRight: 20 }} />,
      headerLeft: props => <BadgedIcon type='antdesign' name="bells" size={20} containerStyle={{ marginLeft: 20 }} />,
    }} component={RemoteSensingTaskList} />
    <Stack.Screen name="RemoteSensingTaskDetail" component={RemoteSensingTaskDetail} />
    <Stack.Screen name="FeedbackForm" component={FeedbackForm} />
    <Stack.Screen name="ImagesPicker" component={ImagesPicker} />
  </Stack.Navigator>
</NavigationNativeContainer>
