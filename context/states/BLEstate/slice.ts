 
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceReference } from "./BLEManager";

interface BluetoothSate {
  allDevices: DeviceReference[];
  currentColor: string;
  connectedDevice: DeviceReference | null;
  retrievedColor: string | null;
  isScanning: boolean;
  error: string | null;
  scanDuration: number;
  lastScanTime: number | null;
}

const initialState: BluetoothSate = {
  allDevices: [],
  currentColor: "#FFFFFF",
  connectedDevice: null,
  retrievedColor: null,
  isScanning: false,
  error: null,
  scanDuration: 10000, // 10 seconds
  lastScanTime: null,
};

const isDuplicateDevice = (
  devices: DeviceReference[],
  newDevice: DeviceReference
) => devices.findIndex((device) => device.id === newDevice.id) > -1;

export type DeviceAction = PayloadAction<DeviceReference>;

export const startScanning = createAction("BLE/startScanning");
export const stopScanning = createAction("BLE/stopScanning");

const BLESlice = createSlice({
  name: "BLE",
  initialState,
  reducers: {
    setDevices: (state, action: DeviceAction) => {
      if (!isDuplicateDevice(state.allDevices, action.payload)) {
        state.allDevices = [...state.allDevices, action.payload];
      }
    },
    setConnectedDevice: (state, action: DeviceAction) => {
      state.connectedDevice = action.payload;
      state.error = null; // Clear any previous errors
    },
    setRetrievedColor: (state, action: PayloadAction<string>) => {
      state.retrievedColor = action.payload;
    },
    setCurrentColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
    setScanning: (state, action: PayloadAction<boolean>) => {
      state.isScanning = action.payload;
      if (action.payload) {
        state.lastScanTime = Date.now();
      }
    },
    setScanDuration: (state, action: PayloadAction<number>) => {
      state.scanDuration = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearDevices: (state) => {
      state.allDevices = [];
    },
    disconnectDevice: (state) => {
      state.connectedDevice = null;
      state.retrievedColor = null;
    },
  },
});

export const {
  setDevices,
  setConnectedDevice,
  setRetrievedColor,
  setCurrentColor,
  setScanning,
  setError,
  clearDevices,
  disconnectDevice,
  setScanDuration,
} = BLESlice.actions;

export default BLESlice.reducer;
