import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ADHD Support App</Text>
      <Text>👋</Text>
      <Text>Главная страница</Text>

<<<<<<< HEAD
      {/* Кнопки */}
      <Button
        title="Страница авторизации"
        onPress={() => router.push("/authorize")}
      />
      <Button
        title="Регистрация пациента/ребёнка"
        onPress={() => router.push("/doctor/PatientRegistration")}
      />
      <Button
        title="Главная страница врача-родителя"
        onPress={() => router.push("/doctor/PatientList")}
      />
      <Button
        title="Карточка пациента-ребенка"
        onPress={() => router.push("/doctor/PatientInfo")}
      />
      <Button
        title="Статистика пациента-ребёнка"
        onPress={() => router.push("/doctor/StatisticsScreen")}
      />
      <Button
        title="Редактирование задания"
        onPress={() => router.push("/doctor/TaskSettings")}
      />
      <Button
        title="Окно с описанием заданий для пациента"
        onPress={() => router.push("/patient/TaskInfoScreen")}
      />
      <Button
        title="Окно с кнопкой для пациента"
        onPress={() => router.push("/patient/TaskButtonScreen")}
      />
=======
	  <Text>Главная страница</Text>

	  {/* Кнопки */}
	  <Button title="Пациент -> Кнопка" onPress={() => router.push("/patient/TaskButtonScreen")} />
>>>>>>> e5c067c (Кнопку исправил + починил пути + убрал html)
    </View>
  );
}
