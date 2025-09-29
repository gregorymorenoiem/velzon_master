import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";

interface AlarmsKpisProps {
  items: any[];
}

const AlarmsKpis: React.FC<AlarmsKpisProps> = ({ items }) => {
  return (
    <Row>
      {(items || []).map((item: any) => (
        <Col xl={3} md={6} key={item.id}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {item.label}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className={`fs-14 mb-0 text-${item.percentageClass}`}>
                    <i className={`ri-arrow-${item.percentage.startsWith('-') ? 'down' : 'up'}-line fs-13 align-middle`}></i>
                    {item.percentage}
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <CountUp
                      start={0}
                      end={item.counter}
                      duration={2.5}
                      className="counter-value"
                      decimals={item.decimals}
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  </h4>
                  {/* LÓGICA PARA RENDERIZAR EL BADGE AÑADIDA AQUÍ */}
                  <div className="d-flex align-items-center gap-2">
                    {item.badge && (
                      <span className="badge bg-warning me-1">{item.badge}</span>
                    )}
                    <span className="text-muted">{item.caption}</span>
                  </div>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <FeatherIcon
                      icon={item.feaIcon}
                      className="text-success icon-dual-success"
                    />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AlarmsKpis;