import React, { useEffect, useState, Children } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  AsyncStorage,
  Text,
  Button,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import ViewLoading from "../layouts/ViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";
import { SearchBar, ListItem, colors } from "react-native-elements";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

function Home(props) {
  const { navigation, fetchChangespotList, remoteSensing, user } = props;
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
    term: search
  };

  /* useEffect(() => {
    setLoading(true);
    const btns = [{ text: "知道了", onPress: () => setLoading(false) }];
    fetchChangespotList(fetchParams).then(res => {
      if (res?.error) Alert.alert("警告", "服务器网络异常", btns);
      else setLoading(false);
    });
  }, [userid]); */

  const updateSearch = search => setSearch(search);

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
      leftAvatar={{
        title: item.qsxbhdl
      }}
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
        <SearchBar
          placeholder="查询..."
          lightTheme={true}
          onChangeText={updateSearch}
          value={search}
          onBlur={() => {
            setPageNum(1);
            fetchChangespotList(fetchParams);
          }}
        />

        <FlatList
          keyExtractor={({ spotid }) => spotid}
          data={list}
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
