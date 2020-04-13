import React, { useEffect, useState, Children } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  AsyncStorage,
  Text,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import ViewLoading from "../layouts/ViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";
import { Button, ListItem, colors } from "react-native-elements";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

const { width } = Dimensions.get("window");

function Home(props) {
  const { navigation, route, fetchChangespotList, remoteSensing, user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { remoteSensingList: list } = remoteSensing || {};
  const { userid } = user?.user || {};

  const fetchParams = {
    userid,
    pageNum,
    pageSize: 200,
    term: search,
  };

  /* useEffect(() => {
    setLoading(true);
    const btns = [{ text: "知道了", onPress: () => setLoading(false) }];
    fetchChangespotList(fetchParams).then(res => {
      if (res?.error) Alert.alert("警告", "服务器网络异常", btns);
      else setLoading(false);
    });
  }, [userid]); */

  console.log("route :", route.name);

  const _onRefresh = () => {
    setRefreshing(true);
    // setPageNum(pageNum + 1);
    fetchChangespotList(fetchParams).then(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => navigation.navigate("RemoteSensingTaskDetail", item)}
      title={item.county}
      subtitle={item.location}
      leftIcon={{
        type: "feather",
        name: "x-circle",
        color: "#e53935",
      }}
      /* {
        type: "feather",
        name: "check-circle",
        color: "#43a047"
      } */
      /* rightAvatar={
        <Button
          onPress={() => navigation.navigate("RemoteSensingTaskDetail", item)}
          title="查看"
          titleStyle={{ fontSize: 12 }}
        />
      } */
      bottomDivider
      chevron
    />
  );

  return (
    <ViewLoading
      loading={loading}
      style={{ flex: 1, backgroundColor: colors.grey5 }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={({ spotid }) => spotid}
          data={[
            {
              county: "徐州",
              location: moment().format("MM-DD hh:mm"),
              spotid: "aa",
              qsxbhdl: "絮絮",
            },
          ]} // list
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
      </View>
    </ViewLoading>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(Home);
