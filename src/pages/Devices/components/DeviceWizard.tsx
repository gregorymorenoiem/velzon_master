import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Progress,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Input,
  Label,
  Button
} from "reactstrap";
import classnames from "classnames";

interface DeviceWizardProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: (deviceData: any) => void;
}

const DeviceWizard: React.FC<DeviceWizardProps> = ({ isOpen, toggle, onSave }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [progressValue, setProgressValue] = useState(25);
  const [passedSteps, setPassedSteps] = useState([1]);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    mssSerial: "",
    substation: "",
    supplyPoint: "",
    meterBrand: "",
    meterSerial: "",
    status: "online",
    firmware: "",
    installedAt: new Date().toISOString().split('T')[0]
  });

  const toggleTab = (tab: number, progress: number) => {
    if (activeTab !== tab) {
      const modifiedSteps = [...passedSteps, tab];
      
      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
        setProgressValue(progress);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Asistente de Nuevo Dispositivo</h5>
            <button type="button" className="btn-close" onClick={toggle}></button>
          </div>
          <div className="modal-body">
            <Card>
              <CardBody>
                <div className="text-center pt-3 pb-4 mb-1">
                  <h5>Registrar Nuevo Dispositivo</h5>
                </div>

                {/* Barra de progreso */}
                <div className="progress-nav mb-4">
                  <Progress
                    value={progressValue}
                    style={{ height: "1px" }}
                  />
                  <Nav
                    className="nav-pills progress-bar-tab custom-nav"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 1,
                          done: activeTab <= 4 && activeTab >= 0,
                        }, "rounded-pill")}
                        onClick={() => toggleTab(1, 25)}
                      >
                        1
                      </NavLink>
                      <p className="text-center mt-1 fs-12">Información Básica</p>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 2,
                          done: activeTab <= 4 && activeTab > 1,
                        }, "rounded-pill")}
                        onClick={() => toggleTab(2, 50)}
                      >
                        2
                      </NavLink>
                      <p className="text-center mt-1 fs-12">Ubicación</p>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 3,
                          done: activeTab <= 4 && activeTab > 2,
                        }, "rounded-pill")}
                        onClick={() => toggleTab(3, 75)}
                      >
                        3
                      </NavLink>
                      <p className="text-center mt-1 fs-12">Configuración</p>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 4,
                          done: activeTab <= 4 && activeTab > 3,
                        }, "rounded-pill")}
                        onClick={() => toggleTab(4, 100)}
                      >
                        4
                      </NavLink>
                      <p className="text-center mt-1 fs-12">Confirmación</p>
                    </NavItem>
                  </Nav>
                </div>

                <TabContent activeTab={activeTab}>
                  {/* Paso 1: Información Básica */}
                  <TabPane tabId={1}>
                    <div>
                      <div className="mb-4">
                        <h5 className="mb-1">Información Básica del Dispositivo</h5>
                        <p className="text-muted">
                          Complete la información básica del dispositivo
                        </p>
                      </div>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Serial MSS</Label>
                            <Input
                              type="text"
                              name="mssSerial"
                              value={formData.mssSerial}
                              onChange={handleInputChange}
                              placeholder="Ej: MSS-001"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Versión de Firmware</Label>
                            <Input
                              type="text"
                              name="firmware"
                              value={formData.firmware}
                              onChange={handleInputChange}
                              placeholder="Ej: 1.0.0"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="d-flex align-items-start gap-3 mt-4">
                      <button
                        type="button"
                        className="btn btn-success btn-label right ms-auto nexttab"
                        onClick={() => toggleTab(2, 50)}
                      >
                        <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                        Siguiente
                      </button>
                    </div>
                  </TabPane>

                  {/* Paso 2: Ubicación */}
                  <TabPane tabId={2}>
                    <div>
                      <div className="mb-4">
                        <h5 className="mb-1">Ubicación del Dispositivo</h5>
                        <p className="text-muted">
                          Especifique la ubicación del dispositivo
                        </p>
                      </div>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Subestación</Label>
                            <Input
                              type="text"
                              name="substation"
                              value={formData.substation}
                              onChange={handleInputChange}
                              placeholder="Nombre de subestación"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Punto de Suministro</Label>
                            <Input
                              type="text"
                              name="supplyPoint"
                              value={formData.supplyPoint}
                              onChange={handleInputChange}
                              placeholder="Punto de suministro"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="d-flex align-items-start gap-3 mt-4">
                      <button
                        type="button"
                        className="btn btn-light btn-label previestab"
                        onClick={() => toggleTab(1, 25)}
                      >
                        <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                        Anterior
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-label right ms-auto nexttab"
                        onClick={() => toggleTab(3, 75)}
                      >
                        <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                        Siguiente
                      </button>
                    </div>
                  </TabPane>

                  {/* Paso 3: Configuración */}
                  <TabPane tabId={3}>
                    <div>
                      <div className="mb-4">
                        <h5 className="mb-1">Configuración del Medidor</h5>
                        <p className="text-muted">
                          Complete la información del medidor asociado
                        </p>
                      </div>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Marca del Medidor</Label>
                            <Input
                              type="text"
                              name="meterBrand"
                              value={formData.meterBrand}
                              onChange={handleInputChange}
                              placeholder="Ej: Brand A"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Serial del Medidor</Label>
                            <Input
                              type="text"
                              name="meterSerial"
                              value={formData.meterSerial}
                              onChange={handleInputChange}
                              placeholder="Ej: MET-001"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Estado</Label>
                            <Input
                              type="select"
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                            >
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                              <option value="maintenance">Mantenimiento</option>
                            </Input>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Fecha de Instalación</Label>
                            <Input
                              type="date"
                              name="installedAt"
                              value={formData.installedAt}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="d-flex align-items-start gap-3 mt-4">
                      <button
                        type="button"
                        className="btn btn-light btn-label previestab"
                        onClick={() => toggleTab(2, 50)}
                      >
                        <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                        Anterior
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-label right ms-auto nexttab"
                        onClick={() => toggleTab(4, 100)}
                      >
                        <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                        Siguiente
                      </button>
                    </div>
                  </TabPane>

                  {/* Paso 4: Confirmación */}
                  <TabPane tabId={4}>
                    <div>
                      <div className="text-center">
                        <div className="mb-4">
                          <i className="bx bx-party display-4 text-success"></i>
                        </div>
                        <h5>¡Confirmación de Datos!</h5>
                        <p className="text-muted">
                          Revise la información antes de guardar
                        </p>
                        
                        <div className="mt-4 text-start">
                          <h6>Resumen del Dispositivo:</h6>
                          <p><strong>Serial MSS:</strong> {formData.mssSerial}</p>
                          <p><strong>Firmware:</strong> {formData.firmware}</p>
                          <p><strong>Subestación:</strong> {formData.substation}</p>
                          <p><strong>Punto de Suministro:</strong> {formData.supplyPoint}</p>
                          <p><strong>Marca del Medidor:</strong> {formData.meterBrand}</p>
                          <p><strong>Serial del Medidor:</strong> {formData.meterSerial}</p>
                          <p><strong>Estado:</strong> {formData.status}</p>
                          <p><strong>Fecha de Instalación:</strong> {formData.installedAt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3 mt-4">
                      <button
                        type="button"
                        className="btn btn-light btn-label previestab"
                        onClick={() => toggleTab(3, 75)}
                      >
                        <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                        Anterior
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-label right ms-auto"
                        onClick={handleSubmit}
                      >
                        <i className="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>
                        Confirmar y Guardar
                      </button>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceWizard;