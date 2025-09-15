// src/pages/Devices/sections/DevicesKpis.tsx
import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";

interface DevicesKpisProps {
  items: any[]; // siguiendo el estilo del template (sin tipos estrictos)
}

const DevicesKpis: React.FC<DevicesKpisProps> = ({ items }) => {
  return (
    <Row>
      {(items || []).map((item: any, idx: number) => (
        <Col xl={3} md={6} key={item.id ?? idx}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">
                    {item.label || item.title}
                  </p>
                </div>
                {(item.percentage || item.delta) && (
                  <div className="flex-shrink-0">
                    <h5
                      className={
                        "fs-14 mb-0 text-" +
                        (item.percentageClass ||
                          (Number(item.delta) >= 0 ? "success" : "danger"))
                      }
                    >
                      <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                      {item.percentage ??
                        (Number(item.delta) >= 0
                          ? `+${item.delta}%`
                          : `${item.delta}%`)}
                    </h5>
                  </div>
                )}
              </div>

              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <CountUp
                      start={0}
                      end={Number(item.counter ?? item.value ?? 0)}
                      duration={4}
                      className="counter-value"
                      decimals={item.decimals ?? 0}
                      prefix={item.prefix || ""}
                      suffix={item.suffix || ""}
                    />
                  </h4>
                  {/* {item.badge && (
                    <span className="badge bg-warning me-1">{item.badge}</span>
                  )}{" "} */}
                  {item.caption && (
                    <span className="text-muted">{item.caption}</span>
                  )}
                </div>

                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <FeatherIcon
                      icon={item.feaIcon || item.icon || "cpu"}
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

export default DevicesKpis;
