import * as React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button, colors } from 'react-native-elements';
import ImageBrowser from '../components/ImageBrowser'
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  emptyStay: {
    textAlign: 'center',
  },
});

function ImagesPicker(props) {
  const { navigation } = props;
  navigation.setOptions({
    headerTitle: "",
    headerRight: () => <Button buttonStyle={{ paddingTop: 6, paddingBottom: 6, marginRight: 20 }} titleStyle={{ fontSize: 14 }} disabled title={"完成"} />,
    headerLeft: props => <AntDesign onPress={() => navigation.goBack()} name={'close'} size={20} style={{ marginLeft: 20 }} />,
  })

  const imagesCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos);
    }).catch((e) => console.log(e))
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      headerRight: () => <Button buttonStyle={{ paddingTop: 6, paddingBottom: 6, marginRight: 20 }} titleStyle={{ fontSize: 14 }} disabled={!count} title={`完成${count > 0 ? `(${count + '/9'})` : ''}`} />,
    })
  };

  
  const noCameraPermissionComponent = <Text style={styles.emptyStay}>没有访问权限</Text>;

  return <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: colors.grey5 }}>
    <ImageBrowser
      max={9}
      onChange={updateHandler}
      callback={imagesCallback}
      noCameraPermissionComponent={noCameraPermissionComponent}
    />
  </SafeAreaView>
}

export default ImagesPicker
