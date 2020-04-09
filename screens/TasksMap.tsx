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
import React from 'react';
import { WebView } from 'react-native-webview';

const html = { uri: 'file:///com.otitan.guilin/android/app/src/main/assets/index.html' }

// require('../assets/index.html');


export default class App extends React.Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={html}
        style={{ marginTop: 120 }}
      />
    );
  }
}