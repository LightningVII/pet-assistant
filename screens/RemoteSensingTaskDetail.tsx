import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, ListItem, Button, colors } from "react-native-elements";
import { connect } from "react-redux";
import * as Actions from "../redux/remoteSensingActions.js";

const { width } = Dimensions.get("window");

const STATUS = ["接收任务", "任务下发", "执行", "关闭"];

const styles = {
  subtitleStyle: { color: colors.grey2, marginTop: 5 },
  image: {},
  name: {},
};

const Item = (props) => (
  <ListItem
    titleStyle={{
      fontSize: 14,
      color: colors.grey2,
      marginBottom: 10,
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
  const { navigation, route, fetchChangespotInfo, remoteSensing } = props;
  const { params } = route;
  const { tbbm } = params;
  const { remoteSensingInfo } = remoteSensing;
  const { spotImplements, changespot } = remoteSensingInfo || {};

  const {
    batch,
    county,
    state,
    location,
    area,
    qsx,
    hsx,
    qsxbhdl,
    hsxbhdl,
    qsxdlmc,
    hsxdlmc,
  } = changespot || {};

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchChangespotInfo({ tbbm });
    });
    fetchChangespotInfo({ tbbm });
    return unsubscribe;
  }, []);

  navigation.setOptions({
    headerTitle: batch,
    headerTitleContainerStyle: {
      width: 200,
    },
  });

  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = async () => {
    setRefreshing(true);
    await fetchChangespotInfo({ tbbm });
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.grey5 }}>
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        <Card
          containerStyle={{ borderWidth: 0, padding: 0, margin: 0 }}
          title={
            <ListItem
              title={county}
              subtitle={batch}
              subtitleStyle={styles.subtitleStyle}
              leftAvatar={<Text>{STATUS[state]}</Text>}
            />
          }
        >
          <Item title={"位置"} subtitle={location} topDivider />
          <Item title={"面积（亩）"} subtitle={area} />
          <Item title={"前时相"} subtitle={qsx} />
          <Item title={"后时相"} subtitle={hsx} />
          <Item title={"前时相地类名称"} subtitle={qsxbhdl} />
          <Item title={"后时相地类名称"} subtitle={hsxbhdl} />
          <Item title={"前时相变化地类"} subtitle={qsxdlmc} />
          <Item title={"后时相变化地类"} subtitle={hsxdlmc} />
        </Card>

        <View style={{ marginTop: 20 }}>
          {spotImplements?.map((item) => {
            const {
              fjs,
              czry,
              czsj,
              czyj,
              remark,
              zxstate,
              implementid,
            } = item;
            const rightIcon = () => {
              if (zxstate !== 2) return null;

              return {
                name: "edit",
                type: "antdesign",
                color: colors.primary,
                onPress: () =>
                  navigation.navigate("FeedbackForm", {
                    type: "update",
                    tbbm,
                    ...item,
                  }),
              };
            };
            return (
              <View key={implementid}>
                <ListItem
                  title={czry}
                  subtitle={`时间：${czsj}`}
                  subtitleStyle={styles.subtitleStyle}
                  topDivider
                  leftAvatar={
                    <Text
                      style={{
                        color: [colors.grey0, colors.success, "red"][zxstate],
                      }}
                    >
                      {["未审批", "已通过", "未通过"][zxstate]}
                    </Text>
                  }
                  rightIcon={rightIcon()}
                />
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    padding: 15,
                    paddingTop: 0,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        lineHeight: 25,
                        paddingTop: 0,
                      }}
                    >
                      {czyj}
                    </Text>
                    <Text
                      style={{
                        lineHeight: 25,
                        paddingTop: 10,
                      }}
                    >
                      {remark}
                    </Text>
                  </View>
                  {fjs?.length ? (
                    <Image
                      source={{
                        uri: fjs[0],
                      }}
                      style={{
                        marginLeft: 15,
                        width: width * 0.3,
                        height: width * 0.3,
                        borderRadius: 15,
                      }}
                    />
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {!spotImplements?.length ? (
        <View style={{ padding: 10 }}>
          <Button
            onPress={() => navigation.navigate("FeedbackForm", { tbbm })}
            title="填写执行"
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
});
