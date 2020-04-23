import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import * as Actions from "../redux/mapActions.js";
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

const common = {
  strokeWeight: 1,
  fillOpacity: 0.5,
};

const script = (p1, p2, p3) => `
var postMessage = window.ReactNativeWebView.postMessage
noRunGroups.clearOverlays()
runGroups.clearOverlays()
overGroups.clearOverlays()

var handleClick = (params) => (e) => {
  postMessage(JSON.stringify(params));
}
var p = [[], [], []];
var aaaa = (item, icon, paths) => {
  var polyline = new AMap.Polygon(item);
  var marker = new AMap.Marker({
    icon,
    position: [item.path[0].R, item.path[0].Q],
  });
  marker.on("click", handleClick({ aa: 11 }));
  polyline.on("click", handleClick({ aa: 11 }));
  paths.push(polyline);
  paths.push(marker);
};

${p1}.forEach((item) => {
  aaaa(item, "https://tva1.sinaimg.cn/large/007S8ZIlgy1ge43ai701kj300j00v741.jpg", p[0])
});

${p2}.forEach((item) => {
  aaaa(item, "https://tva1.sinaimg.cn/large/007S8ZIlgy1ge43g6i2esj300j00v741.jpg", p[1])
});

${p3}.forEach((item) => {
  aaaa(item, "https://tva1.sinaimg.cn/large/007S8ZIlgy1ge43m0n0r1j300j00v741.jpg", p[2])
});

noRunGroups.addOverlays(p[0]);
runGroups.addOverlays(p[1]);
overGroups.addOverlays(p[2]);
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
  ${
    indexes.includes(2) ? "overGroups.show();" : "overGroups.hide();"
  }map.setFitView();`;

const TasksMap = ({ fetchTBXX, fetchTBZB, map }) => {
  const [isReady, setIsReady] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 1, 2]);
  const webEle = useRef(null);
  const { tbzb, tbxx } = map;

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

  useEffect(() => {
    (async function () {
      fetchTBXX();
      const { payload } = await fetchTBZB();
      setIsReady(true);
    })();
  }, []);

  const path1 = JSON.stringify(
    tbzb.wzxList
      .map((item) => JSON.parse(item.GEOMETRY).coordinates[0])
      .map((path) => ({
        path,
        fillColor: "#7cb342",
        strokeColor: "#7cb342",
        ...common,
      }))
  );

  const path2 = JSON.stringify(
    tbzb.zxList
      .map((item) => JSON.parse(item.GEOMETRY).coordinates[0])
      .map((path) => ({
        path,
        fillColor: "#1e88e5",
        strokeColor: "#1e88e5",
        ...common,
      }))
  );

  const path3 = JSON.stringify(
    tbzb.ywcList
      .map((item) => JSON.parse(item.GEOMETRY).coordinates[0])
      .map((path) => ({
        path,
        fillColor: "#757575",
        strokeColor: "#757575",
        ...common,
      }))
  );

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
      {isReady ? (
        <WebView
          originWhitelist={["*"]}
          allowFileAccess={true}
          onMessage={(event) => {
            console.log(
              "event.nativeEvent :",
              JSON.parse(event.nativeEvent.data).aa
            );
          }}
          source={{ html }}
          domStorageEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          injectedJavaScript={script(path1, path2, path3)}
          ref={webEle}
        />
      ) : null}
    </View>
  );
};

export default connect(({ map }) => ({ map }), Actions)(TasksMap);
