import React, { useEffect, useState, Children } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  AsyncStorage,
  Text,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { SearchBar, ListItem, colors, Image } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RemoteSensingTaskList from "./RemoteSensingTaskList";
import SafeAreaViewLoading from "../layouts/SafeAreaViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";

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

const TabItem = ({
  children,
  text = "",
  size = null,
  handlePress = () => console.log("2323 :", 2323),
}) => (
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
  const { navigation, fetchChangespotList, remoteSensing, user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { remoteSensingList: list } = remoteSensing || {};
  const { userid, username } = user?.user || {};

  return (
    <SafeAreaViewLoading
      loading={loading}
      style={{ flex: 1, backgroundColor: colors.grey5 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "#212121", // colors.primary,// "#00897b", // "#1e88e5"
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 20,
          // marginTop: 22,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <CircleIcon size={40}>
            <AntDesign name={"user"} size={20} color={"white"} />
          </CircleIcon> */}
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
              {"第一大队大队长"}
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
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/static/email.png")}
          />
          {/* <AntDesign name={"message1"} size={24} color={"white"} /> */}
        </TabItem>
        <TabItem
          handlePress={() => navigation.navigate("RemoteSensingTaskList")}
          text={"我的任务"}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/static/checklist.png")}
          />
          {/* <FontAwesome5 name={"tasks"} size={24} color={"white"} /> */}
        </TabItem>
        <TabItem
          handlePress={() => navigation.navigate("TasksMap")}
          text={"任务地图"}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/static/radar.png")}
          />
          {/* <FontAwesome5 name={"map"} size={24} color={"white"} /> */}
        </TabItem>
      </View>
      <MyTabs />
    </SafeAreaViewLoading>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(Home);
