// src/pages/Devices/sections/DevicesMap.tsx

import React, { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Input, Label, Button, Row, Col } from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Hacemos que las props sean flexibles, aceptando un array de cualquier objeto
interface DevicesMapProps {
  devices: any[];
  title?: string;
}

const MapUpdater: React.FC<{ devices: any[] }> = ({ devices }) => {
  const map = useMap();
  React.useEffect(() => {
    if (devices && devices.length > 0) {
      const validCoords = devices.filter(d => d.lat && d.lng);
      if (validCoords.length > 0) {
        const group = new L.FeatureGroup(validCoords.map(device => L.marker([device.lat, device.lng])));
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
      }
    } else {
        map.setView([18.4861, -69.9312], 13);
    }
  }, [devices, map]);
  return null;
};

const DevicesMap: React.FC<DevicesMapProps> = ({ devices, title = "Mapa de Ubicaciones de Dispositivos" }) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filteredDevicesForMap = useMemo(() => {
    return devices.filter(device => {
      if (!device.lat || !device.lng) return false;
      const statusMatch = statusFilter === "all" || device.status === statusFilter;
      const term = searchFilter.toLowerCase();
      const searchMatch = term === "" || 
        device.mssSerial.toLowerCase().includes(term) ||
        device.substation.toLowerCase().includes(term) ||
        device.supplyPoint.toLowerCase().includes(term);
      return statusMatch && searchMatch;
    });
  }, [devices, statusFilter, searchFilter]);

  const statusColors: { [key: string]: string } = {
    online: "#28a745",
    offline: "#dc3545",
    maintenance: "#0d6efd"
  };

  const createStatusIcon = (status: string) => {
    const color = statusColors[status] || "#6c757d";
    return new L.DivIcon({
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      className: "custom-leaflet-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setSearchFilter("");
  };

  return (
    <Card>
      <CardHeader><h4 className="card-title mb-0">{title}</h4></CardHeader>
      <CardBody>
        <Row className="mb-3">
<div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
    {/* Campo de búsqueda a la izquierda */}
    <div className="search-box flex-grow-1 me-3">
        <Input
            type="text"
            id="mapSearchFilter"
            className="form-control"
            placeholder="Buscar por serial, subestación..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
        />
        {/* Este ícono es parte del estilo anterior, asumiendo que tienes el CSS para .search-box */}
        <i className="ri-search-line search-icon"></i>
    </div>

    {/* Grupo de filtros y botón a la derecha */}
    <div className="d-flex flex-wrap align-items-center gap-3">
        {/* Filtro por Estado */}
        <div style={{ minWidth: "180px" }}>
            <Input
                type="select"
                id="mapStatusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="all">Todos los estados</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Mantenimiento</option>
            </Input>
        </div>

        {/* Botón para limpiar filtros */}
        <div className="flex-shrink-0">
            {/* Se cambió el color a 'primary' y el texto para coincidir con el estilo anterior */}
            <Button color="primary" onClick={clearFilters}>
                <i className="ri-refresh-line me-1"></i> Limpiar
            </Button>
        </div>
    </div>
</div>
        </Row>
        <div style={{ height: "450px", width: "100%", borderRadius: "0.25rem", overflow: "hidden" }}>
          <MapContainer center={[18.4861, -69.9312]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater devices={filteredDevicesForMap} />
            {filteredDevicesForMap.map((device) => (
              <Marker key={device.id} position={[device.lat, device.lng]} icon={createStatusIcon(device.status)}>
                <Popup>
                  <div>
                    <h6 className="fw-bold mb-2">{device.mssSerial}</h6>
                    <p className="mb-1"><strong>Subestación:</strong> {device.substation}</p>
                    <p className="mb-1"><strong>Punto:</strong> {device.supplyPoint}</p>
                    <p className="mb-1"><strong>Estado:</strong>{" "}
                      <span className={`badge text-uppercase ${device.status === "online" ? "bg-success-subtle text-success" : device.status === "offline" ? "bg-danger-subtle text-danger" : "bg-primary-subtle text-primary"}`}>
                        {device.status}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        {/* <div className="mt-3">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="d-flex align-items-center">
                <div style={{ width: "16px", height: "16px", backgroundColor: color, borderRadius: "50%", marginRight: "8px" }}></div>
                <span className="text-capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};

export default DevicesMap;