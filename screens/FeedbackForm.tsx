import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  Button,
  Input,
  Overlay,
  ListItem,
  Image,
  colors
} from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import PicturePreview from "../components/PicturePreview";
import ViewLoading from "../layouts/ViewLoading";
import * as Actions from "../redux/remoteSensingActions.js";

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
  const {
    navigation,
    route,
    user,
    fetchChangespotImplement,
    fetchChangespotUpdateImplement,
    fetchChangespotUpload
  } = props;
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [cameraImages, setCameraImages] = useState([]);
  const [oriImages, setOriImages] = useState([]);
  const [content, setContent] = useState('');
  const [remark, setRemark] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [isVisible, setIsVisible] = useState(false);
  const [source, setSource] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const params = {
    tbbm: route?.params?.tbbm,
    czsj: moment(date).format("YYYY-MM-DD"),
    czry: user?.user?.userid,
    czyj: content,
    remark
  };

  useEffect(() => {
    const { fjs, czsj, czyj, remark, type } = route?.params;

    if (type === "update") {
      setOriImages(
        fjs?.map(localUri => {
          let tempArr = localUri.split(".");
          tempArr = tempArr[tempArr.length - 2].split("/");
          return {
            localUri,
            id: tempArr[tempArr.length - 1]
          };
        })
      );
      setContent(czyj);
      setRemark(remark);
      setDate(czsj);
    }
  }, []);

  navigation.setOptions({
    headerTitle: "请填写执行报告"
  });

  const imagesPicker = () =>
    navigation.navigate("ImagesPicker", {
      callback: data =>
        setSelectedImages(
          data?.photos.map(p => ({
            id: p.id,
            filename: p.filename,
            localUri: p.localUri,
            uri: p.uri,
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
      Alert.alert("需要访问相机胶卷的权限!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) return;
    console.log("pickerResult :", pickerResult);
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
        actions[buttonIndex]();
      }
    );
  };

  return (
    <ViewLoading loading={loading}>
      <View style={{ flex: 1, backgroundColor: colors.grey5 }}>
        <Input
          value={content}
          onChange={e => setContent(e?.nativeEvent?.text)}
          // ref={component => (this._textInput = component)}
          containerStyle={styles.input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          label={"填写执行信息"}
          // placeholder="填写执行信息"
          multiline
        />

        <Input
          value={remark}
          onChange={e => setRemark(e?.nativeEvent?.text)}
          containerStyle={styles.input}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          label={"备注"}
          multiline
        />

        <ListItem
          style={{ marginTop: 20, marginBottom: 20 }}
          title="执行日期"
          onPress={showActionSheet}
          rightIcon={
            <Button
              buttonStyle={{ paddingTop: 0, paddingBottom: 0 }}
              type="clear"
              onPress={() => setShow(true)}
              title={moment(date).format("YYYY-MM-DD")}
            />
          }
          bottomDivider
        />
        {/* <CheckBox
          containerStyle={styles.checkBox}
          title={isIllegal ? "违规" : "合法"}
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="check"
          checkedColor="red"
          uncheckedColor="green"
          checked={isIllegal}
          onPress={() => setIsIllegal(!isIllegal)}
        /> */}

        <ListItem
          title={"图片"}
          onPress={showActionSheet}
          rightIcon={<AntDesign name={"picture"} size={20} color={"#2089dc"} />}
          bottomDivider
        />
        {/* <ListItem
          title={"附件"}
          onPress={() => {}}
          rightIcon={
            <AntDesign name={"paperclip"} size={20} color={"#2089dc"} />
          }
        /> */}

        {selectedImages?.length || cameraImages?.length || oriImages?.length ? (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#FFF",
              marginTop: 20,
              flexWrap: "wrap"
            }}
          >
            {[...cameraImages, ...selectedImages, ...oriImages].map(image => (
              <TouchableWithoutFeedback
                key={image.id}
                onPress={() => {
                  setIsVisible(true);
                  setSource({ uri: image?.localUri });
                }}
              >
                <Image
                  key={image.localUri}
                  source={{ uri: image.localUri }}
                  containerStyle={{
                    marginRight: 4,
                    width: 80,
                    height: 80
                  }}
                  PlaceholderContent={
                    <ActivityIndicator size="large" color="#FFF" />
                  }
                />
              </TouchableWithoutFeedback>
            ))}
          </View>
        ) : null}
        <PicturePreview
          handleBackdropPress={() => setIsVisible(false)}
          isVisible={isVisible}
          source={source}
        />

        <Overlay
          isVisible={show}
          height="auto"
          onBackdropPress={() => setShow(false)}
        >
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode="date"
            is24Hour={true}
            locale="zh-CN"
            display="default"
            onChange={onChange}
          />
        </Overlay>
      </View>
      <View style={{ padding: 10 }}>
        <Button
          buttonStyle={{ backgroundColor: colors.warning }}
          onPress={async () => {
            setLoading(true);
            const imgs = [...cameraImages, ...selectedImages];
            let fj;
            if (imgs?.length) {
              try {
                fj = await fetchChangespotUpload(imgs);
              } catch ({ code, message }) {
                setLoading(false);
                Alert.alert("文件上传失败", `${code}-${message}`, [
                  { text: "知道了" }
                ]);
                return;
              }
            }

            if (route?.params?.type === "update") {
              await fetchChangespotUpdateImplement({
                ...params,
                fj: fj?.content,
                implementId: route?.params?.implementid
              });
            } else {
              await fetchChangespotImplement({
                ...params,
                fj: fj?.content
              });
            }

            setLoading(false);
            navigation.goBack();
          }}
          title="提交执行"
        />
      </View>
    </ViewLoading>
  );
}

export default connect(
  ({ remoteSensing, user }) => ({ remoteSensing, user }),
  Actions
)(FeedbackForm);
