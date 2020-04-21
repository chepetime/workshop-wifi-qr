/* eslint-disable */

const getWifiScript = ({ssid, encryption, password, hidden}) => {
  return `WIFI:S:${ssid};T:${encryption};P:${password};${hidden ? 'H:true' : ''};`
};

export default { getWifiScript };
