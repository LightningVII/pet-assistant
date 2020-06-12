import React, { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import TasksMap from "./screens/TasksMap";
import PetData from "./screens/PetData";
import ImagesPicker from "./screens/ImagesPicker";
import Me from "./screens/Me";
import FeedbackForm from "./screens/FeedbackForm";

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const tabBar = {
  List: (color, size) => <AntDesign name={"home"} size={size} color={color} />,
  Settings: (color, size) => (
    <AntDesign name={"setting"} size={size} color={color} />
  ),
  Map: (color, size) => (
    <AntDesign name={"setting"} size={size} color={color} />
  ),
  Me: (color, size) => <AntDesign name={"setting"} size={size} color={color} />,
  Home: (color, size) => (
    <AntDesign name={"setting"} size={size} color={color} />
  ),
};

const routeZHName = {
  Map: "附近地图",
  List: "宠物数据",
  Me: "我",
};

function HomeTabsScreen({ navi, route }) {
  useLayoutEffect(() => {
    const titleKey = getHeaderTitle(route);
    navi.setOptions({
      title: routeZHName[titleKey],
      headerShown: titleKey === "Map",
    });
  }, [navi, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route: r }) => ({
        tabBarIcon: ({ color, size }) => tabBar[r.name](color, size),
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Map"
        options={{ tabBarLabel: "附近地图" }}
        component={TasksMap}
      />
      <Tab.Screen
        name="List"
        options={{ tabBarLabel: "宠物数据" }}
        component={PetData}
      />
      <Tab.Screen name="Me" options={{ tabBarLabel: "我" }} component={Me} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function HomeDrawerScreen({ navigation }) {
  return (
    <Drawer.Navigator drawerType="slide" initialRouteName="Home">
      <Drawer.Screen name="Home">
        {(props) => <HomeTabsScreen {...props} navi={navigation} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

function getHeaderTitle(route) {
  // const { state, params } = route?.state?.routes?.[0] || {};
  const { state, params } = route;

  const routeName = state
    ? state.routes[state.index].name
    : params?.screen || "Map";

  return routeName;
}

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({ route }) => ({
            headerStyle: { backgroundColor: "tomato" },
            headerTintColor: "#FFF",
          })}
          component={HomeDrawerScreen}
        />
        <Stack.Screen name="SettingsScreen">
          {(props) => <SettingsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ImagesPicker" component={ImagesPicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
