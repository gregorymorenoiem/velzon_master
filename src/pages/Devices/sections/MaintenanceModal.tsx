import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';

interface MaintenanceModalProps {
  isOpen: boolean;
  toggle: () => void;
  device: any | null;
  onConfirm: (deviceId: number, reason: string) => void;
  onRemove: (deviceId: number) => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ isOpen, toggle, device, onConfirm, onRemove }) => {
  const [reason, setReason] = useState("");

  // Determina si el dispositivo ya está en mantenimiento
  const isMaintenanceMode = device?.status === 'maintenance';

  // Carga el motivo existente cuando se abre el modal
  useEffect(() => {
    if (device && isOpen) {
      if (isMaintenanceMode) {
        setReason(device.maintenanceReason || "");
      } else {
        setReason(""); // Limpia el campo si se va a poner en mantenimiento
      }
    }
  }, [device, isOpen, isMaintenanceMode]);

  const handleConfirmClick = () => {
    if (device && reason.trim()) {
      onConfirm(device.id, reason.trim());
      toggle();
    }
  };

  const handleRemoveClick = () => {
    if (device) {
      onRemove(device.id);
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        <div className="d-flex align-items-center gap-2">
            <i className={classNames("fs-20", {
                "ri-tools-line text-primary": isMaintenanceMode,
                "ri-tools-fill text-warning": !isMaintenanceMode,
            })}></i>
            {isMaintenanceMode ? 'Gestionar Mantenimiento' : 'Poner en Mantenimiento'}
        </div>
      </ModalHeader>
      <ModalBody>
        <p className="text-muted">
          {isMaintenanceMode
            ? `Estás gestionando el estado de mantenimiento del dispositivo `
            : `Vas a poner el dispositivo `}
          <strong className="text-dark">{device?.mssSerial}</strong>.
          {isMaintenanceMode
            ? ` Puedes actualizar la razón o quitarlo de este estado.`
            : ` Por favor, especifica una razón.`}
        </p>
        <FormGroup className='mt-3'>
          <Label htmlFor="maintenance-reason">
            {isMaintenanceMode ? 'Razón actual (puedes editarla)' : 'Razón del mantenimiento'}
          </Label>
          <Input
            id="maintenance-reason"
            type="textarea"
            rows="4"
            placeholder="Ej: Reemplazo de batería, actualización de firmware..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        {isMaintenanceMode ? (
            // Botones para cuando YA está en mantenimiento
            <>
                <Button color="light" onClick={toggle}>Cancelar</Button>
                <div className='hstack gap-2'>
                    <Button color="danger" outline onClick={handleRemoveClick}>Quitar de Mantenimiento</Button>
                    <Button color="primary" onClick={handleConfirmClick} disabled={!reason.trim()}>Actualizar</Button>
                </div>
            </>
        ) : (
            // Botones para poner EN mantenimiento
            <>
                <Button color="light" onClick={toggle}>Cancelar</Button>
                <Button color="primary" onClick={handleConfirmClick} disabled={!reason.trim()}>Confirmar</Button>
            </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default MaintenanceModal;