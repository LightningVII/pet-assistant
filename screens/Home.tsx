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
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { SearchBar, ListItem, colors } from "react-native-elements";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RemoteSensingTaskList from "./RemoteSensingTaskList";
import SafeAreaViewLoading from "../layouts/SafeAreaViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 16 },
        tabStyle: { width: "auto" }
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ title: "正在进行" }}
        component={RemoteSensingTaskList}
      />
      <Tab.Screen
        name="Settings"
        options={{ title: "已关闭" }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

const CirleIcon = ({
  children,
  text = "",
  size = null,
  handlePress = () => console.log("2323 :", 2323)
}) => (
  <TouchableWithoutFeedback onPress={handlePress}>
    <View>
      <View
        style={{
          width: size || width / 6,
          height: size || width / 6,
          borderColor: colors.primary,
          borderWidth: 2,
          backgroundColor: "white",
          borderRadius: size / 2 || width / 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        {children}
      </View>
      {text ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            fontSize: 16,
            marginTop: 8
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

  navigation.setOptions({
    headerTitle: "桂林执法",
    headerLeft: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          onPress={async () => {
            await AsyncStorage.removeItem("userid");
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Login");
          }}
          name={"user"}
          size={20}
          style={{ marginLeft: 20 }}
        />
        <Text>{username || "用户名"}</Text>
      </View>
    ),
    headerRight: () => (
      <AntDesign
        onPress={async () => {
          await AsyncStorage.removeItem("userid");
          navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate("Login");
        }}
        name={"logout"}
        size={20}
        style={{ marginRight: 20 }}
      />
    )
  });

  return (
    <SafeAreaViewLoading
      loading={loading}
      style={{ flex: 1, backgroundColor: colors.grey5 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 40,
          width: "100%"
        }}
      >
        <CirleIcon size={60}>
          <AntDesign name={"user"} size={40} color={colors.primary} />
        </CirleIcon>
        <Text style={{ marginLeft: 20, fontSize: 20, color: colors.primary }}>
          {username || "用户名"}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 20
        }}
      >
        <CirleIcon
          handlePress={() => navigation.navigate("MyMessages")}
          text={"我的消息"}
        >
          <AntDesign name={"message1"} size={30} color={colors.primary} />
        </CirleIcon>
        <CirleIcon
          handlePress={() => navigation.navigate("MyTasks")}
          text={"我的任务"}
        >
          <FontAwesome5 name={"tasks"} size={30} color={colors.primary} />
        </CirleIcon>
        <CirleIcon
          handlePress={() => navigation.navigate("TasksMap")}
          text={"任务地图"}
        >
          <FontAwesome5 name={"map"} size={30} color={colors.primary} />
        </CirleIcon>
      </View>

      <MyTabs />
    </SafeAreaViewLoading>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(Home);
