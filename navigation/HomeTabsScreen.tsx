import React from "react";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TasksMap from "../screens/TasksMap";
import PetData from "../screens/PetData";
import Me from "../screens/Me";
import {
  BottomTabParamList,
  TasksMapParamList,
  PetDataParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const routeZHName = {
  Map: "附近地图",
  List: "宠物数据",
  Me: "我",
};

const tabBarIcon = {
  List: (color, size) => <AntDesign name={"home"} size={size} color={color} />,
  Settings: (color, size) => (
    <AntDesign name={"setting"} size={size} color={color} />
  ),
  Map: (color, size) => <Foundation name={"map"} size={size} color={color} />,
  Me: (color, size) => <AntDesign name={"setting"} size={size} color={color} />,
  Home: (color, size) => (
    <AntDesign name={"setting"} size={size} color={color} />
  ),
};

export default function HomeTabNavigator(props) {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={({ route: r }) => ({
        tabBarIcon: ({ color, size }) => tabBarIcon[r.name](color, size),
        tabBarLabel: routeZHName[r.name],
      })}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen name="Map" component={TasksMapNavigator} />
      <BottomTab.Screen name="List" component={PetDataNavigator} />
      <BottomTab.Screen name="Me" component={Me} />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TasksMapStack = createStackNavigator<TasksMapParamList>();
const TasksMapNavigator = () => (
  <TasksMapStack.Navigator>
    <TasksMapStack.Screen
      name="TasksMapScreen"
      component={TasksMap}
      options={{ headerTitle: "附近地图" }}
    />
  </TasksMapStack.Navigator>
);

const PetDataStack = createStackNavigator<PetDataParamList>();
const PetDataNavigator = () => (
  <PetDataStack.Navigator>
    <PetDataStack.Screen
      name="PetDataScreen"
      component={PetData}
      options={{ headerShown: false }}
    />
  </PetDataStack.Navigator>
);
