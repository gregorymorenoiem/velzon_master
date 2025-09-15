import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';

interface SettingsModalProps {
  isOpen: boolean;
  toggle: () => void;
  device: any | null;
  onSave: (deviceId: number, settings: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, toggle, device, onSave }) => {
  // Estado para los valores de los límites
  const [limits, setLimits] = useState({
    tempMin: '',
    tempMax: '',
    voltMin: '',
    voltMax: '',
  });

  // Estado para los switches de habilitación
  const [isTempEnabled, setIsTempEnabled] = useState(true);
  const [isVoltEnabled, setIsVoltEnabled] = useState(true);

  // Cargar datos del dispositivo cuando el modal se abre
  useEffect(() => {
    if (device) {
      setLimits({
        tempMin: device.tempMin?.toString() ?? '10',
        tempMax: device.tempMax?.toString() ?? '85',
        voltMin: device.voltMin?.toString() ?? '110',
        voltMax: device.voltMax?.toString() ?? '130',
      });
      setIsTempEnabled(device.isTempEnabled ?? true);
      setIsVoltEnabled(device.isVoltEnabled ?? true);
    }
  }, [device]);

  // Manejar cambios en los inputs, permitiendo solo números y un punto decimal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setLimits(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveClick = () => {
    if (!device) return;

    const newSettings = {
      tempMin: parseFloat(limits.tempMin) || 0,
      tempMax: parseFloat(limits.tempMax) || 0,
      isTempEnabled,
      voltMin: parseFloat(limits.voltMin) || 0,
      voltMax: parseFloat(limits.voltMax) || 0,
      isVoltEnabled,
    };
    onSave(device.id, newSettings);
    toggle(); // Cierra el modal
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Configurar Límites: {device?.mssSerial}</ModalHeader>
      <ModalBody>
        {/* Sección de Temperatura */}
        <FormGroup className="border p-3 rounded">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Label className="mb-0 fs-15 fw-semibold">Límites de Temperatura (°C)</Label>
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={isTempEnabled}
                onChange={() => setIsTempEnabled(!isTempEnabled)}
              />
            </div>
          </div>
          <Row>
            <Col>
              <Label htmlFor="tempMin">Mínima</Label>
              <Input
                id="tempMin"
                name="tempMin"
                value={limits.tempMin}
                onChange={handleInputChange}
                placeholder="Ej: 10"
                disabled={!isTempEnabled}
              />
            </Col>
            <Col>
              <Label htmlFor="tempMax">Máxima</Label>
              <Input
                id="tempMax"
                name="tempMax"
                value={limits.tempMax}
                onChange={handleInputChange}
                placeholder="Ej: 85"
                disabled={!isTempEnabled}
              />
            </Col>
          </Row>
        </FormGroup>

        {/* Sección de Voltaje */}
        <FormGroup className="border p-3 rounded mt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Label className="mb-0 fs-15 fw-semibold">Límites de Voltaje (V)</Label>
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={isVoltEnabled}
                onChange={() => setIsVoltEnabled(!isVoltEnabled)}
              />
            </div>
          </div>
          <Row>
            <Col>
              <Label htmlFor="voltMin">Mínimo</Label>
              <Input
                id="voltMin"
                name="voltMin"
                value={limits.voltMin}
                onChange={handleInputChange}
                placeholder="Ej: 110"
                disabled={!isVoltEnabled}
              />
            </Col>
            <Col>
              <Label htmlFor="voltMax">Máximo</Label>
              <Input
                id="voltMax"
                name="voltMax"
                value={limits.voltMax}
                onChange={handleInputChange}
                placeholder="Ej: 130"
                disabled={!isVoltEnabled}
              />
            </Col>
          </Row>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={toggle}>
          Cancelar
        </Button>
        <Button color="primary" onClick={handleSaveClick}>
          Guardar Cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SettingsModal;