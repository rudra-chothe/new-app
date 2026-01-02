import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import Manager, { DeviceReference } from "./BLEManager";
import { setConnectedDevice, setDevices, startScanning, setRetrievedColor, setScanning, setError, clearDevices, setScanDuration } from "./slice";

export const BLEMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  "BLEThunk/connectToDevice",
  async (ref: DeviceReference, thunkAPI) => {
    if (!Manager.isAvailable()) {
      throw new Error("BLE not available on this device");
    }
    if (ref.id) {
      await Manager.connectToperipheral(ref.id);
      // set connected device
      thunkAPI.dispatch(setConnectedDevice(ref));
      Manager.stopScanningForperipherals();
    }
  }
);

export const readColorFromDevice = createAsyncThunk(
  "BLEThunk/readColorFromDevice",
  async (_, thunkAPI) => {
    try {
      // Common BLE color service UUIDs - adjust based on your device
      const serviceUUID = "0000180f-0000-1000-8000-00805f9b34fb"; // Battery service as example
      const characteristicUUID = "00002a19-0000-1000-8000-00805f9b34fb"; // Battery level

      const value = await Manager.readCharacteristic(serviceUUID, characteristicUUID);
      if (value) {
        // Convert hex value to color (example conversion)
        const colorValue = parseInt(value, 16);
        const color = `#${colorValue.toString(16).padStart(6, '0')}`;
        thunkAPI.dispatch(setRetrievedColor(color));
      }
    } catch (error) {
      console.error("Error reading from device:", error);
      throw error;
    }
  }
);

export const sendColorData = createAsyncThunk(
  "BLEThunk/sendColorData",
  async (colorHex: string, thunkAPI) => {
    try {
      // Remove # from hex color and convert to hex value
      const colorValue = colorHex.replace('#', '');
      const hexValue = parseInt(colorValue, 16).toString(16).padStart(2, '0');

      // Common BLE color service UUIDs - adjust based on your device
      const serviceUUID = "0000180f-0000-1000-8000-00805f9b34fb"; // Battery service as example
      const characteristicUUID = "00002a19-0000-1000-8000-00805f9b34fb"; // Battery level

      await Manager.writeCharacteristic(serviceUUID, characteristicUUID, hexValue);
    } catch (error) {
      console.error("Error writing to device:", error);
      throw error;
    }
  }
);

export const startListening = createAsyncThunk(
  "BLEThunk/startListening",
  async (_, thunkAPI) => {
    try {
      // Common BLE color service UUIDs - adjust based on your device
      const serviceUUID = "0000180f-0000-1000-8000-00805f9b34fb"; // Battery service as example
      const characteristicUUID = "00002a19-0000-1000-8000-00805f9b34fb"; // Battery level

      await Manager.subscribeToCharacteristic(serviceUUID, characteristicUUID, (value) => {
        const colorValue = parseInt(value, 16);
        const color = `#${colorValue.toString(16).padStart(6, '0')}`;
        thunkAPI.dispatch(setRetrievedColor(color));
      });
    } catch (error) {
      console.error("Error subscribing to characteristic:", error);
      throw error;
    }
  }
);

BLEMiddleware.startListening({
  actionCreator: startScanning,
  effect: async (_, listnerApi) => {
    if (!Manager.isAvailable()) {
      console.warn("BLE not available, skipping scan");
      listnerApi.dispatch(setError("BLE not available on this device"));
      return;
    }

    try {
      // Check Bluetooth state before scanning
      const isEnabled = await Manager.isBluetoothEnabled();
      if (!isEnabled) {
        listnerApi.dispatch(setError("Bluetooth is powered off. Please enable Bluetooth in your device settings."));
        return;
      }

      console.log("Starting BLE device scan...");
      listnerApi.dispatch(setScanning(true));
      listnerApi.dispatch(setError(""));
      listnerApi.dispatch(clearDevices()); // Clear previous results

      // Get scan duration from state
      const state = listnerApi.getState() as any;
      const scanDuration = state.BLE?.scanDuration || 10000;

      await Manager.scanForPeripherals(
        (device) => {
          // Add all discovered devices (you can add filtering logic here if needed)
          console.log("Found device:", device.name || device.localName || "Unknown", device.id);
          listnerApi.dispatch(setDevices(device));
        },
        {
          timeout: scanDuration,
          allowDuplicates: false,
          scanMode: 'Balanced'
        }
      );

      console.log("Scan completed");
      listnerApi.dispatch(setScanning(false));

    } catch (error) {
      console.error("Failed to start scanning:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to start scanning";
      listnerApi.dispatch(setError(errorMessage));
      listnerApi.dispatch(setScanning(false));
    }
  },
});
