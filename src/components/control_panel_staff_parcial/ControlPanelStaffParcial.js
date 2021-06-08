import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DocumentDownload32 } from "@carbon/icons-react";
import TableToExcel from "@linways/table-to-excel";
import "carbon-components/css/carbon-components.min.css";
import {
  Button,
  DataTable,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Select,
  SelectItem,
  TextArea,
} from "carbon-components-react";
import { headerData, monthList, yearList } from "./sampleData";
import "./ControlPanelStaffParcial.scss";
import { fetchListRequest } from "../../services/api/servicies";

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
let selectedRow = {};
export let selectedRow3 = null;

export default function ControlPanelStaffParcial(props) {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [listRequest, setListRequest] = useState([]);
  const [infRequest, setInfRequest] = useState([]);
  const [cantCreado, setCantCreado] = useState(0)
  const [cantNoAprob, setCantNoAprob] = useState(0)
  const [cantProc, setCantProc] = useState(0)
  const [cantObs, setCantObs] = useState(0)
  const [cantRech, setCantRech] = useState(0)
  const [cantAprob, setCantAprob] = useState(0)

  //Fetch Requirement Request Employee
  useEffect(() => {
    const getRequest = async () => {
      const requestFromServer = await fetchListRequest();
      setListRequest(requestFromServer);
      setCantCreado(requestFromServer.filter(function(item){
        return item.state.description === "Creado"
      }).length)
      setCantNoAprob(requestFromServer.filter(function(item){
        return item.state.description === "No Aprobado"
      }).length)
      setCantProc(requestFromServer.filter(function(item){
        return item.state.description === "En Proceso"
      }).length)
      setCantObs(requestFromServer.filter(function(item){
        return item.state.description === "Observado"
      }).length)
      setCantRech(requestFromServer.filter(function(item){
        return item.state.description === "Rechazado"
      }).length)
      setCantAprob(requestFromServer.filter(function(item){
        return item.state.description === "Aprobado"
      }).length)
      setInfRequest(() => {
        const dataReq = [{}];
        requestFromServer.map((req) => {
          dataReq[req.id - 1] = {
            id: req.id.toString(),
            index: req.id,
            state: req.state.description,
            position: req.position.description,
            typeOfVacant: req.type.description,
            codOfVacant: req.position.codePosition,
            replaceOf:
              req.listReplacement.length === 0 ? (
                ""
              ) : (
                <ModalStateManager
                  renderLauncher={({ setOpen }) => (
                    <Button
                      className="custom-class"
                      kind="tertiary d"
                      size="default"
                      onClick={() => setOpen(true)}
                    >
                      Ver
                    </Button>
                  )}
                >
                  {({ open, setOpen }) => (
                    <Modal
                      modalHeading="Lista Reemplazo"
                      passiveModal
                      secondaryButtonText={null}
                      open={open}
                      onRequestSubmit={() => setOpen(false)}
                      onRequestClose={() => setOpen(false)}
                    >
                      <TextArea
                        readOnly
                        data-modal-primary-focus
                        id="textListReemp_2"
                        defaultValue={req.listReplacement.map((index) => {
                          return (
                            index.codigo +
                            " " +
                            index.apPaterno +
                            " " +
                            index.apMaterno +
                            ", " +
                            index.name +
                            "\n" +
                            "Puesto: " +
                            index.position.codePosition +
                            index.position.description +
                            "\n" +
                            "\n"
                          );
                        })}
                      />
                    </Modal>
                  )}
                </ModalStateManager>
              ),
            orgUnit: req.orgUnit.description,
            centerOfCost: req.costCenter.description,
            physicLocation: req.physLocation.description,
            category: req.search.description,
            quantity: req.quantity,
            typeOfContract: req.contract.description,
            timeOfContract: req.timeService,
            justify: req.justification,
            description: (<Button
                          className="custom-class"
                          kind="tertiary d"
                          size="default"
                          onClick={() => onClickVerReq(req, requestFromServer)}
                        >
                          Ver
                        </Button>),
            observation: req.observation,
            dateState: req.timeStatus,
            status: req.flow.section,
          };
        });
        return dataReq;
      });
    };
    getRequest();
  }, []);

  const onClickVerReq = (index, list) => {
    console.log(index)
    console.log(list)
    selectedItem = index.id
    console.log("selectedRow3: "+selectedRow3)
    selectedRow3 = list.filter((item) => {
      return item.id === index.id;
    });
    console.log("SelectedRow3: "+selectedRow3) 
    console.log("SelectedRow3[0].id: "+selectedRow3[0].id)
    console.log("selectedItem: "+selectedItem)
    if(selectedItem !== 0){
      props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
    }
  }

  const exportReportToExcel = () => {
    let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table[0], {
      // html code may contain multiple tables so here we are refering to 1st table tag
      name: `TableroControl.xlsx`, // fileName you could use any name
      sheet: {
        name: "Sheet 1", // sheetName
      },
    });
  };

  return (
    <div className="bg--grid">
      <h2 className="center_titles">
        Tablero de Control de Requerimiento de Personal
      </h2>
      <div>
        <br></br> <br></br>
      </div>
      <div className="bx--row" style={{ marginBottom: "1.2rem" }}>
        <div className="bx--col">
          <Select
            defaultValue="placeholder-item"
            id="monthSelect"
            invalidText="This is an invalid error message."
            labelText="MES"
            light
          >
            <SelectItem text="Seleccione mes" value="placeholder-item" hidden />
            {monthList.map((month) => (
              <SelectItem
                key={month.id}
                text={month.name}
                value={month.value}
              />
            ))}
          </Select>
        </div>

        <div className="bx--col">
          <Select
            defaultValue="placeholder-item"
            id="yearSelect"
            invalidText="This is an invalid error message."
            labelText="AÑO"
            light
          >
            <SelectItem text="Seleccione año" value="placeholder-item" hidden />
            {yearList.map((year) => (
              <SelectItem
                key={year.id.toString()}
                text={year.value.toString()}
                value={year.value}
              />
            ))}
          </Select>
        </div>
      </div>
      <div>
        <br></br>
      </div>
      <div className="center_titles">
        <span class="b">
          {cantCreado} <br></br> <br></br> Creados
        </span>
        <span> </span>
        <span class="c">
          {cantNoAprob} <br></br> <br></br> No Aprobado
        </span>
        <span> </span>
        <span class="d">
          {cantProc} <br></br> <br></br> En Proceso
        </span>
        <span> </span>
        <span class="e">
          {cantObs} <br></br> <br></br> Observados
        </span>
        <span> </span>
        <span class="c">
          {cantRech} <br></br> <br></br> Rechazados
        </span>
        <span> </span>
        <span class="g">
          {cantAprob} <br></br> <br></br> Aprobados
        </span>
        <span> </span>
      </div>
      <div>
        <br></br>
      </div>
      <div
        className="bx--row"
        style={{
          border: "4px solid #7a8db3",
          marginBottom: "1.2rem",
          borderRadius: "6px",
        }}
      >
        <div className="bx--col">
          <Select
            defaultValue="placeholder-item"
            id="stateSelect"
            invalidText="This is an invalid error message."
            labelText="Estado"
            light
          >
            <SelectItem text="Tipo de estado" value="placeholder-item" hidden />
            <SelectItem text="Creado" value="1" />
            <SelectItem text="En Proceso" value="2" />
          </Select>
        </div>

        <div className="bx--col">
          <Select
            defaultValue="placeholder-item"
            id="unitySelect"
            invalidText="This is an invalid error message."
            labelText="Unidad Organizativa"
            light
          >
            <SelectItem
              text="Seleccione Unidad"
              value="placeholder-item"
              hidden
            />
            <SelectItem text="Opción 1" value="1" />
          </Select>
        </div>

        <div className="bx--col">
          <Select
            defaultValue="placeholder-item"
            id="vacantSelect"
            invalidText="This is an invalid error message."
            labelText="Vacante"
            light
          >
            <SelectItem
              text="Tipo de vacante"
              value="placeholder-item"
              hidden
            />
            <SelectItem text="Nuevo" value="1" />
            <SelectItem text="Reemplazo" value="2" />
          </Select>
        </div>
      </div>
      <DataTable rows={infRequest} headers={headerData}>
        {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
          <TableContainer title="">
            <Table {...getTableProps()} size="compact">
              <TableHead>
                <TableRow>
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
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>

      <div className="bx--row">
        <div className="row-action">
          <div className="bx--row" />
          <div className="bx--col">
            <Button
              className="custom-class"
              kind="tertiary f"
              renderIcon={DocumentDownload32}
              size="default"
              onClick={() => exportReportToExcel(this)}
            >
              Excel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
