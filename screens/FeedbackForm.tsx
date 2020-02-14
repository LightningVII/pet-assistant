import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Picker
} from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import {
  Input,
  CheckBox,
  ListItem,
  Image,
  colors
} from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

const styles = {
  checkBox: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#FFF",
    borderWidth: 0,
    borderRadius: 0
  },
  input: {
    marginBottom: 0,
    backgroundColor: "#FFF",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
};

function FeedbackForm(props) {
  const { navigation, route } = props;
  const [checked, setChecked] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [cameraImages, setCameraImages] = useState([]);
  const [language, setLanguage] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  navigation.setOptions({
    headerTitle: "请填写反馈报告"
  });

  const imagesPicker = () =>
    navigation.navigate("ImagesPicker", {
      callback: data =>
        setSelectedImages(
          data?.photos.map(p => ({
            id: p.id,
            filename: p.filename,
            localUri: p.localUri,
            mediaType: p.mediaType
          })) || []
        ),
      max: 9 - cameraImages.length,
      selected: selectedImages
    });
  const cancel = () => console.log("cancel :");
  const camera = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("需要访问相机胶卷的权限!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) return;
    console.log('pickerResult :', pickerResult);
    setCameraImages([...cameraImages, { localUri: pickerResult.uri }]);
  };

  const actions = [camera, imagesPicker, cancel];

  const showActionSheet = () => {
    const BUTTONS = ["拍照", "从相册选择", "取消"];
    showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: 2
      },
      buttonIndex => {
        console.log("object --------:", BUTTONS[buttonIndex]);
        actions[buttonIndex]();
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey5 }}>
      <Input
        containerStyle={styles.input}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        label={"填写反馈信息"}
        placeholder="备注"
        multiline
      />
      <CheckBox
        containerStyle={styles.checkBox}
        title={checked ? "违规" : "合法"}
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="check"
        checkedColor="red"
        uncheckedColor="green"
        checked={checked}
        onPress={() => setChecked(!checked)}
      />

      <ListItem
        title={"图片"}
        onPress={showActionSheet}
        rightIcon={<AntDesign name={"picture"} size={20} color={"#2089dc"} />}
        bottomDivider
      />
      <ListItem
        title={"附件"}
        onPress={() => {}}
        rightIcon={<AntDesign name={"paperclip"} size={20} color={"#2089dc"} />}
      />

      {selectedImages?.length || cameraImages?.length ? (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#FFF",
            marginTop: 20,
            flexWrap: "wrap"
          }}
        >
          {[...cameraImages, ...selectedImages].map(image => (
            <Image
              key={image.localUri}
              source={{ uri: image.localUri }}
              containerStyle={{
                marginRight: 4,
                width: 80,
                height: 80
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </View>
      ) : null}

      {/* <TextareaItem rows={4} placeholder="请填写内容" /> */}
      {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
    </SafeAreaView>
  );
}

export default FeedbackForm;
