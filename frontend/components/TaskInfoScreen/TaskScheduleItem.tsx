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

interface StatItem {
  timestamp_start: number;
  success: boolean;
  in_time: boolean;
  tap_count: number[];
}

interface TaskScheduleItemProps {
  id?: string;
  isExpanded?: boolean;
  onToggle?: () => void;

  date?: string;
  time_stat?: {
    [key: string]: StatItem | undefined;
  };
  formatTime?: (timestamp: number) => string;

  task?: {
    id: string;
    time: string;
    series1: string;
    series2: string;
  };
}

const TaskScheduleItem: React.FC<TaskScheduleItemProps> = ({
  id,
  date,
  time_stat,
  isExpanded = false,
  onToggle,
  formatTime,
  task,
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

  const isStatisticsMode = !!date && !!time_stat && !!formatTime;
  const isTaskInfoMode = !!task;

  return (
    <View style={[styles.container, isExpanded && styles.expandedContainer]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={styles.header}
      >
        <Text style={styles.headerText}>
          {isStatisticsMode ? date : task?.time}
        </Text>
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
          styles.contentContainer,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                isStatisticsMode
                  ? Object.keys(time_stat || {}).length * 100
                  : 80,
              ],
            }),
          },
        ]}
      >
        {isExpanded &&
          (isStatisticsMode ? (
            Object.entries(time_stat || {})
              .filter(([_, stat]) => stat !== undefined)
              .map(([time, stat]) => (
                <View key={time} style={styles.timeItem}>
                  <View style={styles.timeHeader}>
                    <Text style={styles.timeText}>
                      {formatTime!(stat!.timestamp_start)}
                    </Text>
                    <AntDesign
                      name={stat!.success ? "checkcircleo" : "closecircleo"}
                      size={20}
                      color={stat!.success ? "#1BCD1B" : "#F47272"}
                      style={styles.icon}
                    />
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      color={stat!.in_time ? "#1BCD1B" : "#F47272"}
                    />
                  </View>
                  <Text style={styles.seriesText}>
                    1-ая серия: {stat!.tap_count[0]} нажатий
                  </Text>
                  <Text style={styles.seriesText}>
                    2-ая серия: {stat!.tap_count[1]} нажатий
                  </Text>
                </View>
              ))
          ) : isTaskInfoMode ? (
            <>
              <Text style={styles.seriesText}>{task?.series1}</Text>
              <Text style={styles.seriesText}>{task?.series2}</Text>
            </>
          ) : null)}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: Colors.backgroundScreen,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: Colors.main,
  },
  timeItem: {
    padding: 10,
    backgroundColor: "#F9F7F7",
    borderRadius: 8,
    marginBottom: 8,
  },
  timeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: Colors.headerText,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  seriesText: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: Colors.headerText,
    marginBottom: 4,
  },
  contentContainer: {
    overflow: "hidden",
  },
  expandedContainer: {
    backgroundColor: "#F9F7F7",
    elevation: 3,
  },
});

export default TaskScheduleItem;
