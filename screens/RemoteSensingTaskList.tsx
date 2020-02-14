import React, { useEffect, useState } from 'react';
import { Button, Text, View, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import * as Actions from '../redux/remoteSensingActions.js'
import { SearchBar, ListItem, colors } from 'react-native-elements'

const list = [
  {
    name: '2020年第2期',
    subtitle: 'Vice Chairman'
  },
  {
    name: '2020年第3期',
    subtitle: 'Vice President'
  },
  {
    name: '2020年第2期',
    subtitle: 'Vice Chairman'
  },
  {
    name: '2020年第3期',
    subtitle: 'Vice President'
  },
  {
    name: '2020年第2期',
    subtitle: 'Vice Chairman'
  }
]


function RemoteSensingTaskList(props) {
  const { navigation, fetchTodos, remoteSensing } = props
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchTodos({ aa: 1 })
  }, [])

  const updateSearch = search => setSearch(search);

  const _onRefresh = () => {
    setRefreshing(true)
    fetchTodos({ aa: 2 }).then(() => setRefreshing(false));
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => navigation.navigate('RemoteSensingTaskDetail', item)}
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{
        source: item.avatar_url && { uri: item.avatar_url },
        title: item.name[0]
      }}
      bottomDivider
      chevron
    />
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey5 }}>
      <View style={{ flex: 1 }}>
        {/* <Text>{remoteSensing?.batchList?.data?.title}</Text> */}
        <SearchBar
          placeholder="Type Here..."
          lightTheme={true}
          onChangeText={updateSearch}
          value={search}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
        />
        {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      </View>
    </SafeAreaView>
  );
}

export default connect(({ remoteSensing }) => ({ remoteSensing }), Actions)(RemoteSensingTaskList);
