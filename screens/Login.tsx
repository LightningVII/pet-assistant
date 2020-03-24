import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage
} from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import * as Actions from "../redux/userActions.js";

const image = require("../assets/icon.png");

export default connect(
  () => ({}),
  Actions
)(function(props) {
  const { fetchLogin } = props;
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const inputProps = {
    inputContainerStyle: styles.inputStyle,
    containerStyle: styles.inputContainer,
    leftIconContainerStyle: styles.inputLeftIconContainer
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#80cbc4", "#4db6ac", "#00897b"]}
        start={[0.5, 0.2]}
        end={[0.5, 1]}
        style={styles.titleContainer}
      >
        <Text style={styles.title}>桂林执法系统平台</Text>
      </LinearGradient>

      <View style={[styles.container, styles.content]}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={image} />
        </View>

        <View style={styles.wrap}>
          <Input
            {...inputProps}
            placeholder={"请输入用户名"}
            leftIcon={{
              size: 20,
              type: "feather",
              name: "user",
              color: "#f2f2f2"
            }}
            value={username}
            onChangeText={v => setUsername(v)}
            textContentType={"username"}
          />
          <Input
            {...inputProps}
            textContentType={"password"}
            secureTextEntry
            placeholder={"请输入密码"}
            leftIcon={{
              size: 20,
              type: "feather",
              name: "lock",
              color: "#f2f2f2"
            }}
            value={password}
            onChangeText={p => setPassword(p)}
          />

          <Button
            title={"登 录"}
            buttonStyle={styles.buttonStyle}
            linearGradientProps={{
              colors: ["#80cbc4", "#4db6ac"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 }
            }}
            loading={loading}
            onPress={async () => {
              setLoading(true);
              const { payload } = await fetchLogin({
                username,
                password
              });

              if (!payload?.userid) {
                setLoading(false);
                Alert.alert(payload);
                return;
              }

              await AsyncStorage.setItem("userid", payload?.userid);

              setLoading(false);
              props.navigation.canGoBack()
                ? props.navigation.goBack()
                : props.navigation.navigate("RemoteSensingTaskList");
            }}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  wrap: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 4,
    alignItems: "center"
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderStyle: "solid",
    borderColor: "#b2dfdb",
    marginTop: 60,
    marginBottom: 40,
    height: 120,
    width: 120,
    borderWidth: 8,
    borderRadius: 60
  },
  icon: {
    width: 60,
    height: 60
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 28,
    color: "#FFF"
  },
  buttonStyle: {
    height: 50,
    borderRadius: 25,
    width: 160,
    margin: 40
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "33%"
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#f2f2f2",
    marginTop: 20
  },
  inputStyle: {
    borderBottomWidth: 0,
    marginTop: 4,
    marginBottom: 4
  },
  inputLeftIconContainer: { marginLeft: 2, marginRight: 6 }
});
