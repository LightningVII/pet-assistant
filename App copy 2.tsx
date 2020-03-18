import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import List from './screens/List';
import Article from './screens/Article';
import * as theme from './theme';

import { FontAwesome, Octicons, MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'screen'} initialRouteName="List">
        <Stack.Screen name="List">
          {props => <List {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Article">
          {props => <Article {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  );
}
;
