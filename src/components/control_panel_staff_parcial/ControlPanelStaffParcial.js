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
  ComboBox,
  TextArea,
} from "carbon-components-react";
import { headerData, monthList, yearList } from "./sampleData";
import "./ControlPanelStaffParcial.scss";
import { fetchListRequest, fetchOrganizationalUnits, fetchTypeState, fetchTypeRequirements } from "../../services/api/servicies";

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
  const [listRequest, setListRequest] = useState([]);
  const [infRequest, setInfRequest] = useState([]);
  const [infCopyRequest, setInfCopyRequest] = useState([]);
  const [cantCreado, setCantCreado] = useState(0)
  const [cantNoAprob, setCantNoAprob] = useState(0)
  const [cantProc, setCantProc] = useState(0)
  const [cantObs, setCantObs] = useState(0)
  const [cantRech, setCantRech] = useState(0)
  const [cantAprob, setCantAprob] = useState(0)
  const [monthSelect, setMonthSelect] = useState(null);
  const [yearSelect, setYearSelect] = useState(null);
  const [listOrgUnit, setListOrgUnit] = useState([]);
  const [listState, setListState] = useState([]);
  const [listTypeReq, setListTypeReq] = useState([]);
  const [orgUnitSelect, setOrgUnitSelect] = useState(null);
  const [stateSelect, setStateSelect] = useState(null);
  const [typeReqSelect, seTypeReqSelect] = useState(null);

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
        const dataReq = requestFromServer.map((req) => {
          return {
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
            check: req.sendReq
          };
        });
        return dataReq;
      });
      setInfCopyRequest(() => {
        const dataReq = requestFromServer.map((req) => {
          return {
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
            check: req.sendReq
          };
        });
        return dataReq;
      });
    };
    getRequest();
  }, []);

  //Fetch Organizational Unit
  useEffect(() => {
    const getOrganizationalUnit = async () => {
      const orgUnitFromServer = await fetchOrganizationalUnits();
      setListOrgUnit(orgUnitFromServer);
    };
    getOrganizationalUnit();
  }, []);

  //Fetch Type State
  useEffect(() => {
    const getTypeState = async () => {
      const stateFromServer = await fetchTypeState();
      setListState(stateFromServer);
    };
    getTypeState();
  }, []);

  //Fetch Type Requirement
  useEffect(() => {
    const getTypeRequest = async () => {
      const typeRequestFromServer = await fetchTypeRequirements();
      setListTypeReq(typeRequestFromServer);
    };
    getTypeRequest();
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

  const newTable = (item, data) => {
    if(!!item && !!data){
      let newList = infRequest.filter(index => 
          infCopyRequest.find(key => index.dateState.slice(5,7) === item.value && key.dateState.slice(5,7) === item.value &&
                                      index.dateState.slice(0,4) === data.name && key.dateState.slice(0,4) === data.name))
      setInfCopyRequest(newList)
    }
    else{
      setInfCopyRequest(infRequest)
    }
  }

  const newTableSubState = (item) => {
    if(!!item){
      let newList = infRequest.filter(index => 
          infCopyRequest.find(key => 
            (item.description !== 'Enviado') ? (index.state === item.description && key.state === item.description)
                                             : (index.check === 1 && key.state === 1)))
      setInfCopyRequest(newList)
    }
    else{
      setInfCopyRequest(infRequest)
      setOrgUnitSelect(null)
      seTypeReqSelect(null)
    }
  }

  const newTableSubOrgUnit = (item) => {
    if(!!item){
      let newList = infRequest.filter(index => 
          infCopyRequest.find(key => index.orgUnit === item.description && key.orgUnit === item.description))
      setInfCopyRequest(newList)
    }
    else{
      setInfCopyRequest(infRequest)
      setStateSelect(null)
      seTypeReqSelect(null)
    }
  }

  const newTableSubTypeReq = (item) => {
    if(!!item){
      let newList = infRequest.filter(index => 
          infCopyRequest.find(key => index.typeOfVacant === item.description && key.typeOfVacant === item.description))
      setInfCopyRequest(newList)
    }
    else{
      setInfCopyRequest(infRequest)
      setStateSelect(null)
      setOrgUnitSelect(null)
    }
  }

  const monthSelectChange = (item) => {
      if(!!item){
          setMonthSelect(item.selectedItem)
          newTable(item.selectedItem, yearSelect)
      }
      else{
          setMonthSelect(null)
          setInfCopyRequest(infRequest)
      }
  }

  const yearSelectChange = (item) => {
      if(!!item){
          setYearSelect(item.selectedItem)
          newTable(monthSelect, item.selectedItem)
      }
      else{
          setYearSelect(null)
          setInfCopyRequest(infRequest)
      }
  }

  const stateSelectChange = (item) => {
    if(!!item){
        setStateSelect(item.selectedItem)
        newTableSubState(item.selectedItem)
    }
    else{
        setStateSelect(null)
        setInfCopyRequest(infRequest)
    }
  }

  const orgUnitSelectChange = (item) => {
    if(!!item){
        setOrgUnitSelect(item.selectedItem)
        newTableSubOrgUnit(item.selectedItem)
    }
    else{
        setOrgUnitSelect(null)
        setInfCopyRequest(infRequest)
    }
  }

  const typeReqSelectChange = (item) => {
    if(!!item){
        seTypeReqSelect(item.selectedItem)
        newTableSubTypeReq(item.selectedItem)
    }
    else{
        seTypeReqSelect(null)
        setInfCopyRequest(infRequest)
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
          <ComboBox
            onChange={(item) => {monthSelectChange(item)}}
            id="comboMes"
            light
            selectedItem={monthSelect}
            items={monthList}
            itemToString={(item) => (item ? item.name : "")}
            placeholder="Escriba mes..."
            titleText="Mes"
            shouldFilterItem={({ item: { name }, inputValue }) => 
            name.toLowerCase().includes(inputValue.toLowerCase())}
          />
        </div>

        <div className="bx--col">
          <ComboBox
            onChange={(item) => {yearSelectChange(item)}}
            id="comboYear"
            light
            selectedItem={yearSelect}
            items={yearList}
            itemToString={(item) => (item ? item.name : "")}
            placeholder="Escriba año..."
            titleText="Año"
            shouldFilterItem={({ item: { name }, inputValue }) => 
            name.toLowerCase().includes(inputValue.toLowerCase())}
          />
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
          <ComboBox
            onChange={(item) => {stateSelectChange(item)}}
            id="comboTipoEstado"
            light
            selectedItem={stateSelect}
            items={listState}
            itemToString={(item) => (item ? item.description : "")}
            placeholder="Escriba tipo estado..."
            titleText="Estado"
            shouldFilterItem={({ item: { description }, inputValue }) => 
            description.toLowerCase().includes(inputValue.toLowerCase())}
          />
        </div>

        <div className="bx--col">
          <ComboBox
            onChange={(item) => {orgUnitSelectChange(item)}}
            id="comboOrgUnit"
            light
            selectedItem={orgUnitSelect}
            items={listOrgUnit}
            itemToString={(item) => (item ? item.description : "")}
            placeholder="Escriba Unidad..."
            titleText="Unidad Organizacional"
            shouldFilterItem={({ item: { description }, inputValue }) => 
            description.toLowerCase().includes(inputValue.toLowerCase())}
          />
        </div>

        <div className="bx--col">
          <ComboBox
            onChange={(item) => {typeReqSelectChange(item)}}
            id="comboTipoReq"
            light
            selectedItem={typeReqSelect}
            items={listTypeReq}
            itemToString={(item) => (item ? item.description : "")}
            placeholder="Escriba tipo vacante..."
            titleText="Vacante"
            shouldFilterItem={({ item: { description }, inputValue }) => 
            description.toLowerCase().includes(inputValue.toLowerCase())}
          />
        </div>
      </div>
      <DataTable rows={infCopyRequest} headers={headerData}>
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
