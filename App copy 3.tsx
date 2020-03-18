import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import List from './screens/List';
import Article from './screens/Article';

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen name="List">
        {props => <List {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const tabBar = {
  List: (color, size) => <AntDesign name={'home'} size={size} color={color} />,
  Settings: (color, size) => <AntDesign name={'setting'} size={size} color={color} />,
  Article: (color, size) => <AntDesign name={'setting'} size={size} color={color} />,
}

function HomeTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => tabBar[route.name](color, size),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="List" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}



const Drawer = createDrawerNavigator();
function HomeDrawerScreen() {
  return (
    <Drawer.Navigator drawerType="slide" initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeTabsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>)
}

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeDrawerScreen} />
        <Stack.Screen name="Article">
          {props => <Article {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
