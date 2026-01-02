import { Buffer } from "buffer";

export async function sendCommand(
  device: any,
  serviceUUID: string,
  characteristicUUID: string,
  command: string
) {
  const encoded = Buffer.from(command).toString("base64");

  await device.writeCharacteristicWithResponseForService(
    serviceUUID,
    characteristicUUID,
    encoded
  );
}
