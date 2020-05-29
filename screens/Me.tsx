import React from "react";
import { Alert, StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Card, ListItem, Divider } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TabItem from "../components/TabItem";
import * as Actions from "../redux/userActions.js";

const items1 = [1, 2, 3, 4];
const items2 = [1, 2];
const items3 = [1, 2, 3, 4, 5, 6, 7, 8];

const create2DArray = (array) =>
  Array(Math.ceil(array.length / 4))
    .fill({})
    .map((_, index) => array.slice(index * 4, (index + 1) * 4));

const ImageItem = ({ handlePress = () => ({}) }) => (
  <TabItem
    handlePress={handlePress}
    text="我的任务"
    textStyle={{ color: "#333" }}
    itemStyle={{ width: "25%" }}
  >
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/static/checklist.png")}
    />
  </TabItem>
);

const ToolsCard = ({ headerTitle, tools }) => (
  <Card
    containerStyle={{
      borderRadius: 4,
      overflow: "hidden",
      borderWidth: 0,
      padding: 0,
      marginTop: 0,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    }}
    title={
      <ListItem
        leftElement={<Divider style={styles.cardTitleLeftEle} />}
        title={headerTitle}
      />
    }
  >
    {create2DArray(tools).map((item) => (
      <View style={styles.cardContent}>
        {item ? item.map(() => <ImageItem />) : null}
      </View>
    ))}
  </Card>
);

export default connect(
  () => ({}),
  Actions
)(function (props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f4511e", "#d84315"]}
        style={styles.titleContainer}
      >
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 15,
            width: "50%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderWidth: 3,
                borderColor: "white",
                borderRadius: 35,
              }}
              source={require("../assets/static/id-card.png")}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ textAlign: "center", fontSize: 16, color: "white" }}
              >
                {"用户名"}
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "white" }}
              >{`asd`}</Text>
            </View>
          </View>

          {/* <FontAwesome
            name={"power-off"}
            size={20}
            style={{ marginRight: 20, color: "white" }}
          /> */}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <ToolsCard headerTitle="养宠生活" tools={items1} />
        <ToolsCard headerTitle="我的交易" tools={items2} />
        <ToolsCard headerTitle="我的工具" tools={items3} />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrap: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 4,
    alignItems: "center",
  },
  content: { marginTop: -60 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderStyle: "solid",
    borderColor: "#b2dfdb",
    marginTop: 60,
    marginBottom: 40,
    height: 120,
    width: 120,
    borderWidth: 8,
    borderRadius: 60,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 28,
    color: "#FFF",
  },
  buttonStyle: {
    height: 50,
    borderRadius: 25,
    width: 160,
    margin: 40,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#f2f2f2",
    marginTop: 20,
  },
  inputStyle: {
    borderBottomWidth: 0,
    marginTop: 4,
    marginBottom: 4,
  },
  inputLeftIconContainer: { marginLeft: 2, marginRight: 6 },
  cardContent: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  cardTitleLeftEle: {
    height: 16,
    width: 3,
    marginRight: -8,
    backgroundColor: "tomato",
  },
});
