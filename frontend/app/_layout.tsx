import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
  });

  return <Stack screenOptions={{ headerShown: false }}/>;
}
