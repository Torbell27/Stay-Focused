import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";

interface TaskScheduleItemProps {
  task: {
    id: string;
    time: string;
    series1: string;
    series2: string;
  };
}

const TaskScheduleItem: React.FC<TaskScheduleItemProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [heightAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [rotateAnim] = useState<Animated.Value>(new Animated.Value(0));

  const toggleExpand = () => {
    const initialHeight = isExpanded ? 1 : 0;
    const finalHeight = isExpanded ? 0 : 1;
    const initialRotate = isExpanded ? 1 : 0;
    const finalRotate = isExpanded ? 0 : 1;

    setIsExpanded(!isExpanded);

    heightAnim.setValue(initialHeight);
    rotateAnim.setValue(initialRotate);
    Animated.timing(heightAnim, {
      toValue: finalHeight,
      duration: 300,
      useNativeDriver: false
    }).start();
    Animated.timing(rotateAnim, {
      toValue: finalRotate,
      duration: 0,
      useNativeDriver: false
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.timeBlock}>
        <Text style={styles.timeText}>{task.time}</Text>
        <Animated.View
          style={[
            styles.icon,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"]
                  })
                },
              ]
            }
          ]}
        >
          <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <Path
              d="M7 10L17 20L28 10"
              stroke="#CCD7ED"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.seriesContainer,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80]
            })
          }
        ]}
      >
        {isExpanded && (
          <>
            <Text style={styles.seriesText}>{task.series1}</Text>
            <Text style={styles.seriesText}>{task.series2}</Text>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },
  timeBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  timeText: {
    fontSize: 24,
    color: Colors.main,
    fontWeight: "700"
  },
  icon: {
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  seriesContainer: {
    overflow: "hidden"
  },
  seriesText: {
    fontSize: 16,
    color: Colors.headerText,
    fontWeight: "400",
    marginTop: 4
  }
});

export default TaskScheduleItem;