import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import Loader from "../../../Components/Common/Loader";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  //delete alarm
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const [alarm, setAlarm] = useState<any>(null);

  // Delete Data
  const onClickDelete = (alarm: any) => {
    setAlarm(alarm);
    setDeleteModal(true);
  };

  const handleDeleteAlarm = () => {
    if (alarm) {
      // Add your delete alarm logic here
      // dispatch(onDeleteAlarm(alarm.id));
      setDeleteModal(false);
      toast.success("Alarma eliminada correctamente");
    }
  };

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall: any = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".alarmCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);

  const deleteMultiple = () => {
    const checkall: any = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element: any) => {
      // Add your multiple delete logic here
      // dispatch(onDeleteAlarm(element.value));
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
    toast.success("Alarmas eliminadas correctamente");
  };

  const deleteCheckbox = () => {
    const ele: any = document.querySelectorAll(".alarmCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  //Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cell: any) => {
          return <input type="checkbox" className="alarmCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <span className="fw-medium link-primary">#{cell.getValue()}</span>;
        },
      },
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
        cell: (cell: any) => (
          <>
            {handleValidDate(cell.getValue())},{" "}
            <small className="text-muted">{handleValidTime(cell.getValue())}</small>
          </>
        ),
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
            case "alta": 
              return <span className="badge text-uppercase bg-danger-subtle text-danger">Alta</span>;
            case "media": 
              return <span className="badge text-uppercase bg-warning-subtle text-warning">Media</span>;
            default: 
              return <span className="badge text-uppercase bg-info-subtle text-info">Baja</span>;
          }
        },
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          const alarm = cellProps.row.original;
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm dropdown"
                tag="button"
              >
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => onAcknowledge(alarm.id)}
                  disabled={alarm.status !== 'active'}
                >
                  <i className="ri-check-double-line align-bottom me-2 text-muted"></i> Reconocer
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  onClick={() => onClickDelete(alarm)}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Eliminar
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [checkedAll, onAcknowledge]
  );

  const months = [
    { label: 'Enero', value: 1 }, { label: 'Febrero', value: 2 }, { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 }, { label: 'Mayo', value: 5 }, { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 }, { label: 'Noviembre', value: 11 }, { label: 'Diciembre', value: 12 },
  ];

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteAlarm()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      
      <Card id="alarmList">
        <CardHeader className="border-0">
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Alarmas</h5>
            <div className="flex-shrink-0">
              <div className="d-flex gap-2 flex-wrap">
                {isMultiDeleteButton && <button className="btn btn-primary me-1"
                  onClick={() => setDeleteModalMulti(true)}
                ><i className="ri-delete-bin-2-line"></i></button>}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          {/* Filtros integrados en una sola línea */}
          <Row className="g-3 mb-3">
            <Col sm={6} xl={6}>
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Buscar por código, subestación..."
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </Col>
            <Col sm={6} xl={6}>
              <div className="d-flex flex-wrap align-items-center gap-2 justify-content-xl-end">
                <div style={{minWidth: "150px"}}>
                  <Input 
                    type="select" 
                    value={yearFilter} 
                    onChange={(e) => onFilterChange('year', e.target.value)}
                  >
                    <option value="all">Todos los Años</option>
                    {availableYears.map(year => 
                      <option key={year} value={year}>{year}</option>
                    )}
                  </Input>
                </div>
                <div style={{minWidth: "150px"}}>
                  <Input 
                    type="select" 
                    value={monthFilter} 
                    onChange={(e) => onFilterChange('month', e.target.value)}
                  >
                    <option value="all">Todos los Meses</option>
                    {months.map(month => 
                      <option key={month.value} value={month.value}>{month.label}</option>
                    )}
                  </Input>
                </div>
                <div className="flex-shrink-0">
                  <Button color="primary" onClick={onClearFilters}>
                    <i className="ri-refresh-line align-bottom me-1"></i> Limpiar
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          
          <div>
            {alarms && alarms.length ? (
              <TableContainer
                columns={columns}
                data={(alarms || [])}
                isGlobalFilter={false} // Desactivamos el global filter por defecto
                customPageSize={10}
                theadClass="text-muted text-uppercase"
              />
            ) : (
              <div className="text-center py-4">
                <span className="text-muted">No hay alarmas para mostrar</span>
              </div>
            )}
            <ToastContainer closeButton={false} limit={1} />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AlarmsTable;