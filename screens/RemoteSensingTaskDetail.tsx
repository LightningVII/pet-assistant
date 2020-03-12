import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import * as Actions from "../redux/remoteSensingActions.js";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const STATUS = ["接收任务", "任务下发", "执行", "关闭"];

const styles = {
  subtitleStyle: { color: colors.grey2, marginTop: 5 },
  image: {},
  name: {}
};

const Item = props => (
  <ListItem
    titleStyle={{
      fontSize: 14,
      color: colors.grey2,
      marginBottom: 10
    }}
    subtitleStyle={{ fontSize: 18 }}
    bottomDivider
    {...props}
  />
);

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(function RemoteSensingTaskDetail(props) {
  const {
    navigation,
    route,
    fetchChangespotImplementInfo,
    remoteSensing
  } = props;
  const { params } = route;

  useEffect(() => {
    fetchChangespotImplementInfo({ tbbm: params.tbbm });
  }, []);

  navigation.setOptions({
    headerTitle: params.batch,
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
              title={params.county}
              subtitle={params.batch}
              subtitleStyle={styles.subtitleStyle}
              leftAvatar={<Text>{STATUS[params.state]}</Text>}
            />
          }
        >
          <Item title={"位置"} subtitle={params.location} topDivider />
          <Item title={"面积（亩）"} subtitle={params.area} />
          <Item title={"前时相"} subtitle={params.qsx} />
          <Item title={"后时相"} subtitle={params.hsx} />
          <Item title={"前时相地类名称"} subtitle={params.qsxbhdl} />
          <Item title={"后时相地类名称"} subtitle={params.hsxbhdl} />
          <Item title={"前时相变化地类"} subtitle={params.qsxdlmc} />
          <Item title={"后时相变化地类"} subtitle={params.hsxdlmc} />
        </Card>

        <View style={{ marginTop: 20 }}>
          {remoteSensing?.feedbackList?.map((item, index) => {
            const { fjs, czry, czsj, czyj, remark, zxstate } = item;
            return (
              <View key={index.toString()}>
                <ListItem
                  title={czry}
                  subtitle={`时间：${czsj}`}
                  subtitleStyle={styles.subtitleStyle}
                  topDivider
                  leftAvatar={
                    zxstate ? (
                      // <AntDesign name={"right"} color={"green"} size={20} />
                      <Text>已审批</Text>
                    ) : (
                      // <AntDesign name={"close"} color={"red"} size={20} />
                      <Text>未审批</Text>
                    )
                  }
                  /* rightIcon={{
                    name: "edit",
                    type: "antdesign",
                    color: colors.primary,
                    onPress: () =>
                      navigation.navigate("FeedbackForm", {
                        type: "update",
                        tbbm: params.tbbm,
                        ...item
                      })
                  }} */
                />
                {/* zxstate */}
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
                      {czyj}
                    </Text>
                    <Text
                      style={{
                        lineHeight: 25,
                        paddingTop: 0
                      }}
                    >
                      {remark}
                    </Text>
                  </View>
                  {fjs?.length ? (
                    <Image
                      source={{
                        uri: fjs[0]
                      }}
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
            );
          })}
        </View>
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Button
          onPress={() =>
            navigation.navigate("FeedbackForm", { tbbm: params.tbbm })
          }
          title="填写执行"
        />
      </View>
    </SafeAreaView>
  );
});
