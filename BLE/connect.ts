export async function connectToDevice(device: any) {
  const connected = await device.connect();
  await connected.discoverAllServicesAndCharacteristics();
  return connected;
}
