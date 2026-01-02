import { BleManager, Device, Characteristic, Service } from "react-native-ble-plx";

export interface DeviceReference {
  id: string;
  name?: string | null;
  rssi?: number;
  manufacturerData?: any;
  serviceUUIDs?: string[];
  isConnectable?: boolean;
  localName?: string;
}

export interface BLECharacteristic {
  uuid: string;
  value?: string;
}

export interface BLEService {
  uuid: string;
  characteristics: BLECharacteristic[];
}

class BLEManager {
  bleManager: BleManager | null = null;
  device: Device | null = null;
  isListening: boolean = false;

  constructor() {
    try {
      // Try to initialize BleManager, but don't fail if it doesn't work
      this.bleManager = new BleManager();
      console.log("BleManager initialized successfully");
    } catch (error) {
      console.warn("BleManager initialization failed, BLE features will be disabled:", error);
      this.bleManager = null;
    }
  }

  isAvailable(): boolean {
    return this.bleManager !== null;
  }

  async isBluetoothEnabled(): Promise<boolean> {
    if (!this.bleManager) {
      return false;
    }

    try {
      const state = await this.bleManager.state();
      return state === 'PoweredOn';
    } catch (error) {
      console.warn("Error checking Bluetooth state:", error);
      return false;
    }
  }

  async scanForPeripherals(
    onDeviceFound: (deviceSummary: DeviceReference) => void,
    options: {
      timeout?: number;
      scanMode?: 'LowPower' | 'Balanced' | 'LowLatency';
      allowDuplicates?: boolean;
    } = {}
  ): Promise<void> {
    if (!this.bleManager) {
      throw new Error("BLE not available");
    }

    // Check if Bluetooth is enabled first
    const isEnabled = await this.isBluetoothEnabled();
    if (!isEnabled) {
      throw new Error("Bluetooth is powered off. Please enable Bluetooth to scan for devices.");
    }

    const {
      timeout = 10000, // 10 seconds default
      scanMode = 'Balanced',
      allowDuplicates = false
    } = options;

    return new Promise((resolve, reject) => {
      let scanTimeout: ReturnType<typeof setTimeout>;

      const stopScan = () => {
        if (scanTimeout) clearTimeout(scanTimeout);
        this.stopScanningForperipherals();
        resolve();
      };

      // Set timeout for scanning
      scanTimeout = setTimeout(() => {
        console.log("Scan timeout reached, stopping scan");
        stopScan();
      }, timeout);

      this.bleManager!.startDeviceScan(
        null, // null for all services, or specify service UUIDs
        {
          allowDuplicates,
        },
        (error, scannedDevice) => {
          if (error) {
            console.warn("Error while scanning for devices:", error);
            if (scanTimeout) clearTimeout(scanTimeout);
            reject(error);
            return;
          }

          if (scannedDevice) {
            const deviceInfo: DeviceReference = {
              id: scannedDevice.id,
              name: scannedDevice.name || undefined,
              localName: scannedDevice.localName || undefined,
              rssi: scannedDevice.rssi || undefined,
              manufacturerData: scannedDevice.manufacturerData,
              serviceUUIDs: scannedDevice.serviceUUIDs || undefined,
              isConnectable: scannedDevice.isConnectable || undefined,
            };

            onDeviceFound(deviceInfo);
          }
        }
      );
    });
  }

  stopScanningForperipherals() {
    if (!this.bleManager) {
      return;
    }
    this.bleManager.stopDeviceScan();
  }

  async connectToperipheral(identifier: string): Promise<Device> {
    if (!this.bleManager) {
      throw new Error("BLE not available");
    }
    this.device = await this.bleManager.connectToDevice(identifier);
    await this.device.discoverAllServicesAndCharacteristics();
    return this.device;
  }

  disconnectFromPeripheral() {
    if (this.device) {
      this.bleManager?.cancelDeviceConnection(this.device.id);
      this.device = null;
    }
  }

  async readCharacteristic(serviceUUID: string, characteristicUUID: string): Promise<string | null> {
    if (!this.device) {
      throw new Error("No device connected");
    }

    const characteristic = await this.device.readCharacteristicForService(serviceUUID, characteristicUUID);
    return characteristic.value ? Buffer.from(characteristic.value, 'base64').toString('hex') : null;
  }

  async writeCharacteristic(serviceUUID: string, characteristicUUID: string, value: string): Promise<void> {
    if (!this.device) {
      throw new Error("No device connected");
    }

    const data = Buffer.from(value, 'hex').toString('base64');
    await this.device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, data);
  }

  async subscribeToCharacteristic(
    serviceUUID: string,
    characteristicUUID: string,
    onValueChange: (value: string) => void
  ): Promise<void> {
    if (!this.device) {
      throw new Error("No device connected");
    }

    this.device.monitorCharacteristicForService(serviceUUID, characteristicUUID, (error, characteristic) => {
      if (error) {
        console.error("Error monitoring characteristic:", error);
        return;
      }

      if (characteristic?.value) {
        const value = Buffer.from(characteristic.value, 'base64').toString('hex');
        onValueChange(value);
      }
    });
  }

  async getServicesAndCharacteristics(): Promise<BLEService[]> {
    if (!this.device) {
      throw new Error("No device connected");
    }

    const services = await this.device.services();
    const servicesWithCharacteristics: BLEService[] = [];

    for (const service of services) {
      const characteristics = await service.characteristics();
      servicesWithCharacteristics.push({
        uuid: service.uuid,
        characteristics: characteristics.map(char => ({
          uuid: char.uuid,
          value: char.value ? Buffer.from(char.value, 'base64').toString('hex') : undefined
        }))
      });
    }

    return servicesWithCharacteristics;
  }
}

const Manager = new BLEManager();

export default Manager;
