import * as React from "react";
import { Link } from "expo-router";
import { ActionButton } from "@/components/ActionButton";
<<<<<<< HEAD
import { View, Text } from "react-native";
=======
import { View } from "react-native";

>>>>>>> e5c067c (Кнопку исправил + починил пути + убрал html)

export default function ButtonPage() {
  return (
    <View>
      <ActionButton label="Нажать" />
<<<<<<< HEAD
      <Link href="/">
        <Text>Перейти на главную</Text>
      </Link>{" "}
      {/* Ссылка на главную страницу */}
=======
      <Link href="/">Перейти на главную</Link> {/* Ссылка на главную страницу */}
>>>>>>> e5c067c (Кнопку исправил + починил пути + убрал html)
    </View>
  );
}
