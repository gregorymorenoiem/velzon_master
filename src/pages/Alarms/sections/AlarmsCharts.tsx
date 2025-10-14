import React from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";

interface AlarmsChartsProps {
  monthlyData: any[];
  distributionData: any[];
}

const AlarmsCharts: React.FC<AlarmsChartsProps> = ({ monthlyData, distributionData }) => {
  // Configuración para el gráfico de líneas (Alarmas por Mes)
  const lineChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#405189"],
    xaxis: {
      categories: monthlyData.map(d => new Date(d.date).getDate()),
      title: { text: "Día del Mes" },
    },
    yaxis: { title: { text: "Nº de Alarmas" } },
  };
  const lineChartSeries = [{ name: "Alarmas", data: monthlyData.map(d => d.alarms) }];

  // Configuración para el gráfico de torta (Distribución por Código)
  const pieChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "pie" },
    labels: distributionData.map(d => d.name),
    legend: { position: 'bottom' }
  };
  const pieChartSeries = distributionData.map(d => d.value);

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Alarmas por Día</h4>
          </CardHeader>
          <CardBody>
            <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={350} />
          </CardBody>
        </Card>
      </Col>
      {/* <Col lg={4}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Distribución por Tipo</h4>
          </CardHeader>
          <CardBody>
            <ReactApexChart options={pieChartOptions} series={pieChartSeries} type="pie" height={350} />
          </CardBody>
        </Card>
      </Col> */}
    </Row>
  );
};

export default AlarmsCharts;