import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Button,
} from "reactstrap";
import classnames from "classnames";

// --- Datos de Configuración de Pruebas ---
const testGroups = [
  {
    title: "Corrientes",
    points: [
      { id: 'current_l1', label: 'Corriente L1' },
      { id: 'current_l2', label: 'Corriente L2' },
      { id: 'current_l3', label: 'Corriente L3' },
    ]
  },
  {
    title: "Voltajes",
    points: [
      { id: 'voltage_vl1', label: 'Voltaje VL1' },
      { id: 'voltage_vl2', label: 'Voltaje VL2' },
      { id: 'voltage_vl3', label: 'Voltaje VL3' },
    ]
  },
  {
    title: "Relays",
    points: [
      { id: 'relay_1', label: 'Relay 1' },
      { id: 'relay_2', label: 'Relay 2' },
    ]
  },
  {
    title: "Entradas Digitales",
    points: [
      { id: 'input_d1', label: 'Entrada D1' },
      { id: 'input_d2', label: 'Entrada D2' },
      { id: 'input_d3', label: 'Entrada D3' },
      { id: 'input_d4', label: 'Entrada D4' },
    ]
  },
];

// --- Componente para mostrar el resultado de la prueba ---
const TestResultDisplay = ({ result }: { result?: { status: string } }) => {
  if (!result) return <div style={{ width: "24px", height: "24px" }} />;

  switch(result.status) {
    case 'testing':
      return <i className="ri-loader-4-line fs-20 text-primary animation-spin"></i>;
    case 'fail':
      return <i className="ri-close-circle-line fs-20 text-danger"></i>;
    case 'ok':
      return <i className="ri-checkbox-circle-line fs-20 text-success"></i>;
    default:
      return <div style={{ width: "24px", height: "24px" }} />;
  }
};

// --- Componente Principal del Wizard ---
interface DeviceTestWizardModalProps {
  isOpen: boolean;
  toggle: () => void;
  device: any | null;
}

const DeviceTestWizardModal: React.FC<DeviceTestWizardModalProps> = ({ isOpen, toggle, device }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [testResults, setTestResults] = useState<Record<string, { status: string }>>({});

  useEffect(() => {
    // Reiniciar estado cuando se abre el modal
    if (isOpen) {
      setActiveTab(1);
      setTestResults({});
    }
  }, [isOpen]);

  const toggleTab = (tab: number) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleTest = (pointId: string) => {
    // 1. Marcar como "probando"
    setTestResults(prev => ({ ...prev, [pointId]: { status: 'testing' } }));

    // 2. Simular llamada a la API con un timeout
    setTimeout(() => {
      const didFail = Math.random() < 0.15; // 15% de probabilidad de fallo
      setTestResults(prev => ({
        ...prev,
        [pointId]: { status: didFail ? 'fail' : 'ok' }
      }));
    }, 1500 + Math.random() * 1000); // Duración variable
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        Asistente de Pruebas: {device?.mssSerial}
      </ModalHeader>
      <ModalBody className="p-4">
        <Nav className="nav-pills nav-justified" role="tablist">
          {testGroups.map((group, index) => (
            <NavItem key={group.title}>
              <NavLink
                className={classnames({ active: activeTab === index + 1 })}
                onClick={() => toggleTab(index + 1)}
              >
                {group.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent activeTab={activeTab} className="mt-4">
          {testGroups.map((group, index) => (
            <TabPane tabId={index + 1} key={group.title}>
              <h5 className="mb-3">{group.title}</h5>
              {group.points.map(point => (
                <Row key={point.id} className="align-items-center border-bottom py-2">
                  <Col>
                    <span className="fw-medium">{point.label}</span>
                  </Col>
                  <Col xs="auto" className="d-flex align-items-center gap-4">
                    <Button
                      size="sm"
                      color="primary"
                      outline
                      style={{ width: "100px" }}
                      onClick={() => handleTest(point.id)}
                      disabled={testResults[point.id]?.status === 'testing'}
                    >
                      {testResults[point.id]?.status === 'testing' ? "Probando..." : "Probar"}
                    </Button>
                    <div className="text-center" style={{ width: "50px" }}>
                      <TestResultDisplay result={testResults[point.id]} />
                    </div>
                  </Col>
                </Row>
              ))}
            </TabPane>
          ))}
        </TabContent>

        <div className="d-flex justify-content-between mt-4">
            <Button color="light" onClick={() => toggleTab(activeTab - 1)} disabled={activeTab === 1}>
                Anterior
            </Button>
            {activeTab === testGroups.length ? (
                 <Button color="success" onClick={toggle}>Finalizar</Button>
            ) : (
                <Button color="primary" onClick={() => toggleTab(activeTab + 1)}>
                    Siguiente
                </Button>
            )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeviceTestWizardModal;