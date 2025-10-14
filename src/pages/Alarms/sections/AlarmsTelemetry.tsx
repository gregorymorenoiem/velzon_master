import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { format } from 'date-fns';

interface AlarmsTelemetryProps {
  temperatureData: any[];
  batteryData: any[];
}

const AlarmsTelemetry: React.FC<AlarmsTelemetryProps> = ({ temperatureData, batteryData }) => {
  const baseChartOptions: ApexCharts.ApexOptions = {
    chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (val) => format(new Date(val), 'HH:mm')
      }
    },
  };

  const tempOptions = { ...baseChartOptions, colors: ['#F06548'], yaxis: { title: { text: "Temperatura (°C)" } } };
  const tempSeries = [{ name: "Temp", data: temperatureData.map(d => [new Date(d.ts).getTime(), d.temperature]) }];
  
  const battOptions = { ...baseChartOptions, colors: ['#0AB39C'], yaxis: { title: { text: "Voltaje (V)" } } };
  const battSeries = [{ name: "Voltaje", data: batteryData.map(d => [new Date(d.ts).getTime(), d.voltage]) }];

  return (
    <Row>
      <Col lg={6}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Temperatura (24h)</h4>
          </CardHeader>
          <CardBody>
            <ReactApexChart options={tempOptions} series={tempSeries} type="line" height={180} />
          </CardBody>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Voltaje Batería (24h)</h4>
          </CardHeader>
          <CardBody>
            <ReactApexChart options={battOptions} series={battSeries} type="line" height={180} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AlarmsTelemetry;