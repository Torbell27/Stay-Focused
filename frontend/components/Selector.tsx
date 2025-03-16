import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

interface SelectorProps {
  selected: string;
  onSelect: (type: string) => void;
  mainLabel?: string;
  keys?: Record<string, string>;
  buttonHeight?: number;
}

const Selector: React.FC<SelectorProps> = ({
  selected,
  onSelect,
  mainLabel = "",
  keys = { "1": "1", "2": "2" },
  buttonHeight = 0,
}) => {
  return (
    <View style={styles.container}>
      <>{mainLabel && <Text style={styles.label}>{mainLabel}</Text>}</>
      <View style={[styles.options, !mainLabel && styles.compactOptions]}>
        {Object.entries(keys).map(([k, v]) => (
          <TouchableOpacity
            key={k}
            activeOpacity={0.8}
            style={[
              styles.option,
              selected === k ? styles.selectedOption : styles.unselectedOption,
              { minHeight: buttonHeight },
            ]}
            onPress={() => onSelect(k)}
          >
            <Text
              style={
                selected === k ? styles.selectedText : styles.unselectedText
              }
            >
              {v}
            </Text>
          </TouchableOpacity>
        ))}
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
