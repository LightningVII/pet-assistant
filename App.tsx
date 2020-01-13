import * as React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  headerList: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerArticle: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  }
});

const Stack = createStackNavigator();
export default function () {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator headerMode={'screen'} initialRouteName="List">
        <Stack.Screen name="List">
          {props => <List {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Article">
          {props => <Article {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationNativeContainer >
  );
}
;
