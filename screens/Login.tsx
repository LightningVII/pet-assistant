import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import {
  WhiteSpace,
  Button,
  Toast,
  InputItem,
  Icon
} from "@ant-design/react-native";
import { colors } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import * as Actions from "../redux/userActions.js";

const image = require("../assets/icon.png");

const UselessTextInputMultiline = ({
  type = null,
  value,
  setValue,
  icon,
  placeholder = "有标签"
}) => {
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderRadius: 4
      }}
    >
      <InputItem
        last
        clear
        value={value}
        onChange={val => setValue(val)}
        placeholder={placeholder}
        labelNumber={2}
        type={type}
      >
        <Icon name={icon} size="md" color="#CCC" />
      </InputItem>
    </View>
  );
};

export default connect(
  () => ({}),
  Actions
)(function(props) {
  const { fetchLogin } = props;
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.icon} source={image} />
      </View>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />

      <View
        style={{
          padding: 20,
          margin: 20,
          borderRadius: 4
        }}
      >
        <UselessTextInputMultiline
          value={username}
          setValue={setUsername}
          placeholder="请输入用户名"
          icon="user"
        />
        <WhiteSpace size="lg" />
        <UselessTextInputMultiline
          type={"password"}
          value={password}
          setValue={setPassword}
          placeholder="请输入密码"
          icon="lock"
        />
        <WhiteSpace size="lg" />

        <Button
          style={{ borderColor: "#FFF" }}
          type="primary"
          onPress={async () => {
            const { payload } = await fetchLogin({
              username,
              password
            });
            await AsyncStorage.setItem("userid", payload?.content?.userid);
            Toast.info("login success");
            props.navigation.navigate("RemoteSensingTaskList");
          }}
        >
          登陆
        </Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 20
  }
});
