// src/common/data/devicesKpis.ts

// NOTA: sin types, mismo estilo que invoiceList.ts
// Campos compatibles con el widget de KPIs (InvoiceList)
const devicesKpis = [
  {
    id: 1,
    label: "Total Devices",
    percentage: "+2.3 %",
    percentageClass: "success", // success | danger
    icon: "ri-arrow-right-up-line",
    counter: 1255,
    badge: "1,255",
    caption: "Devices registered",
    feaIcon: "cpu", // Feather icon
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 2,
    label: "Online",
    percentage: "+1.1 %",
    percentageClass: "success",
    icon: "ri-arrow-right-up-line",
    counter: 1024,
    badge: "1,024",
    caption: "Online now",
    feaIcon: "wifi",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 3,
    label: "Offline",
    percentage: "-0.7 %",
    percentageClass: "danger",
    icon: "ri-arrow-right-down-line",
    counter: 186,
    badge: "186",
    caption: "Disconnected",
    feaIcon: "wifi-off",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 4,
    label: "Active Alarms",
    percentage: "+5.0 %",
    percentageClass: "danger",
    icon: "ri-arrow-right-down-line",
    counter: 37,
    badge: "37",
    caption: "Open alerts",
    feaIcon: "alert-triangle",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
];

export { devicesKpis };
