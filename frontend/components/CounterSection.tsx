import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({
  label,
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={stylesCounter.container}>
      <Text style={stylesCounter.label}>{label}</Text>
      <View style={stylesCounter.counterContainer}>
        <TouchableOpacity style={stylesCounter.button} onPress={onDecrement}>
          <Text style={stylesCounter.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={stylesCounter.valueContainer}>
          <Text style={stylesCounter.value}>{value}</Text>
        </View>

        <TouchableOpacity style={stylesCounter.button} onPress={onIncrement}>
          <Text style={stylesCounter.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesCounter = StyleSheet.create({
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
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
    padding: 8,
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#6B7280",
    fontSize: 20,
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
  },
  value: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
  },
});

interface CounterSectionProps {
  firstSeriesCount: number;
  secondSeriesCount: number;
  onFirstSeriesChange: (value: number) => void;
  onSecondSeriesChange: (value: number) => void;
}

const CounterSection: React.FC<CounterSectionProps> = ({
  firstSeriesCount,
  secondSeriesCount,
  onFirstSeriesChange,
  onSecondSeriesChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Количество нажатий</Text>

      <View style={styles.countersContainer}>
        <Counter
          label="Первая серия"
          value={firstSeriesCount}
          onIncrement={() => onFirstSeriesChange(firstSeriesCount + 1)}
          onDecrement={() =>
            onFirstSeriesChange(Math.max(1, firstSeriesCount - 1))
          }
        />

        <Counter
          label="Вторая серия"
          value={secondSeriesCount}
          onIncrement={() => onSecondSeriesChange(secondSeriesCount + 1)}
          onDecrement={() =>
            onSecondSeriesChange(Math.max(1, secondSeriesCount - 1))
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: 16,
    color: "#49535C",
    fontFamily: "Montserrat-SemiBold,sans-serif",
  },
  countersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
});

export default CounterSection;
