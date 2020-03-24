import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import SafeAreaViewLoading from "../layouts/SafeAreaViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";
import { SearchBar, ListItem, colors } from "react-native-elements";

function RemoteSensingTaskList(props) {
  const { navigation, fetchChangespotList, remoteSensing, user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { remoteSensingList: list } = remoteSensing || {};
  const { userid } = user?.user;

  const fetchParams = {
    userid,
    pageNum,
    pageSize: 200,
    term: search
  };

  useEffect(() => {
    setLoading(true);
    fetchChangespotList(fetchParams).then(() => setLoading(false));
  }, [userid]);

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
    <SafeAreaViewLoading
      loading={loading}
      style={{ flex: 1, backgroundColor: colors.grey5 }}
    >
      <View style={{ flex: 1 }}>
        {/* <Text>{remoteSensing?.batchList?.data?.title}</Text> */}
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
    </SafeAreaViewLoading>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(RemoteSensingTaskList);
