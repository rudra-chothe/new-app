import { sendCommand } from "@/BLE/commands";
import { connectToDevice } from "@/BLE/connect";
import { scanForDevice } from "@/BLE/scan";
import React, { createContext, useContext, useState } from "react";

const BleContext = createContext<any>(null);

export const BleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [device, setDevice] = useState<any>(null);

  const connect = async () => {
    scanForDevice(async (found) => {
      const connected = await connectToDevice(found);
      setDevice(connected);

      connected.onDisconnected(() => {
        console.log("BLE disconnected, reconnecting...");
        connect();
      });
    });
  };

  const send = (cmd: string) => {
    if (!device) return;
    sendCommand(device, "SERVICE_UUID", "CHARACTERISTIC_UUID", cmd);
  };

  return (
    <BleContext.Provider value={{ connect, send, device }}>
      {children}
    </BleContext.Provider>
  );
};

export const useBle = () => useContext(BleContext);
