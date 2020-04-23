import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { connect } from "react-redux";
import ViewLoading from "../layouts/ViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";
import { ListItem, colors } from "react-native-elements";
import moment from "moment";

const tabReducer = {
  TasksClosed: "tasksClosedList",
  TasksOngoing: "tasksOngoingList",
  RemoteSensingTaskList: "tasksList",
};

const icons = {
  TasksClosed: {
    type: "feather",
    name: "x-circle",
    color: "#e53935",
  },
  TasksOngoing: {
    type: "feather",
    name: "check-circle",
    color: "#43a047",
  },
};

function RemoteSensingTaskList(props) {
  const { navigation, route, fetchChangespotList, remoteSensing, user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { userid } = user?.user || {};

  const fetchParams = {
    userid,
    pageNum,
    pageSize: 200,
    term: search,
    tabPage: route.name,
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = navigation.addListener("focus", () => {
      fetchChangespotList(fetchParams);
    });
    
    const btns = [{ text: "知道了", onPress: () => setLoading(false) }];
    fetchChangespotList(fetchParams).then((res) => {
      if (res?.error) Alert.alert("警告", "服务器网络异常", btns);
      else setLoading(false);
    });
    return unsubscribe;
  }, [userid]);

  const _onRefresh = () => {
    setRefreshing(true);
    // setPageNum(pageNum + 1);
    fetchChangespotList(fetchParams).then(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => navigation.navigate("RemoteSensingTaskDetail", item)}
      title={`${item.BATCH} + ${item.HSXDLMC}`}
      subtitle={moment(item.ZXSJ).format("MM-DD HH:mm")}
      leftIcon={icons[route.name]}
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
          keyExtractor={({ ROW_ID }) => ROW_ID}
          data={remoteSensing?.[tabReducer?.[route.name]]}
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
)(RemoteSensingTaskList);
