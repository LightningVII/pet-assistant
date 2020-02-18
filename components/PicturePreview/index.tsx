import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Image,
  StyleSheet
} from "react-native";
import { Overlay } from "react-native-elements";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  image: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
});

function PicturePreview(props) {
  const { isVisible, source, handleBackdropPress } = props;
  return (
    <Overlay
      overlayBackgroundColor="rgba(0, 0, 0, .5)"
      fullScreen
      isVisible={isVisible}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={handleBackdropPress}
      >
        <Image resizeMode={"contain"} style={styles.image} source={source} />
      </TouchableWithoutFeedback>
    </Overlay>
  );
}

export default PicturePreview;
