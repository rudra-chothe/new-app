import { readColorFromDevice } from "@/context/states/BLEstate/listner";
import { useAppDispatch, useAppSelector } from "@/context/store";
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Read() {
  const dispatch = useAppDispatch();
  const backgroundColor = useAppSelector((state) => state.BLE.retrievedColor);
  const connectedDevice = useAppSelector((state) => state.BLE.connectedDevice);
  const error = useAppSelector((state) => state.BLE.error);

  const readRemoteColor = async () => {
    if (!connectedDevice) {
      Alert.alert("No Device", "Please connect to a BLE device first");
      return;
    }

    try {
      await dispatch(readColorFromDevice()).unwrap();
    } catch (error) {
      console.error("Failed to read from device:", error);
      Alert.alert("Error", "Failed to read data from device");
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
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor ?? "#FFFFFF" },
      ]}
    >
      <Pressable style={styles.button} onPress={readRemoteColor}>
        <Text style={styles.ctaBtnTxt}>Read Color From Device</Text>
      </Pressable>

      <View style={styles.colorDisplay}>
        <Text style={styles.colorLabel}>Current Color:</Text>
        <Text style={styles.colorValue}>{backgroundColor || "No data read"}</Text>
      </View>

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
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },
  ctaBtnTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  colorDisplay: {
    alignItems: "center",
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  colorValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deviceInfo: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 12,
  },
  deviceText: {
    color: "white",
    fontSize: 14,
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