import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { DevicesKpis, DevicesTable } from "./sections";
import DeviceWizardModal from "./sections/DeviceWizardModal";
import DeviceTestWizardModal from "./sections/DeviceTestWizardModal";
import SettingsModal from "./sections/SettingsModal";
import MaintenanceModal from "./sections/MaintenanceModal";
import { getDevicesKpis } from "../../slices/device/thunk";
import { devicesMockData } from "../../common/data/devicesMockData";

const DevicesPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  
  const [devices, setDevices] = useState(devicesMockData);
  const { kpis } = useSelector((state: any) => ({ kpis: state.Devices.kpis }));

  const [yearFilter, setYearFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isTestWizardOpen, setIsTestWizardOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const [deviceToEdit, setDeviceToEdit] = useState<any | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<any | null>(null);
  const [deviceToTest, setDeviceToTest] = useState<any | null>(null);
  const [deviceToConfigure, setDeviceToConfigure] = useState<any | null>(null);
  const [deviceForMaintenance, setDeviceForMaintenance] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getDevicesKpis());
  }, [dispatch]);

  const availableYears = useMemo(() => {
    if (!devices || devices.length === 0) return [];
    // <-- CORREGIDO: Usar 'lastUpdate' en lugar de 'installedAt' -->
    const years = devices.map(d => new Date(d.lastUpdate).getFullYear());
    // <-- CORREGIDO: Usar Array.from() para compatibilidad -->
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [devices]);

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      // <-- CORREGIDO: Usar 'lastUpdate' en lugar de 'installedAt' -->
      if (!device.lastUpdate || isNaN(new Date(device.lastUpdate).getTime())) {
        return true; 
      }
      // <-- CORREGIDO: Usar 'lastUpdate' en lugar de 'installedAt' -->
      const deviceDate = new Date(device.lastUpdate);
      const yearMatch = yearFilter === 'all' || deviceDate.getFullYear() === parseInt(yearFilter);
      const monthMatch = monthFilter === 'all' || (deviceDate.getMonth() + 1) === parseInt(monthFilter);
      return yearMatch && monthMatch;
    });
  }, [devices, yearFilter, monthFilter]);

  const handleFilterChange = (filterType: 'year' | 'month', value: string) => {
    if (filterType === 'year') setYearFilter(value);
    if (filterType === 'month') setMonthFilter(value);
  };
  
  const handleClearFilters = () => {
    setYearFilter("all");
    setMonthFilter("all");
  };

  const handleAddDevice = () => {
    setDeviceToEdit(null);
    setIsWizardOpen(true);
  };

  const handleEditDevice = (device: any) => {
    const flatDeviceData = {
        subName: device.substation, subLat: "18.4861", subLng: "-69.9312", spKind: "Circuito", spCode: device.supplyPoint,
        spName: `Punto de Suministro ${device.id}`, spStatus: "Active", spUnr: "", meterBrand: device.meterBrand, meterSerial: device.meterSerial,
        meterDate: new Date(device.lastUpdate).toISOString().split("T")[0], meterBrandBackup: "", meterSerialBackup: "", meterDateBackup: "",
        mssSerial: device.mssSerial, firmware: device.firmware || "1.0.0", devDate: new Date(device.lastUpdate).toISOString().split("T")[0], devStatus: device.status,
    };
    setDeviceToEdit(flatDeviceData);
    setIsWizardOpen(true);
  };

  const handleDeleteDevice = (device: any) => { setDeviceToDelete(device); };
  const handleViewAlarms = (device: any) => { navigate(`/alarms?deviceId=${device.id}`); };
  const handleTestDevice = (device: any) => { setDeviceToTest(device); setIsTestWizardOpen(true); };
  const handleConfigureDevice = (device: any) => { setDeviceToConfigure(device); setIsSettingsModalOpen(true); };
  const handleMaintenanceDevice = (device: any) => { setDeviceForMaintenance(device); setIsMaintenanceModalOpen(true); };
  
  const handleSaveSettings = (deviceId: number, newSettings: any) => { setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, ...newSettings } : d)); };
  const handleConfirmMaintenance = (deviceId: number, reason: string) => { setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, status: 'maintenance', maintenanceReason: reason } : d)); };
  const handleRemoveMaintenance = (deviceId: number) => { setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, status: 'online', maintenanceReason: undefined } : d)); };

  const confirmDelete = () => {
    if (deviceToDelete) {
      setDevices(devices.filter(d => d.id !== deviceToDelete.id));
      setDeviceToDelete(null);
    }
  };

  const handleSaveDevice = (deviceData: any) => {
    const now = new Date().toISOString();
    if (deviceToEdit) {
      setDevices(devices.map(d => (d.id === deviceToEdit.id ? { ...d, ...deviceData, lastUpdate: now } : d) ));
    } else {
      const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
      setDevices([...devices, { ...deviceData, id: newId, lastUpdate: now }]);
    }
  };
  
  return (
    <div className="page-content">
      <Container fluid>
        <h4 className="mb-4">Dashboard de Dispositivos</h4>
        <DevicesKpis items={kpis} />
        <DevicesTable 
          title="Listado de Dispositivos"
          rows={filteredDevices} 
          onAddDevice={handleAddDevice}
          onEditDevice={handleEditDevice}
          onDeleteDevice={handleDeleteDevice}
          onMaintenanceDevice={handleMaintenanceDevice}
          onViewAlarms={handleViewAlarms}
          onTestDevice={handleTestDevice}
          onConfigureDevice={handleConfigureDevice}
          availableYears={availableYears}
          yearFilter={yearFilter}
          monthFilter={monthFilter}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* --- MODALES --- */}
        <DeviceWizardModal isOpen={isWizardOpen} toggle={() => setIsWizardOpen(false)} onSave={handleSaveDevice} deviceToEdit={deviceToEdit} />
        <DeviceTestWizardModal isOpen={isTestWizardOpen} toggle={() => setIsTestWizardOpen(false)} device={deviceToTest} />
        <SettingsModal isOpen={isSettingsModalOpen} toggle={() => setIsSettingsModalOpen(false)} device={deviceToConfigure} onSave={handleSaveSettings} />
        <MaintenanceModal isOpen={isMaintenanceModalOpen} toggle={() => setIsMaintenanceModalOpen(false)} device={deviceForMaintenance} onConfirm={handleConfirmMaintenance} onRemove={handleRemoveMaintenance} />
        <Modal isOpen={!!deviceToDelete} toggle={() => setDeviceToDelete(null)} centered>
          <ModalHeader toggle={() => setDeviceToDelete(null)}> Confirmar Eliminación </ModalHeader>
          <ModalBody> ¿Estás seguro de que deseas eliminar el dispositivo <strong>{deviceToDelete?.mssSerial}</strong>? </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={() => setDeviceToDelete(null)}>Cancelar</Button>
            <Button color="danger" onClick={confirmDelete}>Eliminar</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default DevicesPage;