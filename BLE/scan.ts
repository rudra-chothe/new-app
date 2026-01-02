import bleManager from "./manager";

export function scanForDevice(onFound: (device: any) => void) {
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log("Scan error:", error);
      return;
    }

    if (device?.name === "SmartScale") {
      bleManager.stopDeviceScan();
      onFound(device);
    }
  });
}
