import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface SelectorProps {
  selected: 0 | 1;
  onSelect: (type: 0 | 1) => void;
  label?: string;
  firstLabel?: string;
  secondLabel?: string;
  showLabel?: boolean;
  buttonHeight?: number;
}

const Selector: React.FC<SelectorProps> = ({
  selected,
  onSelect,
  label = "Label",
  firstLabel = "0",
  secondLabel = "1",
  showLabel = true,
  buttonHeight = 0,
}) => {
  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.options, !showLabel && styles.compactOptions]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            selected === 0 ? styles.selectedOption : styles.unselectedOption,
            { minHeight: buttonHeight },
          ]}
          onPress={() => onSelect(0)}
        >
          <Text style={selected === 0 ? styles.selectedText : styles.unselectedText}>
            {firstLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            selected === 1 ? styles.selectedOption : styles.unselectedOption,
            { minHeight: buttonHeight },
          ]}
          onPress={() => onSelect(1)}
        >
          <Text style={selected === 1 ? styles.selectedText : styles.unselectedText}>
            {secondLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#49535C",
    fontFamily: "Montserrat-SemiBold",
  },
  options: {
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
    borderRadius: 20,
    minWidth: 100,
  },
  compactOptions: {
    alignSelf: "flex-start",
  },
  option: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
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

export default Selector;
