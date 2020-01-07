import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Text, TextInput, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { WingBlank, WhiteSpace, Button, Provider, Toast, InputItem, Icon } from '@ant-design/react-native';
import { LinearGradient } from 'expo-linear-gradient';

const image = require('./assets/wallhaven-358106-1.jpg');
const bg = require('./assets/timg.jpeg')
const UselessTextInputMultiline = ({ type = null, value, setValue, icon, placeholder = "有标签" }) => {
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderRadius: 4,
      }}>
      <InputItem
        last
        clear
        value={value}
        onChange={val => setValue(val)}
        placeholder={placeholder}
        labelNumber={2}
        type={type}
      >
        <Icon name={icon} size="md" color="#CCC" />
      </InputItem>
    </View>
  );
}

export default function () {
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    Font.loadAsync({
      'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
      'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf')
    }).then(() => setIsReady(true))
  }, [])

  if (!isReady) return null
  return (
    <Provider>
      <ImageBackground
        style={styles.container} source={bg} >

        <View style={{ alignItems: 'center' }}>
          <Image style={styles.icon} source={image} />
        </View>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <LinearGradient
          colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.6)']}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            padding: 20,
            margin: 20,
            borderRadius: 4,
          }}
        >
          <UselessTextInputMultiline value={username} setValue={setUsername} placeholder='请输入用户名' icon="user" />
          <WhiteSpace size="lg" />
          <UselessTextInputMultiline type={'password'} value={password} setValue={setPassword} placeholder='请输入密码' icon="lock" />
          <WhiteSpace size="lg" />
          <Button type="primary" onPress={() => Toast.info('login success')}>
            登陆
        </Button>
        </LinearGradient>

      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 20,
  }
});
