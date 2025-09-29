// src/common/data/devicesMockData.ts

// Datos mock para la tabla de dispositivos
const devicesMockData = [
  {
    id: 1,
    mssSerial: "MSS-001",
    substation: "Subestación Norte",
    supplyPoint: "Punto 01",
    meterBrand: "Brand A",
    meterSerial: "MET-001",
    status: "online",
    lastUpdate: "2025-09-15T10:30:00Z",
    lat: 18.4961,
    lng: -69.9412
  },
  {
    id: 2,
    mssSerial: "MSS-002",
    substation: "Subestación Sur",
    supplyPoint: "Punto 02",
    meterBrand: "Brand B",
    meterSerial: "MET-002",
    status: "offline",
    lastUpdate: "2025-09-14T15:45:00Z",
    lat: 18.4761,
    lng: -69.9212
  },
  {
    id: 3,
    mssSerial: "MSS-003",
    substation: "Subestación Este",
    supplyPoint: "Punto 03",
    meterBrand: "Brand C",
    meterSerial: "MET-003",
    status: "maintenance",
    lastUpdate: "2025-09-15T08:15:00Z",
    lat: 18.4861,
    lng: -69.9112
  },
  {
    id: 4,
    mssSerial: "MSS-004",
    substation: "Subestación Oeste",
    supplyPoint: "Punto 04",
    meterBrand: "Brand A",
    meterSerial: "MET-004",
    status: "online",
    lastUpdate: "2025-09-15T11:20:00Z",
    lat: 18.4661,
    lng: -69.9512
  },
  {
    id: 5,
    mssSerial: "MSS-005",
    substation: "Subestación Central",
    supplyPoint: "Punto 05",
    meterBrand: "Brand D",
    meterSerial: "MET-005",
    status: "online",
    lastUpdate: "2025-09-15T09:45:00Z",
    lat: 18.4895,
    lng: -69.9340
  }
];

export { devicesMockData };