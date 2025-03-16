import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

interface CounterProps {
  label: string;
  value: number;
  onSeriesChange: (value: number) => void;
  difficulty: string;
}

const Counter: React.FC<CounterProps> = ({
  label,
  value,
  onSeriesChange,
  difficulty,
}) => {
  return (
    <View style={stylesCounter.container}>
      {difficulty == "complex" && (
        <Text style={stylesCounter.label}>{label}</Text>
      )}
      <View style={stylesCounter.counterContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={stylesCounter.button}
          onPress={() => onSeriesChange(Math.max(1, value - 1))}
        >
          <Text style={stylesCounter.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={stylesCounter.valueContainer}>
          <TextInput
            maxLength={3}
            defaultValue={value.toString()}
            keyboardType="numeric"
            style={stylesCounter.value}
            onChangeText={(e) => {
              if (e && parseInt(e)) onSeriesChange(parseInt(e));
            }}
          ></TextInput>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={stylesCounter.button}
          onPress={() => onSeriesChange(Math.min(999, value + 1))}
        >
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
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#E5E7EB",
  },
  button: {
    width: 32,
    height: "auto",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "#6B7280",
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
    width: 100000,
    overflow: "hidden",
  },
  value: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    width: 100000,
    fontFamily: "Montserrat-Bold",
  },
});

interface CounterSectionProps {
  firstSeriesCount: number;
  secondSeriesCount: number;
  onFirstSeriesChange: (value: number) => void;
  onSecondSeriesChange: (value: number) => void;
  difficulty: string;
}

const CounterSection: React.FC<CounterSectionProps> = ({
  firstSeriesCount,
  secondSeriesCount,
  onFirstSeriesChange,
  onSecondSeriesChange,
  difficulty,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Количество нажатий</Text>

      <View style={styles.countersContainer}>
        <Counter
          label="Первая серия"
          value={firstSeriesCount}
          onSeriesChange={onFirstSeriesChange}
          difficulty={difficulty}
        />

        {difficulty == "complex" && (
          <Counter
            label="Вторая серия"
            value={secondSeriesCount}
            onSeriesChange={onSecondSeriesChange}
            difficulty={difficulty}
          />
        )}
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
    fontFamily: "Montserrat-SemiBold",
  },
  countersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
});

export default CounterSection;
