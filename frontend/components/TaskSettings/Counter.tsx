import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

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
          <Text style={styles.buttonText}>-</Text>
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
          <Text style={styles.buttonText}>+</Text>
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
    color: "#49535C",
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
  },
  button: {
    width: 32,
    height: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
  },
  value: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    width: "100%",
    fontFamily: "Montserrat-Bold",
  },
});

export default Counter;
