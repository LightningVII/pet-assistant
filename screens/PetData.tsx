import React, { useState, useRef, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Card, Slider, Button } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Actions from "../redux/userActions.js";

const image = {
  iconImage: require("../assets/static/checklist.png"),
};

const progressStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8e1",
    marginBottom: 3,
    borderRadius: 8,
  },
  iconLabelContainer: {
    width: 50,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    textAlign: "center",
    lineHeight: 28,
    height: 28,
    width: 28,
    borderRadius: 14,
    overflow: "hidden",
  },
  bubbleContainer: {
    height: 14,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 4,
  },
  downArrow: {
    width: 0,
    borderTopWidth: 4,
    borderRightWidth: 3,
    borderRightColor: "transparent",
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  thumbStyle: {
    width: 14,
    height: 14,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
  trackStyle: {
    height: 5,
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.05,
  },
});

const bubbleDistance = (value, sw, bw) => {
  if (value === 0) return -bw / 2 + (8 - 2);
  else if (value === 1) return sw * value - bw / 2 - 8;
  else return sw * value - bw / 2 + (value > 0.5 ? -8 * value : 8 * value);
};

const ProgressCard = ({ value, color, iconLabelStyle, cardStyle }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [bubbleWidth, setBubbleWidth] = useState(0);
  const bubblePosition = bubbleDistance(value, sliderWidth, bubbleWidth);

  return (
    <View style={[progressStyles.cardContainer, cardStyle]}>
      <View style={progressStyles.iconLabelContainer}>
        <FontAwesome5
          style={[progressStyles.iconLabel, iconLabelStyle]}
          name="ruler"
          size={14}
          color={color}
        />
      </View>
      <View
        style={{ flex: 1, marginRight: 20 }}
        onLayout={({ nativeEvent }) => setSliderWidth(nativeEvent.layout.width)}
      >
        <View style={{ height: 16, marginTop: 3, alignItems: "baseline" }}>
          <View
            style={{
              alignItems: "center",
              position: "relative",
              left: bubblePosition,
            }}
          >
            <View
              onLayout={({ nativeEvent }) =>
                setBubbleWidth(nativeEvent.layout.width)
              }
              style={[
                progressStyles.bubbleContainer,
                { backgroundColor: color },
              ]}
            >
              <Text style={{ fontSize: 12, color: "#fff", lineHeight: 14 }}>
                {sliderWidth.toFixed(0) + "KM"}
              </Text>
            </View>
            <View
              style={[progressStyles.downArrow, { borderTopColor: color }]}
            />
          </View>
        </View>

        <Slider
          style={{ marginTop: -10 }}
          disabled
          minimumTrackTintColor={color}
          thumbStyle={progressStyles.thumbStyle}
          trackStyle={progressStyles.trackStyle}
          thumbTintColor={color}
          animateTransitions
          value={value}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", width: 88 }}>
        <FontAwesome5
          style={{ height: 28, marginRight: 5, lineHeight: 28 }}
          name="font-awesome-flag"
          size={14}
          color={color}
        />
        <Text style={{ fontSize: 12 }}>42.2KM</Text>
      </View>
    </View>
  );
};

const DataCardTitle = () => (
  <View
    style={{
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text
        style={{
          fontSize: 18,
          color: "#333",
          zIndex: 1,
          marginLeft: 8,
        }}
      >
        运动数据
      </Text>
      <Image
        style={{
          width: 120,
          height: 20,
          marginTop: -10,
        }}
        source={require("../assets/static/card-title-bg.png")}
      />
    </View>

    <FontAwesome5
      name={"cloud-sun"}
      size={10}
      style={{ marginRight: 20, color: "tomato" }}
    />
  </View>
);

const CardRefreshIcon = () => (
  <View style={{ zIndex: 1 }}>
    <View
      style={{
        width: 40,
        height: 36,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        overflow: "hidden",
        position: "absolute",
        right: -15,
      }}
    >
      <LinearGradient
        colors={["#ff7043", "tomato"]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Ionicons
          style={{ textAlign: "center", lineHeight: 36 }}
          name="md-refresh-circle"
          size={28}
          color="#fff"
        />
      </LinearGradient>
    </View>
  </View>
);

export default connect(
  () => ({}),
  Actions
)(function (props) {
  const [svalue, setSvalue] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card
          containerStyle={[styles.cardContainer, styles.profileCardContainer]}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                borderWidth: 5,
                borderColor: "white",
                borderRadius: 35,
                marginTop: -40,
                marginLeft: 20,
                marginRight: 20,
              }}
              source={require("../assets/static/id-card.png")}
            />
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                justifyContent: "space-between",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <View>
                <Text style={{ fontSize: 16, color: "#333" }}>{"用户名"}</Text>
                <Text style={{ fontSize: 16, color: "#999" }}>{"哈士奇"}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 32, color: "#333" }}>{"28°"}</Text>
                <FontAwesome5
                  name={"cloud-sun"}
                  size={30}
                  style={{ marginRight: 20, marginLeft: 10, color: "#999" }}
                />
              </View>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.cardContainer} title={<DataCardTitle />}>
          <CardRefreshIcon />
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <ProgressCard
              color="#ffb300"
              cardStyle={{ backgroundColor: "#fff8e1" }}
              iconLabelStyle={{ backgroundColor: "#ffecb3" }}
              value={svalue}
            />
            <ProgressCard
              color="#7cb342"
              cardStyle={{ backgroundColor: "#f1f8e9" }}
              iconLabelStyle={{ backgroundColor: "#dcedc8" }}
              value={0.7}
            />
            <ProgressCard
              color="#f4511e"
              cardStyle={{ backgroundColor: "#fbe9e7" }}
              iconLabelStyle={{ backgroundColor: "#ffccbc" }}
              value={0}
            />
          </View>
        </Card>

        <Card containerStyle={styles.cardContainer} title={<DataCardTitle />}>
          <CardRefreshIcon />
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={image.iconImage}
              style={{ height: 120, resizeMode: "contain" }}
            />
            <Text style={{ marginTop: 20, fontSize: 16 }}>
              {"绑定数据后才有喂食数据哦"}
            </Text>

            <Button
              title="绑定设备"
              containerStyle={{ width: "80%", marginTop: 20 }}
              buttonStyle={{ borderRadius: 50, backgroundColor: "tomato" }}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  cardContainer: {
    borderRadius: 4,
    borderWidth: 0,
    padding: 5,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  profileCardContainer: {
    overflow: "visible",
    padding: 0,
    marginTop: 40,
  },
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
