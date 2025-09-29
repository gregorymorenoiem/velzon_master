// src/common/data/alarmsKpisData.ts

// Datos para las tarjetas KPI de Alarmas, siguiendo el estilo de 'devicesKpis.ts'.
const alarmsKpisData = [
  {
    id: 1,
    label: "Alarmas Totales",
    counter: 189,
    badge: 189,
    percentage: "+5.2 %",
    percentageClass: "danger", // Más alarmas es negativo
    feaIcon: "zap",
    caption: "En el último mes",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 2,
    label: "Severidad Alta",
    counter: 15,
    badge: 15,
    percentage: "-10.1 %",
    percentageClass: "success", // Menos alarmas altas es positivo
    feaIcon: "alert-octagon",
    caption: "Alarma",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 3,
    label: "Severidad Media",
    counter: 62,
    badge: 62,
    percentage: "+8.3 %",
    percentageClass: "danger",
    feaIcon: "alert-triangle",
    caption: "Advertencia",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 4,
    label: "Severidad Baja",
    counter: 112,
    badge: 112,
    percentage: "+2.0 %",
    percentageClass: "success",
    feaIcon: "info",
    caption: "Eventos",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
];

export { alarmsKpisData };