// src/pages/Devices/sections/DevicesChart.tsx

import React from "react";
import { Card, CardBody, CardHeader, Col, Input, Label, Row, Spinner } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DevicesChartProps {
  title?: string;
  data: any[];
  loading: boolean;
  availableYears: number[];
  yearFilter: string;
  monthFilter: string;
  onFilterChange: (filterType: 'year' | 'month', value: string) => void;
}

const DevicesChart: React.FC<DevicesChartProps> = ({
  title = "Dispositivos Online por Día",
  data,
  loading,
  availableYears,
  yearFilter,
  monthFilter,
  onFilterChange
}) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: format(new Date(2000, i, 1), "MMMM", { locale: es }),
  }));

  const series = [
    {
      name: "Online",
      data: data.map(item => item.online),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#405189"], // Color principal de Velzon
    xaxis: {
      categories: data.map(item => new Date(item.date).getDate()),
      title: {
        text: "Día del Mes",
      },
    },
    yaxis: {
      title: {
        text: "Nº de Dispositivos",
      },
    },
    tooltip: {
      x: {
        formatter: (val: number) => `Día ${val}`,
      },
      y: {
        formatter: (val: number) => `${val} dispositivos`,
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">{title}</h4>
        <div className="d-flex gap-3">
          <div className="d-flex align-items-center">
            <Label htmlFor="chartYearFilter" className="me-2 mb-0">Año</Label>
            <Input
              type="select"
              id="chartYearFilter"
              bsSize="sm"
              value={yearFilter}
              onChange={(e) => onFilterChange('year', e.target.value)}
              style={{ width: "100px" }}
            >
              {availableYears.map(year => (
                <option key={year} value={String(year)}>{year}</option>
              ))}
            </Input>
          </div>
          <div className="d-flex align-items-center">
            <Label htmlFor="chartMonthFilter" className="me-2 mb-0">Mes</Label>
            <Input
              type="select"
              id="chartMonthFilter"
              bsSize="sm"
              value={monthFilter}
              onChange={(e) => onFilterChange('month', e.target.value)}
              style={{ width: "120px" }}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </Input>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "350px" }}>
            <Spinner color="primary">Cargando...</Spinner>
          </div>
        ) : (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={350}
            className="apex-charts"
          />
        )}
      </CardBody>
    </Card>
  );
};

export default DevicesChart;