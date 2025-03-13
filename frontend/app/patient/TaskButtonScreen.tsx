import * as React from "react";
import { Link } from "expo-router"; // Импортируем компонент для навигации
import { ActionButton } from "@/components/ActionButton";


export default function ButtonPage() {
  const handleClick = () => {
    alert("Вы нажали кнопку!");
  };

  return (
    <div className="button-page">
      <h1>Страница с кнопкой</h1>
      <ActionButton label="Нажать" onClick={handleClick} />
      <br />
      <Link href="/">Перейти на главную</Link> {/* Ссылка на главную страницу */}
    </div>
  );
}