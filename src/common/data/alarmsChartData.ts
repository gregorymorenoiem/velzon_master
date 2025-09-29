// src/common/data/alarmsChartData.ts

// Datos simulados y estáticos para todos los gráficos de la página de alarmas.

const alarmsChartData = {
  // Datos para el gráfico lineal de alarmas por día.
  monthlyStats: [
    { "date": "2025-09-01", "alarms": 5 },
    { "date": "2025-09-02", "alarms": 8 },
    { "date": "2025-09-03", "alarms": 4 },
    { "date": "2025-09-04", "alarms": 10 },
    { "date": "2025-09-05", "alarms": 7 },
    { "date": "2025-09-06", "alarms": 6 },
    { "date": "2025-09-07", "alarms": 9 },
    { "date": "2025-09-08", "alarms": 11 },
    { "date": "2025-09-09", "alarms": 5 },
    { "date": "2025-09-10", "alarms": 3 },
    { "date": "2025-09-11", "alarms": 8 },
    { "date": "2025-09-12", "alarms": 12 },
    { "date": "2025-09-13", "alarms": 7 },
    { "date": "2025-09-14", "alarms": 6 },
    { "date": "2025-09-15", "alarms": 10 },
    { "date": "2025-09-16", "alarms": 8 },
    { "date": "2025-09-17", "alarms": 5 },
    { "date": "2025-09-18", "alarms": 9 },
    { "date": "2025-09-19", "alarms": 11 },
    { "date": "2025-09-20", "alarms": 6 },
    { "date": "2025-09-21", "alarms": 4 },
    { "date": "2025-09-22", "alarms": 8 },
    { "date": "2025-09-23", "alarms": 13 },
    { "date": "2025-09-24", "alarms": 7 },
    { "date": "2025-09-25", "alarms": 9 },
    { "date": "2025-09-26", "alarms": 10 },
    { "date": "2025-09-27", "alarms": 8 },
    { "date": "2025-09-28", "alarms": 12 },
    { "date": "2025-09-29", "alarms": 9 },
    { "date": "2025-09-30", "alarms": 7 }
  ],

  // Datos para el gráfico de torta (pie) de distribución de alarmas.
  codeDistribution: [
    { "name": "OVERVOLTAGE", "value": 35.5 },
    { "name": "TEMP_HIGH", "value": 25.0 },
    { "name": "PHASE_LOSS", "value": 15.5 },
    { "name": "COMM_FAIL", "value": 24.0 }
  ],

  // Datos de telemetría para el gráfico de temperatura (últimas 24h).
  temperatureSeries: [
    { "ts": "2025-09-28T08:00:00Z", "temperature": 35.2 },
    { "ts": "2025-09-28T10:00:00Z", "temperature": 38.1 },
    { "ts": "2025-09-28T12:00:00Z", "temperature": 41.5 },
    { "ts": "2025-09-28T14:00:00Z", "temperature": 43.8 },
    { "ts": "2025-09-28T16:00:00Z", "temperature": 42.1 },
    { "ts": "2025-09-28T18:00:00Z", "temperature": 39.7 },
    { "ts": "2025-09-28T20:00:00Z", "temperature": 36.4 },
    { "ts": "2025-09-28T22:00:00Z", "temperature": 34.9 },
    { "ts": "2025-09-29T00:00:00Z", "temperature": 33.5 },
    { "ts": "2025-09-29T02:00:00Z", "temperature": 32.8 },
    { "ts": "2025-09-29T04:00:00Z", "temperature": 32.1 },
    { "ts": "2025-09-29T06:00:00Z", "temperature": 33.0 }
  ],

  // Datos de telemetría para el gráfico de voltaje de batería (últimas 24h).
  batterySeries: [
    { "ts": "2025-09-28T08:00:00Z", "voltage": 52.5 },
    { "ts": "2025-09-28T10:00:00Z", "voltage": 52.3 },
    { "ts": "2025-09-28T12:00:00Z", "voltage": 52.1 },
    { "ts": "2025-09-28T14:00:00Z", "voltage": 51.8 },
    { "ts": "2025-09-28T16:00:00Z", "voltage": 51.6 },
    { "ts": "2025-09-28T18:00:00Z", "voltage": 51.3 },
    { "ts": "2025-09-28T20:00:00Z", "voltage": 51.1 },
    { "ts": "2025-09-28T22:00:00Z", "voltage": 50.8 },
    { "ts": "2025-09-29T00:00:00Z", "voltage": 50.5 },
    { "ts": "2025-09-29T02:00:00Z", "voltage": 50.2 },
    { "ts": "2025-09-29T04:00:00Z", "voltage": 49.9 },
    { "ts": "2025-09-29T06:00:00Z", "voltage": 49.6 }
  ]
};

export { alarmsChartData };