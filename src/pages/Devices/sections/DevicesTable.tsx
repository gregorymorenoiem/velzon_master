import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Label,
} from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import FeatherIcon from "feather-icons-react";

type Props = {
  title?: string;
  rows: any[];
  onAddDevice: () => void;
  onEditDevice: (device: any) => void;
  onDeleteDevice: (device: any) => void;
  onMaintenanceDevice: (device: any) => void;
  onViewAlarms: (device: any) => void;
  onTestDevice: (device: any) => void;
  onConfigureDevice: (device: any) => void;
  availableYears: number[];
  yearFilter: string;
  monthFilter: string;
  onFilterChange: (filterType: 'year' | 'month', value: string) => void;
  onClearFilters: () => void;
};

const DevicesTable: React.FC<Props> = ({
  title = "Listado de Dispositivos",
  rows,
  onAddDevice,
  onEditDevice,
  onDeleteDevice,
  onMaintenanceDevice,
  onViewAlarms,
  onTestDevice,
  onConfigureDevice,
  availableYears,
  yearFilter,
  monthFilter,
  onFilterChange,
  onClearFilters
}) => {
  const columns = useMemo(
    () => [
      {
        header: "MSS SERIAL",
        accessorKey: "mssSerial",
        enableColumnFilter: false, // <-- Esto es lo que deshabilita el filtro para la columna
        cell: (cell: any) => <span className="fw-semibold">{cell.getValue()}</span>,
      },
      {
        header: "SUBESTACIÓN",
        accessorKey: "substation",
        enableColumnFilter: false,
      },
      {
        header: "PUNTO",
        accessorKey: "supplyPoint",
        enableColumnFilter: false,
      },
      {
        header: "MARCA",
        accessorKey: "meterBrand",
        enableColumnFilter: false,
      },
      {
        header: "MEDIDOR",
        accessorKey: "meterSerial",
        enableColumnFilter: false,
      },
      {
        header: "ESTADO",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = String(cell.getValue() || "").toLowerCase();
          switch (status) {
            case "online": return <span className="badge text-uppercase bg-success-subtle text-success">Online</span>;
            case "maintenance": return <span className="badge text-uppercase bg-primary-subtle text-primary">Mantenimiento</span>;
            case "offline": return <span className="badge text-uppercase bg-danger-subtle text-danger">Offline</span>;
            default: return <span className="badge text-uppercase bg-secondary-subtle text-secondary">{status}</span>;
          }
        },
      },
      {
        header: "ACCIÓN",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const device = cell.row.original;
          return (
            <UncontrolledDropdown>
              <DropdownToggle href="#" className="btn btn-soft-secondary btn-sm dropdown" tag="button">
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem onClick={() => onEditDevice(device)}><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Editar</DropdownItem>
                <DropdownItem onClick={() => onConfigureDevice(device)}><i className="ri-settings-3-line align-bottom me-2 text-muted"></i> Configurar</DropdownItem>
                <DropdownItem onClick={() => onMaintenanceDevice(device)}><i className="ri-tools-line align-bottom me-2 text-muted"></i> Mantenimiento</DropdownItem>
                <DropdownItem onClick={() => onTestDevice(device)}><i className="ri-flask-line align-bottom me-2 text-muted"></i> Pruebas</DropdownItem>
                <DropdownItem onClick={() => onViewAlarms(device)}><i className="ri-flashlight-line align-bottom me-2 text-muted"></i> Alarmas</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => onDeleteDevice(device)} className="text-danger"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Eliminar</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
  ], [onEditDevice, onDeleteDevice, onMaintenanceDevice, onViewAlarms, onTestDevice, onConfigureDevice]);

  const months = [
    { label: 'Enero', value: 1 }, { label: 'Febrero', value: 2 }, { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 }, { label: 'Mayo', value: 5 }, { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 }, { label: 'Noviembre', value: 11 }, { label: 'Diciembre', value: 12 },
  ];

  return (
    <Col lg={12}>
      <Card id="devicesList">
        <CardHeader className="border-0">
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">{title}</h5>
            <div className="flex-shrink-0">
              <Button color="danger" onClick={onAddDevice}>
                <i className="ri-add-line align-bottom me-1"></i> Nuevo Dispositivo
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="border border-dashed border-end-0 border-start-0">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="flex-shrink-0">
                <Label className="mb-0">Filtrar por fecha:</Label>
            </div>
            <div style={{minWidth: "150px"}}>
                <Input type="select" value={yearFilter} onChange={(e) => onFilterChange('year', e.target.value)}>
                    <option value="all">Todos los Años</option>
                    {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                </Input>
            </div>
             <div style={{minWidth: "150px"}}>
                <Input type="select" value={monthFilter} onChange={(e) => onFilterChange('month', e.target.value)}>
                    <option value="all">Todos los Meses</option>
                    {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
                </Input>
            </div>
            <div className="flex-shrink-0">
                <Button color="primary" onClick={onClearFilters}>
                    <i className="ri-refresh-line align-bottom me-1"></i> Limpiar Filtros
                </Button>
            </div>
          </div>
        </CardBody>

        <CardBody className="pt-0">
          {rows && rows.length > 0 ? (
            <TableContainer
              columns={columns}
              data={rows}
              isGlobalFilter={true}
              customPageSize={10}
              theadClass="text-muted text-uppercase"
              SearchPlaceholder="Buscar en la tabla..."
            />
          ) : (
            <div className="text-center py-5">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                  <FeatherIcon icon="cpu" />
                </div>
              </div>
              <h5 className="mt-2">No se encontraron dispositivos</h5>
              <p className="text-muted">
                Intenta ajustar tus filtros o añade un nuevo dispositivo.
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default DevicesTable;