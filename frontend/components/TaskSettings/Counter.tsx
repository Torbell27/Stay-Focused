import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface CounterProps {
  label?: string;
  value: number;
  setValue: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  label = undefined,
  value,
  setValue,
}) => {
  const [textInputValue, setTextInputValue] = useState<string>(
    value.toString()
  );

  const handleBlur = useCallback(() => {
    if (textInputValue === "") setTextInputValue("1");
  }, [textInputValue]);

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/\D/g, "");
    setTextInputValue(numericText);
    if (numericText === "") setValue(1);
    else setValue(parseInt(numericText, 10));
  };

  const decrement = useCallback(() => {
    const parsedValue = parseInt(textInputValue, 10);
    const newValue = isNaN(parsedValue) ? 1 : Math.max(1, parsedValue - 1);
    setTextInputValue(newValue.toString());
    setValue(newValue);
  }, [textInputValue, setValue]);

  const increment = useCallback(() => {
    const parsedValue = parseInt(textInputValue, 10);
    const newValue = isNaN(parsedValue) ? 1 : Math.min(99, parsedValue + 1);
    setTextInputValue(newValue.toString());
    setValue(newValue);
  }, [textInputValue, setValue]);

  const currentBorderColor = useMemo(() => {
    return textInputValue === "" || isNaN(parseInt(textInputValue, 10))
      ? "red"
      : styles.counterContainer.borderColor;
  }, [textInputValue]);

  return (
    <View style={styles.container}>
      <>{label && <Text style={styles.label}>{label}</Text>}</>
      <View
        style={[styles.counterContainer, { borderColor: currentBorderColor }]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={decrement}
        >
          <FontAwesome6 style={styles.buttonIcon} name="minus" />
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <TextInput
            maxLength={2}
            value={textInputValue}
            keyboardType="numeric"
            style={styles.value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={increment}
        >
          <FontAwesome6 style={styles.buttonIcon} name="plus" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#636262",
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
  },
  counterContainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  button: {
    width: 32,
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  buttonIcon: {
    color: "#636262",
    textAlign: "center",
    fontSize: 20,
    margin: "auto",
  },
  valueContainer: {
    flex: 1,
    width: "100%",
  },
  value: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 16,
    color: "#636262",
    textAlign: "center",
    width: "100%",
    fontFamily: "Montserrat-Bold",
  },
});

export default Counter;
