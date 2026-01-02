import { store } from "@/context/store";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="Connect" options={{ headerShown: false }} />
        <Stack.Screen name="Notify" options={{ headerShown: false }} />
        <Stack.Screen name="Read" options={{ headerShown: false }} />
        <Stack.Screen name="Write" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
