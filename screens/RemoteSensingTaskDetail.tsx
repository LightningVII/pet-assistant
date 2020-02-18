import React from "react";
import { Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import {
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import { Card, ListItem, Button, Icon, colors } from "react-native-elements";
const { width } = Dimensions.get("window");

const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];

const aaa = [
  {
    name: "县区",
    avatar: "沛县"
  },
  {
    name: "地址",
    avatar: "沛城镇"
  },

  {
    name: "变动前",
    avatar: "建筑用地（无定着物）"
  },
  {
    name: "变动后",
    avatar: "建筑用地（有定着物）"
  },
  {
    name: "变更面积",
    avatar: "9181.7平方米"
  }
];

const styles = {
  subtitleStyle: { color: colors.grey2, marginTop: 5 },
  image: {},
  name: {}
};

export default function RemoteSensingTaskDetail(props) {
  const { navigation, route } = props;
  const { params } = route;
  // { navigation }
  navigation.setOptions({
    headerTitle: params.name,
    headerTitleContainerStyle: {
      width: 200
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.grey5 }}>
        <Card
          containerStyle={{ borderWidth: 0, padding: 0, margin: 0 }}
          title={
            <ListItem
              title={"分配人"}
              subtitle={"时间：111"}
              subtitleStyle={styles.subtitleStyle}
              leftAvatar={{
                source: { uri: users[0]?.avatar }
              }}
            />
          }
        >
          {aaa.map((u, i) => {
            return (
              <ListItem
                key={i}
                title={u.name}
                titleStyle={{
                  fontSize: 14,
                  color: colors.grey2,
                  marginBottom: 10
                }}
                subtitle={u.avatar}
                subtitleStyle={{ fontSize: 18 }}
                bottomDivider={i + 1 !== aaa.length}
                topDivider={i === 0}
              />
            );
          })}
        </Card>

        <View style={{ marginTop: 20 }}>
          {aaa.map(({ name }, index) => (
            <View key={index.toString()}>
              <ListItem
                title={"执行人反馈"}
                subtitle={"时间：111"}
                subtitleStyle={styles.subtitleStyle}
                topDivider
                leftAvatar={{
                  source: { uri: users[0]?.avatar }
                }}
                rightIcon={{
                  name: "edit",
                  type: "antdesign",
                  color: colors.primary,
                  onPress: () => navigation.navigate("FeedbackForm", { type: "update" })
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#FFF",
                  padding: 15,
                  paddingTop: 0
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      lineHeight: 25,
                      paddingTop: 0
                    }}
                  >
                    执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈,执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈执行人反馈
                  </Text>
                </View>
                {name === "地址" ? (
                  <Image
                    source={require("../assets/icon.png")}
                    style={{
                      marginLeft: 15,
                      width: width * 0.3,
                      height: width * 0.3,
                      borderRadius: 15
                    }}
                  />
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Button
          onPress={() => navigation.navigate("FeedbackForm")}
          title="填写反馈"
        />
      </View>
    </SafeAreaView>
  );
}
