import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import Compass from "./icons/Compass";
import Chat from "./icons/Chat";
import Camera from "./icons/Camera";
import Bell from "./icons/Bell";
import { SEGMENT, ICON_SIZE, PADDING } from "./icons/Constants";
import User from "./icons/User";
import Tab from "./Tab";
import { Value } from "react-native-reanimated";
import { withTransition } from "react-native-redash";

const tabs = [
  { icon: <Compass /> },
  { icon: <Chat /> },
  { icon: <Camera /> },
  { icon: <Bell /> },
  { icon: <User /> },
];

interface Props {}
const Tabbar = () => {
  //   const [active, setActive] = useState<number>(0);
  const active = new Value<number>(0);
  const transition = withTransition(active);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#7DE3B6",
        justifyContent: "flex-end",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map(({ icon }, index) => (
            <View style={styles.tab} key={index}>
              <Tab
                {...{ active, index, transition }}
                onPress={() => active.setValue(index)}
              >
                {icon}
              </Tab>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    width: SEGMENT,
    height: ICON_SIZE + PADDING * 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabbar;
