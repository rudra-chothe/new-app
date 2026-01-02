import { sendColorData } from "@/context/states/BLEstate/listner";
import { useAppDispatch, useAppSelector } from "@/context/store";
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Write() {
  const dispatch = useAppDispatch();
  const connectedDevice = useAppSelector((state) => state.BLE.connectedDevice);
  const error = useAppSelector((state) => state.BLE.error);

  const sendData = async () => {
    if (!connectedDevice) {
      Alert.alert("No Device", "Please connect to a BLE device first");
      return;
    }

    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const colorHex = `#${randomColor}`;

    try {
      await dispatch(sendColorData(colorHex)).unwrap();
      Alert.alert("Success", `Sent color: ${colorHex}`);
    } catch (error) {
      console.error("Failed to send data:", error);
      Alert.alert("Error", "Failed to send data to device");
    }
  };

  if (!connectedDevice) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDeviceText}>No device connected</Text>
        <Text style={styles.instructionText}>Please connect to a BLE device first</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={sendData}>
        <Text style={styles.ctaBtnTxt}>Send Random Color To Device</Text>
      </Pressable>

      <View style={styles.deviceInfo}>
        <Text style={styles.deviceText}>
          Connected to: {connectedDevice.name || "Unknown Device"}
        </Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  noDeviceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  ctaBtnTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deviceInfo: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deviceText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#FFE6E6",
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
  },
});