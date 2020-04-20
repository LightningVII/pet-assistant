import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { Button, ButtonGroup, colors } from "react-native-elements";
import { WebView } from "react-native-webview";

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, user-scalable=no, width=device-width"
    />
    <style>
      html,
      body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      #container {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script src="https://webapi.amap.com/maps?v=1.4.15&key=c5125441ee763f7ebcc1055f34ebbf14"></script>
    <script type="text/javascript">
      var map = new AMap.Map("container");
      var noRunGroups = new AMap.OverlayGroup();
      var runGroups = new AMap.OverlayGroup();
      var overGroups = new AMap.OverlayGroup();

      window.map = map;
      window.noRunGroups = noRunGroups;
      window.runGroups = runGroups;
      window.overGroups = overGroups;
      map.add([noRunGroups, runGroups, overGroups]);
    </script>
  </body>
</html>
`;

const path1 = [
  [
    [116.368904, 39.913423],
    [116.387271, 39.912501],
    [116.398258, 39.9046],
    [116.382122, 39.901176],
    [116.368904, 39.913423],
  ],
];

const path2 = [
  [
    [116.368908, 39.913427],
    [116.387277, 39.912508],
    [116.398257, 39.9047],
    [116.382122, 39.901176],
    [116.368904, 39.913423],
  ],
];

const path3 = [
  [
    [116.368906, 39.913426],
    [116.387271, 39.912501],
    [116.398255, 39.9047],
    [116.382125, 39.901174],
    [116.368903, 39.913426],
  ],
];

const common = {
  strokeWeight: 1,
  fillOpacity: 0.5,
};

const a = JSON.stringify({
  path: path1[0],
  fillColor: "#7cb342",
  strokeColor: "#7cb342",
  ...common,
});

const b = JSON.stringify({
  path: path2[0],
  fillColor: "#1e88e5",
  strokeColor: "#1e88e5",
  ...common,
});

const c = JSON.stringify({
  path: path3[0],
  fillColor: "#757575",
  strokeColor: "#757575",
  ...common,
});

const script = `
var postMessage = window.ReactNativeWebView.postMessage
noRunGroups.clearOverlays()
runGroups.clearOverlays()
overGroups.clearOverlays()

var polyline1 = new AMap.Polygon(${a});
var polyline2 = new AMap.Polygon(${b});
var polyline3 = new AMap.Polygon(${c});

var handleClick = (params) => (e) => {
  postMessage(JSON.stringify(params));
}

polyline1.on("click", handleClick({ aa: 11 }));
polyline2.on("click", handleClick({ aa: 11 }));
polyline3.on("click", handleClick({ aa: 11 }));

noRunGroups.addOverlays([polyline1]);
runGroups.addOverlays([polyline2]);
overGroups.addOverlays([polyline3]);

map.setFitView();
`;

const btnsText = (
  text?: string,
  bgColor?: string,
  textColor?: string
) => () => (
  <View
    style={{
      backgroundColor: bgColor,
      width: "100%",
      height: "100%",
      justifyContent: "center",
    }}
  >
    <Text style={{ textAlign: "center", color: textColor }}>{text}</Text>
  </View>
);

const injectScript = (indexes) =>
  `${indexes.includes(0) ? "noRunGroups.show();" : "noRunGroups.hide();"}
  ${indexes.includes(1) ? "runGroups.show();" : "runGroups.hide();"}
  ${indexes.includes(2) ? "overGroups.show();" : "overGroups.hide();"}`;

const TasksMap = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([0, 1, 2]);
  const webEle = useRef(null);

  const btnStatus = (index, text, color) =>
    selectedIndexes.includes(index)
      ? [text, color, "white"]
      : [text, "#DFDFDF", "#9F9F9F"];

  const btnEle = (index, text, color) => ({
    element: btnsText(...btnStatus(index, text, color)),
  });

  const buttons = [
    btnEle(0, "未执行", "#7cb342"),
    btnEle(1, "执行", "#1e88e5"),
    btnEle(2, "完结", "#757575"),
  ];

  /* useEffect(() => {
    // webEle.current.injectJavaScript(script);
    console.log("script :", script);
  }, [selectedIndexes]); */

  return (
    <View style={{ flex: 1, backgroundColor: colors.grey5 }}>
      <ButtonGroup
        selectMultiple
        onPress={(indexes: any) => {
          webEle.current.injectJavaScript(injectScript(indexes));
          setSelectedIndexes(indexes);
        }}
        selectedIndexes={selectedIndexes}
        buttons={buttons}
        containerStyle={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          right: 0,
          left: 0,
        }}
      />
      <WebView
        originWhitelist={["*"]}
        allowFileAccess={true}
        onMessage={(event) => {
          console.log(
            "event.nativeEvent :",
            JSON.parse(event.nativeEvent.data).aa
          );
        }}
        source={{
          html,
        }}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        injectedJavaScript={script}
        ref={webEle}
      />
    </View>
  );
};

export default TasksMap;
