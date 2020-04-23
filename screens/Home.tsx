import React, { useEffect, useState, Children } from "react";
import {
  View,
  AsyncStorage,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { colors, Image, withBadge, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RemoteSensingTaskList from "./RemoteSensingTaskList";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Actions from "../redux/remoteSensingActions.js";
import * as msgActions from "../redux/messageActions.js";

const { width } = Dimensions.get("window");

const { Navigator, Screen } = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 16 },
        tabStyle: { width: "auto" },
      }}
    >
      <Screen
        name="TasksOngoing"
        options={{ title: "正在进行" }}
        component={RemoteSensingTaskList}
      />
      <Screen
        name="TasksClosed"
        options={{ title: "已关闭" }}
        component={RemoteSensingTaskList}
      />
    </Navigator>
  );
}

const TabItem = ({ children, text = "", size = null, handlePress }) => (
  <TouchableWithoutFeedback onPress={handlePress}>
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {children}
      {text ? (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 14,
            marginTop: 8,
          }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  </TouchableWithoutFeedback>
);

function Home(props) {
  const { navigation, user, fetchMessageList, messageCount } = props;
  const { user: u } = user || {};
  const { userid, username, depts, roles } = u || {};
  const [{ deptname }] = depts;
  const [{ rolename }] = roles;
  const fetchParams = {
    pageNum: 1,
    pageSize: 200,
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchMessageList(fetchParams);
    });
    fetchMessageList(fetchParams);
    return unsubscribe;
  }, [userid]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "#212121",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 20,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/static/id-card.png")}
          />
          <View
            style={{
              marginLeft: 15,
              justifyContent: "space-around",
              height: 40,
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              {username || "用户名"}
            </Text>
            <Text style={{ fontSize: 12, color: "white" }}>
              {`${deptname}-${rolename}`}
            </Text>
          </View>
        </View>

        <FontAwesome
          onPress={async () => {
            await AsyncStorage.removeItem("userid");
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Login");
          }}
          name={"power-off"}
          size={20}
          style={{ marginRight: 20, color: "white" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: colors.primary,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <TabItem
          handlePress={() => navigation.navigate("MyMessages")}
          text={"我的消息"}
        >
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../assets/static/email.png")}
            />
            <Badge
              value={messageCount || null}
              status={messageCount ? "error" : "success"}
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
            />
          </View>
        </TabItem>
        <TabItem
          handlePress={() => navigation.navigate("RemoteSensingTaskList")}
          text={"我的任务"}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/static/checklist.png")}
          />
        </TabItem>
        <TabItem
          handlePress={() => navigation.navigate("TasksMap")}
          text={"任务地图"}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/static/radar.png")}
          />
        </TabItem>
      </View>
      <MyTabs />
    </SafeAreaView>
  );
}

export default connect(
  ({ remoteSensing, user, message }) => ({
    remoteSensing,
    user,
    messageCount:
      message?.messages?.list.filter((a) => a.xxzt === 1)?.length || 0,
  }),
  {
    ...Actions,
    ...msgActions,
  }
)(Home);
