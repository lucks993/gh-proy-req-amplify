import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ReactDOM from "react-dom";
import TableToExcel from "@linways/table-to-excel";
import "carbon-components/css/carbon-components.min.css";
import {
  Button,
  DataTable,
  Modal,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  TextArea,
} from "carbon-components-react";
import { headerData, rowData } from "./sampleData";
import "./CourseStaffRequirement.scss";
import { fetchRequest, sendRequestApprover } from "../../services/api/servicies";

const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

export let selectedItem = 0;
export let selectedRow = {};
let userReq = {
  position: 2,
  name: "",
  apPaterno: "",
  apMaterno: "",
  codeSuperior: "0",
  approverRole: 2
}
// const [listRow, setListRow] = useState([])
export default function CourseStaffRequirement(props) {
  let match = useRouteMatch();
  const [listRequest, setListRequest] = useState([]);
  const [infRequest, setInfRequest] = useState(() => {
    const dataReq = [{}];
    listRequest.forEach((req) => {
      dataReq[req.id - 1] = {
        id: req.id.toString(),
        index: req.id,
        society: req.society.description,
        position: req.position.description,
        new: req.type.description,
        // nameNew: req.listReplacement,
        quantity: req.quantity,
        unity_org: req.orgUnit.description,
        cost_center: req.costCenter.description,
        location: req.physLocation.description,
        date: req.requestDate,
      };
    });
    return dataReq;
  });

  // For todays date;
  Date.prototype.today = function () { 
    return this.getFullYear() + "/" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/" + ((this.getDate() < 10)?"0":"") + this.getDate();
  }

  // For the time now
  Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  }

  //Fetch Requirement Request Employee
  useEffect(() => {
    const getRequest = async () => {
      const requestFromServer = await fetchRequest();
      setListRequest(requestFromServer);
      console.log(requestFromServer);
      setInfRequest(() => {
        const dataReq = [{}];
        requestFromServer.map((req) => {
          dataReq[req.id - 1] = {
            id: req.id.toString(),
            index: req.id,
            society: req.society.description,
            position: req.position.description,
            new: req.type.description,
            // nameNew: req.listReplacement,
            quantity: req.quantity,
            unity_org: req.orgUnit.description,
            cost_center: req.costCenter.description,
            location: req.physLocation.description,
            date: req.requestDate,
          };
        });
        return dataReq;
      });
    };
    getRequest();
  }, []);

  const mostrarReq = (index) => {
    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    console.log(selectedItem);
    console.log(selectedRow);
    // console.log(selectedRow[0].type.id);
  };

  const goToRequirement = (item) => {
    selectedItem = item;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    // console.log(selectedItem)
    props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
  };

  const aprobarReq = async (index) => {
    const data = {}

    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    // console.log(selectedItem);
    console.log(selectedRow);
    data.request = {
      id: selectedRow[0].id,
      flow: (selectedRow[0].flow.id === 1 && userReq.codeSuperior !== "0") ? 1 :
            (selectedRow[0].approvedLevel === 0 && selectedRow[0].flow.id === 2) ? 4 :
            (selectedRow[0].flow.id < 6 ? (selectedRow[0].flow.id + 1) : (selectedRow[0].flow.id === 6 ? selectedRow[0].flow.id :
                                          (selectedRow[0].flow.id < 10 ? (selectedRow[0].flow.id + 1) : selectedRow[0].flow.id))), //Flow siguiente
      state: (selectedRow[0].approvedLevel === 0 && selectedRow[0].flow.id === 2) ? 3 :
             (selectedRow[0].flow.id < 6 ? 2 : (selectedRow[0].flow.id === 6 ? 3 :
                                          (selectedRow[0].flow.id < 10 ? 2 : 3))),
      approver: userReq.approverRole, //id del usuario
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestApprover(data)
  }

  const showInstrucctions = () => {
    return (
      <div style={{ marginBottom: "2rem" }}>
        <TextArea
          cols={20}
          id="Indicaciones_Solicitudes_1"
          labelText="Indicaciones"
          rows={2}
          light
          style={{ resize: "none" }}
          readOnly
          defaultValue="- Para poder revisar el historial de aprobaciones de una solictud, presionar el ícono 'v' de la fila correspondiente.
                      - Si desea aprobar/denegar más de una solicitud, debe elegir dichas solitudes y seguidamente, presionar el botón correspondiente al final de la tabla."
        ></TextArea>
      </div>
    );
  };

  const exportReportToExcel = () => {
    let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table[0], {
      // html code may contain multiple tables so here we are refering to 1st table tag
      name: `Solicitudes_Req_Personal.xlsx`, // fileName you could use any name
      sheet: {
        name: "Sheet 1", // sheetName
      },
    });
  };

  return (
    <div className="bg--grid">
      <h2 className="center_titles">
        Mis Solicitudes en Curso - Requerimientos de Personal
      </h2>
      <div>
        <br></br> <br></br>
      </div>
      {showInstrucctions}
      <DataTable rows={infRequest} headers={headerData}>
        {({
          rows,
          headers,
          getHeaderProps,
          getTableProps,
          getRowProps,
          getSelectionProps,
        }) => (
          <TableContainer className="SolicitudesRP">
            <Table {...getTableProps()} size="compact">
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  <TableExpandHeader />
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    <TableExpandedRow
                      colSpan={headers.length + 2}
                      className="demo-expanded-td"
                    >
                      {/* <p className="section-form" style={{ fontWeight: "bold", backgroundColor: "#002060"}}>
                        Historial de Aprobaciones
                      </p>
                      <DataTable rows={rowDataSub} headers={headerDataSub}>
                        {({
                          rows,
                          headers,
                          getHeaderProps,
                          getRowProps,
                          getTableProps,
                          getTableContainerProps,
                        }) => (
                          <TableContainer
                            {...getTableContainerProps()}>
                            <Table {...getTableProps()} isSortable>
                              <TableHead>
                                <TableRow>
                                  {headers.map((header) => (
                                    <TableHeader
                                      key={header.key}
                                      {...getHeaderProps({ header })}
                                      >
                                      {header.header}
                                    </TableHeader>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.id} {...getRowProps({ row })} style={{textAlign:"center", borderBottom: "2px solid black"}}>
                                    {row.cells.map((cell) => (
                                      <TableCell key={cell.id}>{cell.value}</TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </DataTable> */}
                      <div>
                        <br></br> <br></br>
                      </div>
                      <Button
                        kind="primary"
                        className="b-action"
                        kind="tertiary d"
                        size="default"
                        onClick={() => goToRequirement(row.cells[0].value)}
                      >
                        Ver Requerimiento
                      </Button>
                      <Button
                        className="custom-class"
                        kind="tertiary a_1"
                        size="default"
                        onClick={() => aprobarReq(row.cells[0].value)}
                      >
                        Aprobar
                      </Button>
                      {/* <Button className="custom-class" kind='tertiary b_1'size='default'>
                        Rechazar
                      </Button> */}
                      <ModalStateManager
                        renderLauncher={({ setOpen }) => (
                          <Button
                            className="custom-class"
                            kind="tertiary b_1"
                            size="default"
                            onClick={() => setOpen(true)}
                          >
                            Rechazar
                          </Button>
                        )}
                      >
                        {({ open, setOpen }) => (
                          <Modal
                            modalHeading="Observaciones"
                            primaryButtonText="Guardar"
                            secondaryButtonText="Cancelar"
                            open={open}
                            onRequestClose={() => setOpen(false)}
                          >
                            <p style={{ marginBottom: "1rem" }}>
                              Escriba las observaciones correspondientes
                            </p>
                            <TextArea
                              data-modal-primary-focus
                              id="text-area-1"
                              placeholder="Escriba aquí..."
                              // style={{ marginBottom: "1rem", borderRadius: '6px', border: "3px solid black" }}
                            />
                          </Modal>
                        )}
                      </ModalStateManager>
                      <div className="bx--row"></div>
                    </TableExpandedRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>

      <div className="bx--row">
        {/* <div className="row-action">
          <div className="bx--row"/>
            <div className="bx--col">
              <Button className="custom-class" kind='tertiary f' renderIcon={DocumentDownload32} size='default' onClick={() => this.exportReportToExcel(this)}>
                Excel
              </Button>
            </div>
        </div> */}
      </div>
      <div className="bx--col">
        <Button className="custom-class" kind="tertiary a_1" size="default" >
          Aprobados
        </Button>
        <ModalStateManager
          renderLauncher={({ setOpen }) => (
            <Button
              className="custom-class"
              kind="tertiary b_1"
              size="default"
              onClick={() => setOpen(true)}
            >
              Rechazados
            </Button>
          )}
        >
          {({ open, setOpen }) => (
            <Modal
              modalHeading="Observaciones"
              primaryButtonText="Guardar"
              secondaryButtonText="Cancelar"
              open={open}
              onRequestClose={() => setOpen(false)}
            >
              <p style={{ marginBottom: "1rem" }}>
                Escriba las observaciones correspondientes
              </p>
              <TextArea
                data-modal-primary-focus
                id="text-area-1"
                placeholder="Escriba aquí..."
                // style={{ marginBottom: "1rem", borderRadius: '6px', border: "3px solid black" }}
              />
            </Modal>
          )}
        </ModalStateManager>
      </div>
    </div>
  );
}
// export default CourseStaffRequirement;
/*{rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}*/
