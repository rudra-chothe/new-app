import { startListening } from "@/context/states/BLEstate/listner";
import { useAppDispatch, useAppSelector } from "@/context/store";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default function Notify() {
  const dispatch = useAppDispatch();
  const backgroundColor = useAppSelector((state) => state.BLE.retrievedColor);
  const connectedDevice = useAppSelector((state) => state.BLE.connectedDevice);
  const error = useAppSelector((state) => state.BLE.error);

  useEffect(() => {
    if (connectedDevice) {
      const startNotification = async () => {
        try {
          await dispatch(startListening()).unwrap();
        } catch (error) {
          console.error("Failed to start listening:", error);
          Alert.alert("Error", "Failed to start listening for notifications");
        }
      };
      startNotification();
    }
  }, [connectedDevice]);

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
      <View style={styles.colorBox}>
        <Text style={styles.colorTitleText}>Received Color</Text>
        <Text style={styles.colorHexText}>{backgroundColor || "No data"}</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Connected to: {connectedDevice.name || "Unknown Device"}
        </Text>
        <Text style={styles.statusText}>
          Listening for color notifications...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  colorBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    width: 200,
    backgroundColor: "black",
    borderRadius: 20,
    marginBottom: 20,
  },
  colorTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  colorHexText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
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
  statusContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
});