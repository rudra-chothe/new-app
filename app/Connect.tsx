import { connectToDevice } from "@/context/states/BLEstate/listner";
import { startScanning, setScanning, setError, clearDevices, setScanDuration } from "@/context/states/BLEstate/slice";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { requestBLEPermissions } from "@/hooks/useBLE";
import Manager from "@/context/states/BLEstate/BLEManager";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Alert, TextInput } from "react-native";

const Connect = () => {
  const nav = useRouter();
  const dispatch = useAppDispatch();
  const discoveredDevices = useAppSelector((state) => state.BLE.allDevices);
  const isScanning = useAppSelector((state) => state.BLE.isScanning);
  const error = useAppSelector((state) => state.BLE.error);
  const scanDuration = useAppSelector((state) => state.BLE.scanDuration);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [scanDurationInput, setScanDurationInput] = useState(scanDuration.toString());

  useEffect(() => {
    const checkBluetoothState = async () => {
      if (permissionsGranted) {
        const isEnabled = await Manager.isBluetoothEnabled();
        setBluetoothEnabled(isEnabled);
      }
    };

    checkBluetoothState();

    // Check Bluetooth state every 2 seconds
    const interval = setInterval(checkBluetoothState, 2000);

    return () => clearInterval(interval);
  }, [permissionsGranted]);

  useEffect(() => {
    const initializeBLE = async () => {
      const granted = await requestBLEPermissions();
      setPermissionsGranted(granted);

      if (granted) {
        // Check Bluetooth state before starting scan
        const isEnabled = await Manager.isBluetoothEnabled();
        if (!isEnabled) {
          dispatch(setError("Bluetooth is powered off. Please enable Bluetooth in your device settings."));
          return;
        }

        dispatch(setScanning(true));
        dispatch(startScanning());
      } else {
        Alert.alert(
          "Permissions Required",
          "Bluetooth permissions are required to scan for devices. Please grant permissions and try again.",
          [{ text: "OK" }]
        );
      }
    };

    initializeBLE();

    // Cleanup function to stop scanning when component unmounts
    return () => {
      dispatch(setScanning(false));
    };
  }, []);

  const onDeviceSelected = async (deviceId: any) => {
    try {
      dispatch(setError(""));
      await dispatch(connectToDevice(deviceId)).unwrap();
      nav.back();
    } catch (error) {
      console.error("Connection failed:", error);
      dispatch(setError(error instanceof Error ? error.message : "Connection failed"));
      Alert.alert("Connection Failed", error instanceof Error ? error.message : "Failed to connect to device");
    }
  };

  const enableBluetooth = () => {
    Alert.alert(
      "Enable Bluetooth",
      "Please go to your device settings and enable Bluetooth, then return to the app.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: () => {
            // Note: React Native doesn't have a direct way to open Bluetooth settings
            // You might need to use a library like react-native-settings or guide users manually
            Alert.alert("Bluetooth Settings", "Please manually open your device settings and enable Bluetooth.");
          }
        }
      ]
    );
  };

  const retryScan = async () => {
    const isEnabled = await Manager.isBluetoothEnabled();
    if (isEnabled) {
      dispatch(clearDevices());
      dispatch(setScanning(true));
      dispatch(setError(""));
      dispatch(startScanning());
    } else {
      dispatch(setError("Bluetooth is still powered off. Please enable Bluetooth first."));
    }
  };

  const startScan = () => {
    if (permissionsGranted && bluetoothEnabled) {
      // Update scan duration if changed
      const duration = parseInt(scanDurationInput);
      if (!isNaN(duration) && duration > 0) {
        dispatch(setScanDuration(duration));
      }

      dispatch(clearDevices());
      dispatch(setError(""));
      dispatch(startScanning());
    }
  };

  const stopScan = () => {
    dispatch(setScanning(false));
    Manager.stopScanningForperipherals();
  };

  if (!permissionsGranted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Bluetooth permissions are required to use this feature.
        </Text>
        <Pressable
          style={styles.retryButton}
          onPress={async () => {
            const granted = await requestBLEPermissions();
            setPermissionsGranted(granted);
          }}
        >
          <Text style={styles.retryButtonText}>Request Permissions</Text>
        </Pressable>
      </View>
    );
  }

  if (!bluetoothEnabled) {
    return (
      <View style={styles.container}>
        <View style={styles.bluetoothStatus}>
          <Text style={styles.bluetoothIcon}>📶</Text>
          <Text style={styles.bluetoothTitle}>Bluetooth is Off</Text>
          <Text style={styles.bluetoothMessage}>
            Bluetooth must be enabled to scan for BLE devices.
          </Text>
        </View>

        <Pressable style={styles.enableBluetoothButton} onPress={enableBluetooth}>
          <Text style={styles.enableBluetoothText}>Enable Bluetooth</Text>
        </Pressable>

        <Pressable style={styles.retryButton} onPress={retryScan}>
          <Text style={styles.retryButtonText}>Check Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BLE Device Scanner</Text>
        <View style={styles.scanControls}>
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Duration (ms):</Text>
            <TextInput
              style={styles.durationInput}
              value={scanDurationInput}
              onChangeText={setScanDurationInput}
              keyboardType="numeric"
              placeholder="10000"
              editable={!isScanning}
            />
          </View>
          <Pressable
            style={[styles.scanButton, isScanning && styles.scanningButton]}
            onPress={isScanning ? stopScan : startScan}
          >
            <Text style={styles.scanButtonText}>
              {isScanning ? "Stop Scan" : "Start Scan"}
            </Text>
          </Pressable>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        style={styles.list}
        data={discoveredDevices}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => {
          const selectDevice = () => {
            onDeviceSelected(item);
          };

          const deviceName = item.name || item.localName || "Unknown Device";
          const rssi = item.rssi ? `${item.rssi} dBm` : "N/A";
          const connectable = item.isConnectable ? "Connectable" : "Not Connectable";

          return (
            <Pressable style={styles.deviceBtn} onPress={selectDevice}>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceTxt}>{deviceName}</Text>
                <Text style={styles.deviceId}>ID: {item.id}</Text>
                <View style={styles.deviceDetails}>
                  <Text style={styles.deviceRssi}>Signal: {rssi}</Text>
                  <Text style={styles.deviceConnectable}>{connectable}</Text>
                </View>
                {item.serviceUUIDs && item.serviceUUIDs.length > 0 && (
                  <Text style={styles.deviceServices}>
                    Services: {item.serviceUUIDs.length}
                  </Text>
                )}
              </View>
              <View style={styles.connectIcon}>
                <Text style={styles.connectIconText}>→</Text>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isScanning ? "Scanning for BLE devices..." : "No devices found. Tap 'Start Scan' to search for nearby BLE devices."}
            </Text>
            {isScanning && (
              <View style={styles.scanningIndicator}>
                <Text style={styles.scanningText}>🔍 Scanning...</Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default Connect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  scanControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    minWidth: 80,
    backgroundColor: "#f9f9f9",
  },
  scanButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scanningButton: {
    backgroundColor: "#FF3B30",
  },
  scanButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    margin: 20,
    color: "#666",
  },
  bluetoothStatus: {
    alignItems: "center",
    marginBottom: 30,
  },
  bluetoothIcon: {
    fontSize: 60,
    marginBottom: 16,
    opacity: 0.7,
  },
  bluetoothTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  bluetoothMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  enableBluetoothButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  enableBluetoothText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 20,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
  list: {
    flex: 1,
    marginTop: 8,
  },
  deviceBtn: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  deviceInfo: {
    flex: 1,
  },
  deviceTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "monospace",
  },
  deviceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  deviceRssi: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  deviceConnectable: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "500",
  },
  deviceServices: {
    fontSize: 12,
    color: "#666",
  },
  connectIcon: {
    marginLeft: 12,
  },
  connectIconText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  scanningIndicator: {
    alignItems: "center",
  },
  scanningText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "500",
  },
});
