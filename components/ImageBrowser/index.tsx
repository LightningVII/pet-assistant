import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { ScreenOrientation } from "expo";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import ImageTile from "./ImageTile";

const { width } = Dimensions.get("window");
const length = width / 4;

function ImageBrowser(props) {
  const { callback, onChange, max, loadCount, selected: picSelected } = props;
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState();
  const [numColumns, setNumColumns] = useState();
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(picSelected);
  const [isEmpty, setIsEmpty] = useState();
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(true);

  const getPermissionsAsync = async () => {
    const { status: camera } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: cameraRoll } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    setHasCameraPermission(camera === "granted");
    setHasCameraRollPermission(cameraRoll === "granted");
  };

  const getNumColumns = orientation =>
    orientation.indexOf("PORTRAIT") !== -1 ? 4 : 7;

  const onOrientationChange = ({ orientationInfo }) => {
    ScreenOrientation.removeOrientationChangeListeners();
    ScreenOrientation.addOrientationChangeListener(onOrientationChange);
    setNumColumns(getNumColumns(orientationInfo.orientation));
  };

  const findPhoto = item => photos.find(({ id }) => id === item.id);
  const prepareCallback = newSelected => {
    const selectedPhotos = newSelected.map(findPhoto);
    const assetsInfo = Promise.all(
      selectedPhotos.map(i => MediaLibrary.getAssetInfoAsync(i))
    );
    callback(assetsInfo);
  };

  const selectImage = item => {
    const { id } = item;
    let newSelected = Array.from(selected);
    const newSelectedIdsIndex = newSelected.map(({ id }) => id).indexOf(id);
    if (newSelectedIdsIndex === -1) newSelected.push(item);
    else newSelected.splice(newSelectedIdsIndex, 1);

    if (newSelected.length > max) return;
    if (!newSelected) newSelected = [];
    setSelected(newSelected);
    onChange(newSelected.length, () => prepareCallback(newSelected));
  };

  const processPhotos = data => {
    if (data.totalCount) {
      if (after === data.endCursor) return;
      const uris = data.assets;
      setPhotos([...photos, ...uris]);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    } else {
      setIsEmpty(true);
    }
  };

  const getPhotos = () => {
    const params: {
      first: any;
      assetType: any;
      sortBy: any;
      after?: any;
    } = {
      first: loadCount || 50,
      assetType: "Photos",
      sortBy: ["creationTime"]
    };
    if (after) params.after = after;
    if (!hasNextPage) return;
    MediaLibrary.getAssetsAsync(params).then(processPhotos);
  };

  useEffect(() => {
    (async function() {
      await getPermissionsAsync();
      ScreenOrientation.addOrientationChangeListener(onOrientationChange);
      const orientation = await ScreenOrientation.getOrientationAsync();
      setNumColumns(getNumColumns(orientation.orientation));
      getPhotos();
    })();
  }, []);

  const ListEmptyComponent = isEmpty ? (
    <Text style={{ marginTop: 40, textAlign: "center" }}>空相册 =(</Text>
  ) : (
    <ActivityIndicator style={{ marginTop: 40 }} size="large" />
  );
  const getItemLayout = (data, index) => ({
    length,
    offset: length * index,
    index
  });
  const renderImageTile = ({ item, index }) => {
    const itemNumber = selected.map(({ id }) => id).indexOf(item.id);
    return (
      <ImageTile
        selectedItemNumber={itemNumber + 1}
        item={item}
        index={index}
        selected={itemNumber !== -1}
        selectImage={selectImage}
      />
    );
  };

  if (!hasCameraPermission || !hasCameraRollPermission)
    return (
      <Text style={{ marginTop: 40, textAlign: "center" }}>没有访问权限</Text>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={numColumns}
        numColumns={numColumns}
        data={photos}
        renderItem={renderImageTile}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => getPhotos()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        initialNumToRender={48}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export default ImageBrowser;
