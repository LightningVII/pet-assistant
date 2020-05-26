import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Overlay } from "react-native-elements";

const ViewLoading = ({ children, loading = false, ...other }) => (
  <View style={{ flex: 1, backgroundColor: "#FFF" }} {...other}>
    <Overlay
      height={"auto"}
      width={"auto"}
      overlayBackgroundColor={"transparent"}
      overlayStyle={{ elevation: 0 }}
      isVisible={loading}
    >
      <View>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>加载中...</Text>
      </View>
    </Overlay>
    {children}
  </View>
);

export default ViewLoading;
