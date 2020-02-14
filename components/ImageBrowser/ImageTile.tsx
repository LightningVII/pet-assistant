import React from "react";
import {
  Dimensions,
  TouchableHighlight,
  View,
  ActivityIndicator
} from "react-native";
import { Badge, Image } from "react-native-elements";

const { width } = Dimensions.get("window");
function ImageTile(props) {
  const { item, index, selected, selectImage, selectedItemNumber } = props;
  if (!item) return null;
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => selectImage(index)}
    >
      <View style={{ position: "relative" }}>
        <View style={{ opacity: selected ? 0.5 : 1 }}>
          <Image
            style={{ width: width / 4, height: width / 4 }}
            source={{ uri: item.uri }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        {selected ? (
          <Badge
            value={selectedItemNumber}
            containerStyle={{ position: "absolute", top: 4, right: 4 }}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
}

export default ImageTile;
