import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface DifficultySelectorProps {
  selectedDifficulty: "simple" | "complex";
  onSelectDifficulty: (difficulty: "simple" | "complex") => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Уровень сложности</Text>
      <View style={styles.options}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            selectedDifficulty === "simple"
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => onSelectDifficulty("simple")}
        >
          <Text
            style={
              selectedDifficulty === "simple"
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Простой
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            selectedDifficulty === "complex"
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => onSelectDifficulty("complex")}
        >
          <Text
            style={
              selectedDifficulty === "complex"
                ? styles.selectedText
                : styles.unselectedText
            }
          >
            Сложный
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  label: {
    margin: "auto",
    fontSize: 16,
    color: "#49535C",
    fontFamily: "Montserrat-SemiBold",
  },
  options: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
  },
  option: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    fontSize: 15,
  },
  selectedOption: {
    backgroundColor: "#ffffff",
  },
  unselectedOption: {
    backgroundColor: "#EFF1F5",
  },
  selectedText: {
    color: "#49535C",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
  },
  unselectedText: {
    color: Colors.main,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
  },
});

export default DifficultySelector;
