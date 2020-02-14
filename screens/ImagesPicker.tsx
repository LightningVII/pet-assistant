import * as React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Button, colors } from "react-native-elements";
import ImageBrowser from "../components/ImageBrowser";
import { AntDesign } from "@expo/vector-icons";

const DoneBtn = ({
  title,
  disabled,
  onPress
}: {
  title: any;
  disabled?: any;
  onPress?: any;
}) => (
  <Button
    buttonStyle={{ paddingTop: 6, paddingBottom: 6, marginRight: 20 }}
    titleStyle={{ fontSize: 14 }}
    disabled={disabled}
    onPress={onPress}
    title={title}
  />
);

function ImagesPicker(props) {
  const { navigation, route } = props;
  const max = route?.params?.max || 9;
  const selected = route?.params?.selected || [];
  navigation.setOptions({
    headerTitle: "",
    headerRight: () => (
      <DoneBtn
        disabled
        title={`完成${
          selected.length > 0 ? `(${selected.length}/${max})` : ""
        }`}
      />
    ),
    headerLeft: props => (
      <AntDesign
        onPress={() => navigation.goBack()}
        name={"close"}
        size={20}
        style={{ marginLeft: 20 }}
      />
    )
  });

  const imagesCallback = callback => {
    callback
      .then(photos => {
        route?.params?.callback({ photos });
        navigation.goBack();
      })
      .catch(e => console.log(e));
  };

  const updateHandler = (count, onSubmit) =>
    navigation.setOptions({
      headerRight: () => (
        <DoneBtn
          title={`完成${count > 0 ? `(${count}/${max})` : ""}`}
          onPress={onSubmit}
        />
      )
    });

  return (
    <SafeAreaView
      style={{ flex: 1, position: "relative", backgroundColor: colors.grey5 }}
    >
      <ImageBrowser
        max={max}
        selected={selected}
        onChange={updateHandler}
        callback={imagesCallback}
      />
    </SafeAreaView>
  );
}

export default ImagesPicker;
