import * as React from "react";
import { Link } from "expo-router"; // Импортируем компонент для навигации
import { ActionButton } from "@/components/ActionButton";
import { View } from "react-native";


export default function ButtonPage() {
  const handleClick = () => {
    alert("Вы нажали кнопку!");
  };

  return (
    <View>
      <ActionButton label="Нажать" />
      <Link href="/">Перейти на главную</Link> {/* Ссылка на главную страницу */}
    </View>
  );
}