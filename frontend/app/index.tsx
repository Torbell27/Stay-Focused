import { Text, View, Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
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
      <HelloWave></HelloWave>

	  <Text>Главная страница</Text>

	  {/* Кнопки */}
	  <Button title="Пациент -> Кнопка" onPress={() => router.push("patient/TaskButtonScreen")} />
    </View>
  );
}