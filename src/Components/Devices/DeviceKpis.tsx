import React from "react";
import { Card, CardBody } from "reactstrap";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";

type Kpi = {
  id: number;
  label: string;
  percentage: string;
  percentageClass: "success" | "danger";
  feaIcon: string;
  counter: number;
  prefix?: string;
  suffix?: string;
  badge: string;
  caption: string;
};

const DeviceKpis = ({ widgets }: { widgets: Kpi[] }) => {
  return (
    <>
      {widgets.map((w) => (
        <div className="col-xl-3 col-md-6" key={w.id}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">
                    {w.label}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className={`fs-14 mb-0 text-${w.percentageClass}`}>
                    <i className="ri-arrow-right-up-line fs-13 align-middle" />{" "}
                    {w.percentage}
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <CountUp
                      start={0}
                      end={w.counter}
                      duration={2}
                      prefix={w.prefix}
                      suffix={w.suffix}
                      className="counter-value"
                    />
                  </h4>
                  <span className="badge bg-warning me-1">{w.badge}</span>{" "}
                  <span className="text-muted">{w.caption}</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <FeatherIcon
                      icon={w.feaIcon as any}
                      className="text-success icon-dual-success"
                    />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};

export default DeviceKpis;
