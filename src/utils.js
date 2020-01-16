const getWifiScript = ({ ssid, encryption, password }) => `WIFI:S:${ssid};T:${encryption};P:${password};;`;

export default { getWifiScript };
