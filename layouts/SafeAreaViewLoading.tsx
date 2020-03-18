import React from "react";
import { SafeAreaView, View, ActivityIndicator, Text } from "react-native";
import { Overlay } from "react-native-elements";

const SafeAreaViewLoading = ({ children, loading = false, ...other }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }} {...other}>
    <Overlay
      height={"auto"}
      width={"auto"}
      overlayBackgroundColor={"transparent"}
      isVisible={loading}
    >
      <View>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>加载中...</Text>
      </View>
    </Overlay>
    {children}
  </SafeAreaView>
);

export default SafeAreaViewLoading;
