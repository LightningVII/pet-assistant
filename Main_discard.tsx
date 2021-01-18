import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import RemoteSensingTaskDetail from "./screens/RemoteSensingTaskDetail";
import RemoteSensingTaskList from "./screens/RemoteSensingTaskList";
import FeedbackForm from "./screens/FeedbackForm";
import ImagesPicker from "./screens/ImagesPicker";
import MyMessages from "./screens/MyMessages";
import TasksMap from "./screens/TasksMap";
import Login from "./screens/Login";
import { connect } from "react-redux";
import * as Actions from "./redux/userActions.js";

const { Navigator, Screen } = createStackNavigator();

export default connect(
  () => ({}),
  Actions
)((props) => {
  const [isReady, setIsReady] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState("Login");

  useEffect(() => {
    (async function () {
      const { fetchMe } = props;
      const userid = await AsyncStorage.getItem("userid");
      if (userid) {
        await fetchMe(userid);
        setInitialRouteName("Home");
      }
      setIsReady(true);
    })();
  }, []);
  if (!isReady) return null;

  return (
    <NavigationContainer>
      <Navigator initialRouteName={initialRouteName}>
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen
          name="RemoteSensingTaskDetail"
          component={RemoteSensingTaskDetail}
        />
        <Screen name="FeedbackForm" component={FeedbackForm} />
        <Screen name="ImagesPicker" component={ImagesPicker} />
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
          name="TasksMap"
          options={{ title: "任务地图" }}
          component={TasksMap}
        />
        <Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
      </Navigator>
    </NavigationContainer>
  );
});
