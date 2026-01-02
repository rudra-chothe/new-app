 
import { connectToDevice } from "@/context/states/BLEstate/listner";
import { startScanning, setScanning, setError, clearDevices, setScanDuration } from "@/context/states/BLEstate/slice";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { requestBLEPermissions } from "@/hooks/useBLE";
import Manager from "@/context/states/BLEstate/BLEManager";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bluetooth = () => {
  const dispatch = useAppDispatch();
  const { allDevices, isScanning, error, scanDuration } = useAppSelector((state) => state.BLE);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    // Check permissions on mount
    checkPermissionsAndBluetooth();
  }, []);

  const checkPermissionsAndBluetooth = async () => {
    try {
      const hasPermissions = await requestBLEPermissions();
      if (!hasPermissions) {
        Alert.alert("Permissions Required", "BLE permissions are required for Bluetooth functionality.");
        return;
      }

      // Check if Bluetooth is enabled
      const isEnabled = await Manager.isBluetoothEnabled();
      if (!isEnabled) {
        Alert.alert("Bluetooth Disabled", "Please enable Bluetooth to scan for devices.");
        return;
      }
    } catch (err) {
      console.error("Error checking permissions/bluetooth:", err);
      dispatch(setError("Failed to check permissions or Bluetooth state"));
    }
  };

  const handleScan = async () => {
    try {
      // Clear previous devices and errors
      dispatch(clearDevices());
      dispatch(setError(""));

      // Check permissions and Bluetooth state
      await checkPermissionsAndBluetooth();

      // Start scanning
      dispatch(setScanning(true));
      dispatch(startScanning());

    } catch (err: any) {
      console.error("Scan error:", err);
      dispatch(setError(err.message || "Failed to start scanning"));
      dispatch(setScanning(false));
    }
  };

  const handleConnect = async (deviceId: string) => {
    try {
      setSelectedDevice(deviceId);
      const device = allDevices.find(d => d.id === deviceId);
      if (!device) {
        throw new Error("Device not found");
      }
      await dispatch(connectToDevice(device));
      Alert.alert("Success", "Connected to device successfully!");
    } catch (err: any) {
      console.error("Connection error:", err);
      Alert.alert("Connection Failed", err.message || "Failed to connect to device");
    } finally {
      setSelectedDevice(null);
    }
  };

  const renderDevice = ({ item }: { item: any }) => (
    <View style={styles.deviceItem}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name || "Unknown Device"}</Text>
        <Text style={styles.deviceId}>{item.id}</Text>
        <Text style={styles.deviceRssi}>RSSI: {item.rssi} dBm</Text>
        {item.advertising && item.advertising.isConnectable !== undefined && (
          <Text style={styles.deviceConnectable}>
            Connectable: {item.advertising.isConnectable ? "Yes" : "No"}
          </Text>
        )}
      </View>
      <Pressable
        style={[
          styles.connectButton,
          selectedDevice === item.id && styles.connectingButton
        ]}
        onPress={() => handleConnect(item.id)}
        disabled={selectedDevice === item.id}
      >
        <Text style={styles.connectButtonText}>
          {selectedDevice === item.id ? "Connecting..." : "Connect"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bluetooth Devices</Text>

      {/* Scan Controls */}
      <View style={styles.scanControls}>
        <View style={styles.scanDurationContainer}>
          <Text style={styles.scanDurationLabel}>Scan Duration (seconds):</Text>
          <TextInput
            style={styles.scanDurationInput}
            value={scanDuration.toString()}
            onChangeText={(text) => {
              const duration = parseInt(text) || 5;
              dispatch(setScanDuration(Math.max(1, Math.min(30, duration))));
            }}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <Pressable
          style={[styles.scanButton, isScanning && styles.scanningButton]}
          onPress={handleScan}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? "Scanning..." : "Scan for Devices"}
          </Text>
        </Pressable>
      </View>

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Device List */}
      <FlatList
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        style={styles.deviceList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isScanning ? "Scanning for devices..." : "No devices found. Tap 'Scan for Devices' to start."}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Bluetooth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  scanControls: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scanDurationContainer: {
    marginBottom: 10,
  },
  scanDurationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  scanDurationInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  scanButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  scanningButton: {
    backgroundColor: "#FF9500",
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#FFE6E6",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "500",
  },
  deviceList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  deviceItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  deviceRssi: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  deviceConnectable: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  connectButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  connectingButton: {
    backgroundColor: "#FF9500",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
});
