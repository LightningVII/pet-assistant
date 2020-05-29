import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

const TabItem = ({
  children,
  text = "",
  size = null,
  handlePress,
  textStyle = {},
  itemStyle = {},
}) => (
  <TouchableWithoutFeedback onPress={handlePress}>
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        ...itemStyle,
      }}
    >
      {children}
      {text ? (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 14,
            marginTop: 8,
            ...textStyle,
          }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  </TouchableWithoutFeedback>
);

export default TabItem;
