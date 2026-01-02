import Manager from "@/context/states/BLEstate/BLEManager";
import { useAppSelector } from "@/context/store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screens = ["Notify", "Read", "Write"];

const Home = () => {
  const nav = useRouter();

  const connectedDevice = useAppSelector((state) => state.BLE.connectedDevice);

  const onBtnTapped = () => {
    nav.push("/Connect");
  };

  const onScreenTapped = (screen: string) => {
    nav.push(screen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {connectedDevice?.id ? (
        <View>
          <Text style={styles.statusText}>Connected to: {connectedDevice.name}</Text>
          {Manager.isAvailable() ? (
            <FlatList
              style={{ marginTop: 30 }}
              data={screens}
              renderItem={({ item }) => {
                const goToScreen = () => onScreenTapped(item);
                return (
                  <Pressable
                    onPress={goToScreen}
                    style={styles.connectToDeviceBtn}
                  >
                    <Text style={styles.connectBtnTextColor}>{item}</Text>
                  </Pressable>
                );
              }}
            />
          ) : (
            <Text style={styles.errorText}>BLE not available on this device</Text>
          )}
        </View>
      ) : (
        <Pressable style={styles.connectToDeviceBtn} onPress={onBtnTapped}>
          <Text style={styles.connectBtnTextColor}>
            Please Connect To A Device
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectToDeviceBtn: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 7,
    height: 70,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  connectBtnTextColor: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  statusText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
