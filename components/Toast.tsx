import React from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Tooltip } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const toast = (ref, defaultText = "", time = 1000) => ({ text }) => (
  <Tooltip
    ref={ref}
    popover={<Text style={styles.text}>{text || defaultText}</Text>}
    withPointer={false}
    withOverlay={false}
    backgroundColor={"rgba(0,0,0,0.6)"}
    onOpen={() => setTimeout(() => ref.current.toggleTooltip(), time)}
    containerStyle={{
      top: (height - (ref?.current?.props?.height || 40)) / 2,
      left: (width - (ref?.current?.props?.width || 150)) / 2
    }}
  />
);

const styles = StyleSheet.create({
  text: { color: "white" }
});

export default toast;
