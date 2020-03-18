import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import * as Actions from "../redux/remoteSensingActions.js";
import { SearchBar, ListItem, colors } from "react-native-elements";


function RemoteSensingTaskList(props) {
  const { navigation, fetchChangespotList, remoteSensing, user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const { remoteSensingList: list } = remoteSensing || {};

  useEffect(() => {
    fetchChangespotList({
      userid: user?.user?.userid,
      pageNum,
      pageSize: 200,
      term: search
    });
  }, []);

  const updateSearch = search => setSearch(search);

  const _onRefresh = () => {
    setRefreshing(true);
    // setPageNum(pageNum + 1);
    fetchChangespotList({
      userid: user?.user?.userid,
      pageNum: pageNum,
      pageSize: 200,
      term: search
    }).then(() => setRefreshing(false));
  };

  const keyExtractor = (item, index) => index.toString();

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey5 }}>
      <View style={{ flex: 1 }}>
        {/* <Text>{remoteSensing?.batchList?.data?.title}</Text> */}
        <SearchBar
          placeholder="查询..."
          lightTheme={true}
          onChangeText={updateSearch}
          value={search}
          onBlur={() => {
            setPageNum(1);
            fetchChangespotList({
              userid: user?.user?.userid,
              pageNum: 1,
              pageSize: 200,
              term: search
            });
          }}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
        {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      </View>
    </SafeAreaView>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(RemoteSensingTaskList);
