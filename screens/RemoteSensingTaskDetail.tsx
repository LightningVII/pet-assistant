import React from 'react';
import { Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { View, Text, Image, SafeAreaView } from 'react-native'
import { Card, ListItem, Button, Icon, colors } from 'react-native-elements'

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
]

const aaa = [
  {
    name: '县区',
    avatar: '沛县'
  },
  {
    name: '地址',
    avatar: '沛城镇'
  },

  {
    name: '变动前',
    avatar: '建筑用地（无定着物）'
  },
  {
    name: '变动后',
    avatar: '建筑用地（有定着物）'
  },
  {
    name: '变更面积',
    avatar: '9181.7平方米'
  }]








const styles = { user: {}, image: {}, name: {} }

export default function RemoteSensingTaskDetail(props) {
  const { navigation, route } = props
  const { params } = route
  // { navigation }
  navigation.setOptions({
    headerTitle: params.name,
    headerTitleContainerStyle: {
      width: 200
    }
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <View style={{ flex: 1 }}> */}
        <View style={{ flex: 1, backgroundColor: colors.grey5 }}>
          <Card
            containerStyle={{ borderWidth: 0, padding: 0 }}
            title={<ListItem
              title={"分配人"}
              subtitle={"时间：111"}
              leftAvatar={{
                source: { uri: users[0]?.avatar },
              }}
            />}
          >
            {
              aaa.map((u, i) => {
                return (
                  <ListItem
                    key={i}
                    title={u.name}
                    titleStyle={{ fontSize: 12, color: 'grey' }}
                    subtitle={u.avatar}
                    subtitleStyle={{ fontSize: 18 }}
                    bottomDivider={i + 1 !== aaa.length}
                    topDivider={i === 0}
                  />
                );
              })
            }
          </Card>
        </View>

        <View style={{ padding: 10 }}>
          <Button onPress={() => navigation.navigate('FeedbackForm')} title="填写反馈" />
        </View>
      {/* </View> */}
    </SafeAreaView>
  );
}