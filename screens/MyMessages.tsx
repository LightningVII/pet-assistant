import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Text, Platform } from "react-native";
import { connect } from "react-redux";
import ViewLoading from "../layouts/ViewLoading";
import * as Actions from "../redux/messageActions.js";
import {
  Header,
  Overlay,
  ListItem,
  colors,
  Badge,
} from "react-native-elements";
import moment from "moment";

function MyMessages(props) {
  const { messages, fetchMessageList, fetchMessageRead } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { list } = messages || {};

  const fetchParams = {
    pageNum,
    pageSize: 200,
  };

  /* useEffect(() => {
    setLoading(true);
    const btns = [{ text: "知道了", onPress: () => setLoading(false) }];
    fetchMessageList(fetchParams).then((res) => {
      if (res?.error) Alert.alert("警告", "服务器网络异常", btns);
      else setLoading(false);
    });
  }, [userid]); */

  const _onRefresh = () => {
    setRefreshing(true);
    // setPageNum(pageNum + 1);
    fetchMessageList(fetchParams).then(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        fetchMessageRead(item.xxid).then(() => fetchMessageList(fetchParams));
        setTitle(item.fsrxm);
        setContent(item.xxinfo);
        setOverlayStatus(true);
      }}
      title={item.fsrxm}
      subtitle={
        <Text numberOfLines={1} ellipsizeMode={"tail"}>
          {item.xxinfo}
        </Text>
      }
      leftElement={
        item.xxzt === 1 ? <Badge value="未读" status="error" /> : null
      }
      rightElement={<Text>{moment(item.fssj).format("MM-DD hh:mm")}</Text>}
      bottomDivider
    />
  );

  return (
    <ViewLoading
      loading={loading}
      style={{ flex: 1, backgroundColor: colors.grey5 }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={({ xxid }) => xxid}
          data={list} // list
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
      </View>
      <Overlay
        fullScreen
        isVisible={overlayStatus}
        overlayStyle={{ padding: 0 }}
        // onBackdropPress={() => setOverlayStatus(false)}
      >
        <View>
          <Header
            rightComponent={{
              icon: "close",
              color: "black",
              onPress: () => {
                setTitle("");
                setContent("");
                setOverlayStatus(false);
              },
            }}
            centerComponent={{ text: title }}
            containerStyle={{
              backgroundColor: "white",
              justifyContent: "space-around",
              marginTop: Platform.OS === "ios" ? 0 : -22,
            }}
          />
          {/* <Button title={'asd'} onPress={() => setOverlayStatus(false)} /> */}
          <Text style={{ padding: 20 }}>{content}</Text>
        </View>
      </Overlay>
    </ViewLoading>
  );
}

export default connect(
  ({ message }) => ({ messages: message.messages }),
  Actions
)(MyMessages);
