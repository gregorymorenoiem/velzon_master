import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Label,
} from "reactstrap";
import { format } from 'date-fns';
import TableContainer from "../../../Components/Common/TableContainer";

type Props = {
  alarms: any[];
  availableYears: number[];
  yearFilter: string;
  monthFilter: string;
  onFilterChange: (filterType: 'year' | 'month', value: string) => void;
  onClearFilters: () => void;
  onAcknowledge: (alarmId: number) => void;
};

const AlarmsTable: React.FC<Props> = ({
  alarms,
  availableYears,
  yearFilter,
  monthFilter,
  onFilterChange,
  onClearFilters,
  onAcknowledge,
}) => {
  const columns = useMemo(
    () => [
      {
        header: "CÓDIGO",
        accessorKey: "code",
        enableColumnFilter: false,
        cell: (cell: any) => <span className="fw-semibold">{cell.getValue()}</span>,
      },
      {
        header: "SUBESTACIÓN",
        accessorKey: "substation",
        enableColumnFilter: false,
      },
      {
        header: "DETECTADA",
        accessorKey: "detected",
        enableColumnFilter: false,
        cell: (cell: any) => format(new Date(cell.getValue()), "dd/MM/yyyy HH:mm"),
      },
      {
        header: "ESTADO",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const status = cell.getValue();
          return status === "active"
            ? <span className="badge text-uppercase bg-success-subtle text-success">Activa</span>
            : <span className="badge text-uppercase bg-secondary-subtle text-secondary">Reconocida</span>;
        },
      },
      {
        header: "SEVERIDAD",
        accessorKey: "severity",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const severity = cell.getValue();
          switch (severity) {
            case "alta": return <span className="badge text-uppercase bg-danger-subtle text-danger">Alta</span>;
            case "media": return <span className="badge text-uppercase bg-warning-subtle text-warning">Media</span>;
            default: return <span className="badge text-uppercase bg-info-subtle text-info">Baja</span>;
          }
        },
      },
      {
        header: "ACCIÓN",
        enableColumnFilter: false,
        cell: (cell: any) => {
          const alarm = cell.row.original;
          return (
            <UncontrolledDropdown>
              <DropdownToggle href="#" className="btn btn-soft-secondary btn-sm dropdown" tag="button">
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => onAcknowledge(alarm.id)}
                  disabled={alarm.status !== 'active'}
                >
                  <i className="ri-check-double-line align-bottom me-2 text-muted"></i> Reconocer
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [onAcknowledge]
  );
  
  const months = [
    { label: 'Enero', value: 1 }, { label: 'Febrero', value: 2 }, { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 }, { label: 'Mayo', value: 5 }, { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 }, { label: 'Noviembre', value: 11 }, { label: 'Diciembre', value: 12 },
  ];

  return (
    <Card>
      <CardHeader>
        <h4 className="card-title mb-0">Listado de Alarmas</h4>
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
        <TableContainer
          columns={columns}
          data={alarms}
          isGlobalFilter={true}
          customPageSize={10}
          theadClass="text-muted text-uppercase"
          SearchPlaceholder="Buscar por código, subestación..."
        />
      </CardBody>
    </Card>
  );
};

export default AlarmsTable;