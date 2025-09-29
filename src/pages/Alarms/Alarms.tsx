import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"; // <-- PASO 1: IMPORTAR HOOK
import { Container, Row, Col } from "reactstrap";
import { getAlarmsKpis, getAlarmsList, getAlarmsChartData } from "../../slices/alarm/thunk";
import { AlarmsKpis, AlarmsTable, AlarmsCharts, AlarmsTelemetry, AlarmsControls } from "./sections";
import { devicesMockData } from "../../common/data"; // <-- PASO 1: IMPORTAR DATOS DE DISPOSITIVOS

const AlarmsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [searchParams] = useSearchParams(); // <-- PASO 2: INICIALIZAR HOOK

  // --- NUEVO: Estado para el título y el dispositivo actual ---
  const [pageTitle, setPageTitle] = useState("Dashboard de Alarmas");
  const [currentDevice, setCurrentDevice] = useState<any | null>(null);

  const { kpis, alarmsList, chartData } = useSelector((state: any) => ({
    kpis: state.Alarms.kpis,
    alarmsList: state.Alarms.alarmsList,
    chartData: state.Alarms.chartData,
  }));

  const [yearFilter, setYearFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [localAlarms, setLocalAlarms] = useState<any[]>([]);

  useEffect(() => {
    // --- PASO 2 Y 3: LEER URL Y BUSCAR DISPOSITIVO ---
    const deviceId = searchParams.get("deviceId");
    if (deviceId) {
      const device = devicesMockData.find(d => d.id === parseInt(deviceId, 10));
      if (device) {
        setCurrentDevice(device);
        setPageTitle(`Alarmas del Dispositivo: ${device.mssSerial}`);
      } else {
        setPageTitle(`Alarmas - Dispositivo no encontrado (ID: ${deviceId})`);
      }
    }
    
    dispatch(getAlarmsKpis());
    dispatch(getAlarmsList());
    dispatch(getAlarmsChartData());
  }, [dispatch, searchParams]);

  useEffect(() => {
    // Si hay un dispositivo, filtramos las alarmas para mostrar solo las de su subestación
    if (currentDevice && alarmsList.length > 0) {
        const filtered = alarmsList.filter((alarm: { substation: any; }) => alarm.substation === currentDevice.substation);
        setLocalAlarms(filtered);
    } else {
        setLocalAlarms(alarmsList);
    }
  }, [alarmsList, currentDevice]);

  const availableYears = useMemo(() => {
    if (!localAlarms || localAlarms.length === 0) return [new Date().getFullYear()];
    const years = localAlarms.map(d => new Date(d.detected).getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [localAlarms]);

  const filteredAlarms = useMemo(() => {
    if (!localAlarms) return [];
    return localAlarms.filter(alarm => {
      const alarmDate = new Date(alarm.detected);
      const yearMatch = yearFilter === 'all' || alarmDate.getFullYear() === parseInt(yearFilter);
      const monthMatch = monthFilter === 'all' || (alarmDate.getMonth() + 1) === parseInt(monthFilter);
      return yearMatch && monthMatch;
    });
  }, [localAlarms, yearFilter, monthFilter]);

  const handleFilterChange = (filterType: 'year' | 'month', value: string) => {
    if (filterType === 'year') setYearFilter(value);
    if (filterType === 'month') setMonthFilter(value);
  };

  const handleClearFilters = () => {
    setYearFilter("all");
    setMonthFilter("all");
  };

  const handleAcknowledgeAlarm = (alarmId: number) => {
    setLocalAlarms(prev =>
      prev.map(alarm =>
        alarm.id === alarmId
          ? { ...alarm, status: 'cleared', cleared: new Date().toISOString() }
          : alarm
      )
    );
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* --- PASO 3: MOSTRAR TÍTULO DINÁMICO --- */}
        <h4 className="mb-4">{pageTitle}</h4>
        
        <AlarmsKpis items={kpis} />
        
        <Row className="mt-4">
          <Col lg={12}>
            <AlarmsTable
              alarms={filteredAlarms}
              onAcknowledge={handleAcknowledgeAlarm}
              availableYears={availableYears}
              yearFilter={yearFilter}
              monthFilter={monthFilter}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </Col>
        </Row>

        <Row className="mt-4">
            <AlarmsCharts 
                monthlyData={chartData.monthlyStats} 
                distributionData={chartData.codeDistribution} 
            />
        </Row>
        
    <Row className="mt-4">
          <Col lg={8}>
              <AlarmsTelemetry 
                  temperatureData={chartData.temperatureSeries}
                  batteryData={chartData.batterySeries}
              />
          </Col>
          {/* MODIFICACIÓN AQUÍ: Se añade la clase d-flex */}
          <Col lg={4} className="d-flex">
              <AlarmsControls />
          </Col>
      </Row>
      </Container>
    </div>
  );
};

export default AlarmsPage;