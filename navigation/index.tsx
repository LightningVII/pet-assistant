import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import ImagesPicker from "../screens/ImagesPicker";
import FeedbackForm from "../screens/FeedbackForm";
import Login from "../screens/Login";
import Home from "../screens/Home";
import RemoteSensingTaskDetail from "../screens/RemoteSensingTaskDetail";
import RemoteSensingTaskList from "../screens/RemoteSensingTaskList";
import MyMessages from "../screens/MyMessages";
import { RootStackParamList } from "../types";
import HomeTabsScreen from "./HomeTabsScreen";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeTabsScreen}
      />
      <Screen name="ImagesPicker" component={ImagesPicker} />
      <Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Screen
        name="TaskCenter"
        component={Home}
        options={{ headerShown: false }}
      />
      <Screen
        name="RemoteSensingTaskDetail"
        component={RemoteSensingTaskDetail}
      />
      <Screen name="FeedbackForm" component={FeedbackForm} />
      <Screen
        name="MyMessages"
        options={{ title: "我的消息" }}
        component={MyMessages}
      />
      <Screen
        name="RemoteSensingTaskList"
        options={{ title: "我的任务" }}
        component={RemoteSensingTaskList}
      />
      <Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Navigator>
  );
}
