import { PermissionsAndroid, Platform } from "react-native";

export const requestBLEPermissions = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    try {
      // For Android 12+ (API 31+)
      if (Platform.Version >= 31) {
        const bluetoothScanPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: "Bluetooth Scan Permission",
            message: "This app needs access to Bluetooth scanning to find nearby devices",
            buttonPositive: "OK",
          }
        );

        const bluetoothConnectPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: "Bluetooth Connect Permission",
            message: "This app needs access to Bluetooth connection to communicate with devices",
            buttonPositive: "OK",
          }
        );

        const fineLocationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires location access to scan for devices",
            buttonPositive: "OK",
          }
        );

        return (
          bluetoothScanPermission === "granted" &&
          bluetoothConnectPermission === "granted" &&
          fineLocationPermission === "granted"
        );
      } else {
        // For Android < 12
        const locationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires location access",
            buttonPositive: "OK",
          }
        );

        return locationPermission === "granted";
      }
    } catch (error) {
      console.error("Error requesting BLE permissions:", error);
      return false;
    }
  } else if (Platform.OS === "ios") {
    // iOS permissions are handled automatically by the BLE plugin
    return true;
  }

  return false;
};