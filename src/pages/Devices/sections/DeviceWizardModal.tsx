import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Progress,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Label,
  Input,
  Button,
  FormFeedback, // Para validación
} from "reactstrap";
import classnames from "classnames";

// Define la estructura de datos que manejará el formulario
const initialFormData = {
  // Paso 1: Subestación
  subName: "",
  subLat: "",
  subLng: "",
  // Paso 2: Punto de Medición
  spKind: "Compra",
  spCode: "",
  spName: "",
  spLat: "",
  spLng: "",
  spStatus: "Active",
  spUnr: "",
  // Paso 3: Medidor
  meterBrand: "",
  meterSerial: "",
  meterDate: "",
  meterBrandBackup: "",
  meterSerialBackup: "",
  meterDateBackup: "",
  // Paso 4: Dispositivo
  mssSerial: "",
  firmware: "",
  devDate: new Date().toISOString().split("T")[0],
  devStatus: "online",
};


interface DeviceWizardModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: (deviceData: any) => void;
  deviceToEdit?: any | null; // El objeto debe contener todos los campos del formulario
}

const DeviceWizardModal: React.FC<DeviceWizardModalProps> = ({ isOpen, toggle, onSave, deviceToEdit }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [progressValue, setProgressValue] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const isEditMode = !!deviceToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && deviceToEdit) {
        // En modo edición, se asume que 'deviceToEdit' tiene una estructura aplanada
        // que coincide con 'initialFormData'. La página principal es responsable de prepararlo.
        setFormData(deviceToEdit);
        setPassedSteps([1, 2, 3, 4]);
      } else {
        setFormData(initialFormData);
        setPassedSteps([1]);
      }
      setActiveTab(1);
      setProgressValue(0);
    }
  }, [isOpen, deviceToEdit, isEditMode]);

  const toggleTab = (tab: number) => {
    if (activeTab !== tab) {
      if (passedSteps.includes(tab) || tab === activeTab + 1) {
        const newPassedSteps = [...passedSteps];
        if (!newPassedSteps.includes(tab)) {
          newPassedSteps.push(tab);
        }
        setPassedSteps(newPassedSteps);
        setActiveTab(tab);
        setProgressValue((tab - 1) * (100 / 3));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Aquí puedes añadir validaciones antes de guardar
    onSave(formData);
    toggle();
  };

  const steps = ["Subestación", "Punto", "Medidor", "Dispositivo"];

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg" scrollable>
      <ModalHeader toggle={toggle} className="pb-0 border-0">
        <h5 className="modal-title">
          {isEditMode ? `Editando Dispositivo: ${deviceToEdit?.mssSerial || ''}` : "Asistente para Nuevo Dispositivo"}
        </h5>
      </ModalHeader>
      <ModalBody className="p-4 pt-2">
        <div className="progress-nav mb-4">
          <Progress value={progressValue} style={{ height: "1px" }} />
          <Nav className="nav-pills progress-bar-tab custom-nav" role="tablist">
            {steps.map((step, index) => {
              const tabIndex = index + 1;
              return (
                <NavItem key={tabIndex}>
                  <NavLink
                    tag="button"
                    className={classnames({ active: activeTab === tabIndex, done: activeTab > tabIndex }, "rounded-pill")}
                    onClick={() => toggleTab(tabIndex)}
                    disabled={!passedSteps.includes(tabIndex)}
                  >
                    {tabIndex}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </div>

        <TabContent activeTab={activeTab}>
          {/* PASO 1: Subestación */}
          <TabPane tabId={1}>
            <div className="mb-4">
              <h5 className="mb-1">Paso 1: Datos de la Subestación</h5>
              <p className="text-muted">Información de la ubicación principal.</p>
            </div>
            <Row>
              <Col lg={12}><Label htmlFor="subName">Nombre</Label><Input id="subName" name="subName" value={formData.subName} onChange={handleInputChange} placeholder="Subestación Principal" /></Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}><Label htmlFor="subLat">Latitud</Label><Input id="subLat" name="subLat" value={formData.subLat} onChange={handleInputChange} placeholder="18.4861" /></Col>
              <Col lg={6}><Label htmlFor="subLng">Longitud</Label><Input id="subLng" name="subLng" value={formData.subLng} onChange={handleInputChange} placeholder="-69.9312" /></Col>
            </Row>
            <div className="d-flex align-items-start gap-3 mt-4">
              <Button color="success" className="btn-label right ms-auto" onClick={() => toggleTab(2)}>
                Siguiente <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              </Button>
            </div>
          </TabPane>

          {/* PASO 2: Punto de Medición */}
          <TabPane tabId={2}>
            <div className="mb-4">
                <h5 className="mb-1">Paso 2: Datos del Punto de Medición</h5>
                <p className="text-muted">Detalles específicos del punto de suministro.</p>
            </div>
            <Row>
              <Col md={6}><Label htmlFor="spKind">Tipo</Label><Input type="select" id="spKind" name="spKind" value={formData.spKind} onChange={handleInputChange}><option>Compra</option><option>Circuito</option><option>UNR</option><option>Frontera</option></Input></Col>
              <Col md={6}><Label htmlFor="spCode">Código</Label><Input id="spCode" name="spCode" value={formData.spCode} onChange={handleInputChange} placeholder="INLET-1" /></Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}><Label htmlFor="spName">Nombre</Label><Input id="spName" name="spName" value={formData.spName} onChange={handleInputChange} placeholder="Punto de Compra S1" /></Col>
              <Col md={6}><Label htmlFor="spStatus">Estado</Label><Input type="select" id="spStatus" name="spStatus" value={formData.spStatus} onChange={handleInputChange}><option value="Active">Activo</option><option value="Inactive">Inactivo</option></Input></Col>
            </Row>
             {/* Campo condicional para UNR */}
            {formData.spKind === 'UNR' && (
              <Row className="mt-3">
                <Col><Label htmlFor="spUnr">UNR ID</Label><Input id="spUnr" name="spUnr" value={formData.spUnr} onChange={handleInputChange} placeholder="5001" /></Col>
              </Row>
            )}
            <div className="d-flex align-items-start gap-3 mt-4">
              <Button color="link" className="text-decoration-none btn-label" onClick={() => toggleTab(1)}>
                 <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Anterior
              </Button>
              <Button color="success" className="btn-label right ms-auto" onClick={() => toggleTab(3)}>
                Siguiente <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              </Button>
            </div>
          </TabPane>
          
          {/* PASO 3: Medidor */}
          <TabPane tabId={3}>
            <div className="mb-4">
                <h5 className="mb-1">Paso 3: Datos del Medidor</h5>
                <p className="text-muted">Información del equipo de medición físico.</p>
            </div>
            
            {/* Lógica condicional para medidores */}
            <h6 className="fw-semibold">Medidor Principal</h6>
            <Row>
                <Col md={6}><Label>Marca</Label><Input name="meterBrand" value={formData.meterBrand} onChange={handleInputChange} placeholder="Marca del medidor" /></Col>
                <Col md={6}><Label>Serial</Label><Input name="meterSerial" value={formData.meterSerial} onChange={handleInputChange} placeholder="Serial del medidor" /></Col>
            </Row>
            <Row className="mt-3">
                 <Col><Label>Fecha de Instalación</Label><Input type="date" name="meterDate" value={formData.meterDate} onChange={handleInputChange} /></Col>
            </Row>

            {formData.spKind === 'Compra' && (
                <>
                    <hr className="my-4" />
                    <h6 className="fw-semibold">Medidor de Respaldo (Backup)</h6>
                    <Row>
                        <Col md={6}><Label>Marca</Label><Input name="meterBrandBackup" value={formData.meterBrandBackup} onChange={handleInputChange} placeholder="Marca medidor backup" /></Col>
                        <Col md={6}><Label>Serial</Label><Input name="meterSerialBackup" value={formData.meterSerialBackup} onChange={handleInputChange} placeholder="Serial medidor backup" /></Col>
                    </Row>
                     <Row className="mt-3">
                        <Col><Label>Fecha de Instalación</Label><Input type="date" name="meterDateBackup" value={formData.meterDateBackup} onChange={handleInputChange} /></Col>
                    </Row>
                </>
            )}

            <div className="d-flex align-items-start gap-3 mt-4">
              <Button color="link" className="text-decoration-none btn-label" onClick={() => toggleTab(2)}>
                 <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Anterior
              </Button>
              <Button color="success" className="btn-label right ms-auto" onClick={() => toggleTab(4)}>
                Siguiente <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
              </Button>
            </div>
          </TabPane>
          
          {/* PASO 4: Dispositivo MSS y Guardar */}
          <TabPane tabId={4}>
             <div className="mb-4">
                <h5 className="mb-1">Paso 4: Datos del Dispositivo MSS</h5>
                <p className="text-muted">Información final del hardware de comunicación.</p>
            </div>
            <Row>
                <Col md={6}><Label>Serial MSS</Label><Input name="mssSerial" value={formData.mssSerial} onChange={handleInputChange} placeholder="MSS-1025" /></Col>
                <Col md={6}><Label>Firmware</Label><Input name="firmware" value={formData.firmware} onChange={handleInputChange} placeholder="1.2.7" /></Col>
            </Row>
            <Row className="mt-3">
                <Col><Label>Fecha de Instalación</Label><Input type="date" name="devDate" value={formData.devDate} onChange={handleInputChange} /></Col>
            </Row>
            <div className="d-flex align-items-start gap-3 mt-4">
              <Button color="link" className="text-decoration-none btn-label" onClick={() => toggleTab(3)}>
                 <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Anterior
              </Button>
              <Button color="primary" className="btn-label right ms-auto" onClick={handleSubmit}>
                <i className="ri-save-3-line label-icon align-middle fs-16 ms-2"></i> Guardar Dispositivo
              </Button>
            </div>
          </TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  );
};

export default DeviceWizardModal;