import * as React from "react";
import { Link } from "expo-router";
import { ActionButton } from "@/components/TaskButtonScreen/ActionButton";
import { View, Text } from "react-native";

export default function ButtonPage() {
  return (
    <View>
      <ActionButton label="Нажать" />
      <Link href="/">
        <Text>Перейти на главную</Text>
      </Link>
      {/* Ссылка на главную страницу */}
    </View>
  );
}
