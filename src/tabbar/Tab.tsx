import React, { ReactElement, cloneElement } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { ICON_SIZE } from "./icons/Constants";
import Animated, {
  eq,
  interpolate,
  multiply,
  cond,
  greaterThan,
} from "react-native-reanimated";
import { withTransition } from "react-native-redash";

interface Props {
  children: ReactElement;
  onPress: () => void;
  active: Animated.Node<number>;
  index: number;
  transition: Animated.Node<number>;
}

export default ({ children, active, index, transition, onPress }: Props) => {
  const isActive = eq(active, index);
  const activeTranition = withTransition(isActive);
  const width = multiply(activeTranition, ICON_SIZE);
  const isGoingLeft = greaterThan(transition, active);
  const direction = cond(
    isActive,
    cond(isGoingLeft, "rtl", "ltr"),
    cond(isGoingLeft, "ltr", "rtl")
  );

  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View style={{ width: ICON_SIZE, height: ICON_SIZE, direction }}>
        <View style={StyleSheet.absoluteFill}>{children}</View>
        <Animated.View style={{ overflow: "hidden", width }}>
          {cloneElement(children, { active: true })}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
