import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

interface TaskScheduleItemProps {
  task: {
    id: string;
    time: string;
    series1: string;
    series2: string;
  };
  isExpanded?: boolean;
  onToggle?: () => void;
}

const TaskScheduleItem: React.FC<TaskScheduleItemProps> = ({
  task,
  isExpanded = false,
  onToggle,
}) => {
  const [heightAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    heightAnim.setValue(isExpanded ? 1 : 0);
    rotateAnim.setValue(isExpanded ? 1 : 0);
  }, []);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const handlePress = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <View style={[styles.container, isExpanded && styles.expandedContainer]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={styles.timeBlock}
      >
        <Text style={[styles.timeText]}>{task.time}</Text>
        <Animated.View
          style={[
            styles.icon,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <AntDesign name="down" size={20} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.seriesContainer,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80],
            }),
            backgroundColor: isExpanded
              ? "transparent"
              : Colors.backgroundScreen,
          },
        ]}
      >
        {isExpanded && (
          <>
            <Text style={[styles.seriesText]}>{task.series1}</Text>
            <Text style={[styles.seriesText]}>{task.series2}</Text>
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
    borderColor: "#E5E7EB",
    backgroundColor: Colors.backgroundScreen,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  timeBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 24,
    color: Colors.main,
    fontWeight: "700",
  },
  icon: {
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  seriesContainer: {
    overflow: "hidden",
  },
  expandedContainer: {
    backgroundColor: "#F9F7F7",
    elevation: 3,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 36,
    paddingRight: 36,
  },
  seriesText: {
    fontSize: 16,
    color: Colors.headerText,
    fontWeight: "400",
    marginTop: 4,
    backgroundColor: "#F9F7F7",
  },
});

export default TaskScheduleItem;
