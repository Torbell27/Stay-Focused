import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Counter from "@/components/TaskSettings/Counter";

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
          label={difficulty === "complex" ? "Первая серия" : undefined}
          value={firstSeriesCount}
          setValue={onFirstSeriesChange}
        />

        {difficulty === "complex" && (
          <Counter
            label="Вторая серия"
            value={secondSeriesCount}
            setValue={onSecondSeriesChange}
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
    color: "#636262",
    fontFamily: "Montserrat-SemiBold",
  },
  countersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
});

export default CounterSection;
