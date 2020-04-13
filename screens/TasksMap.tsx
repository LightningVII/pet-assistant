/* import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} initialRegion={{
      latitude: 25.29,
      longitude: 110.28,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }} />
      </View>
    );
  }
}
	
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});


 */
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
const html = require("../assets/index.html");

const TasksMap = () => {
  const [uri, setUri] = useState("");

  useEffect(() => {
    (async function () {
      await Asset.loadAsync(html);
      setUri(Asset.fromModule(html).localUri);
    })();
  }, []);

  return (
    <WebView
      originWhitelist={["*"]}
      allowFileAccess={true}
      source={{ uri }}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
    />
  );
};

export default TasksMap;
