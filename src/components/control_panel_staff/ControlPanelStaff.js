import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";
import { Email32, DocumentDownload32 } from "@carbon/icons-react";
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
  TableSelectAll,
  TableSelectRow,
  TextArea,
  Select,
  SelectItem
} from "carbon-components-react";
import { headerData, monthList, yearList } from "./sampleData";
import "./ControlPanelStaff.scss";
import { fetchListRequest, sendRequestApprover } from "../../services/api/servicies";

const ContentTable = forwardRef(({ goToRequirement, aprobarReq, rechazarReq, obsValue, ...props}, ref)=> {
  const {
    rows,
    headers,
    getHeaderProps,
    getTableProps,
    getRowProps,
    getSelectionProps,
    selectAll,
    selectRow,
    selectedRows 
  } = props;

  useImperativeHandle(ref, ()=> ({
    getSelectedRows: ()=> selectedRows
  }))

  return (
  <TableContainer className="SolicitudesRP">
    <Table {...getTableProps()} size="compact">
      <TableHead>
        <TableRow>
          <TableSelectAll {...getSelectionProps()} />
            {headers.map((header) => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
              <TableSelectRow {...getSelectionProps({ row })}/>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>
                  {cell.value}
                  {(cell.value === false || cell.value === true) && (
                  <input
                    type="checkbox"
                    style={{ height: "25px", width: "100px" }}
                  ></input>
                )}</TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
})

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
  position: 4,
  name: "",
  apPaterno: "",
  apMaterno: "",
  codeSuperior: "0",
  approverRole: 4
}
export default function ControlPanelStaff(props) {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [obsValue, setObsValue] = useState("Este requerimiento no es conforme")
  const [listRequest, setListRequest] = useState([])
  const [infRequest, setInfRequest] = useState([])
  const table = useRef();

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
      const requestFromServer = await fetchListRequest();
      setListRequest(requestFromServer);
      setInfRequest(() => {
        const dataReq = requestFromServer.map((req) => {
            return {
              id: req.id, 
              index: req.id, 
              state: req.state.description,
              _original: req,
              society: req.society.description, 
              position: req.position.description,
              typeOfVacant: req.type.description,
              codOfVacant: req.position.codePosition,
              replaceOf: (req.listReplacement.length === 0) ? "" :
                        (<ModalStateManager
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
                              onRequestSubmit={() =>  setOpen(false)}
                              onRequestClose={() => setOpen(false)}
                            >
                              <TextArea
                                readOnly
                                data-modal-primary-focus
                                id="textListReemp_2"
                                defaultValue={req.listReplacement.map(index => {
                                  return (index.codigo + " " + index.apPaterno + " " + index.apMaterno + ", " + index.name + "\n" +
                                          "Puesto: " + index.position.codePosition + " " + index.position.description + "\n" + "\n")
                                  })}
                              />
                            </Modal>
                          )}
                        </ModalStateManager>),
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
                            onClick={() => onClickVerReq(req)}
                          >
                            Ver
                          </Button>),
              observation: req.observation,
              dateState: req.timeStatus,
              status: req.flow.section,
              check: false}
        });
        return dataReq;
      })
    };
    getRequest();
  }, []);

  const handleCheck = (e) => {
    if (!this.state.checkedStatus) {
      this.setState({
        checkedStatus: true,
      });
    } else {
      this.setState({
        checkedStatus: false,
      });
    }
  };

  const goToRequirement = () => {
    const selectedRows = table.current.getSelectedRows();
    if(selectedRows.length > 0){
      selectedItem = selectedRows[0].id
      console.log(listRequest)
      selectedRow = listRequest.filter((item) => {
        return item.id === selectedItem;
      });
    }
    else{
      selectedItem = 0
    }
    console.log(listRequest)
    // console.log(selectedItem)
    console.log(selectedRow)
    // props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
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
    // const requestSend = await sendRequestApprover(data)
    // props.history.go(0)
  }

  const rechazarReq = async (index, textAreaValue) => {
    const data = {}

    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    // console.log(selectedItem);
    console.log(selectedRow);
    // setObsValue(document.getElementById("textRejectAlone").value)
    data.request = {
      id: selectedRow[0].id,
      observation: textAreaValue,
      flow: selectedRow[0].flow.id,
      state: 4,
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    console.log(JSON.stringify(data))
    // const requestSend = await sendRequestReject(data)
    // props.history.go(0)
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

  const renderContentTable = (props) => {
    return <ContentTable
        ref={table} 
        goToRequirement={goToRequirement} 
        aprobarReq={aprobarReq} 
        rechazarReq={rechazarReq} 
        obsValue={obsValue}
        {...props} 
    />;
  }

  const onClickAprobar = async () => {
    let data = {}
    const selectedRows = table.current.getSelectedRows();

    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        flow: item.flow.id < 6 ? 5 : 9, //Flow siguiente
        state: 2,
        approver: userReq.approverRole, //id del usuario
        dateApproved: new Date().today() + " T " + new Date().timeNow(),
      
    }))

    console.log(JSON.stringify(data))
    const requestSend = await sendRequestApprover(data)
    props.history.go(0)
    // console.log(selectedRows);
    // console.log(listSelectedRows)
  }

  const onClickVerReq = (index) => {
    console.log(index)
    const selectedRows = table.current.getSelectedRows();
    if(selectedRows.length > 0){
      selectedItem = selectedRows[0].id
      selectedRow = listRequest.filter((item) => {
        return item.id === selectedItem;
      });
    }
    else{
      selectedItem = 0
    }
    console.log(listRequest)
    // console.log(selectedItem)
    console.log(selectedRow)
    // props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
    // const selectedRows = table.current.getSelectedRows();
    // selectedRow = listRequest.filter((item) => {
    //   return item.id === selectedRows[0].id;
    // });
    // console.log(copyListReq)
    // console.log(selectedRows[0]);
    // console.log(selectedRow)
  }

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
        <span className="b">
          20 <br></br> <br></br> Creados
        </span>
        <span> </span>
        <span className="c">
          10 <br></br> <br></br> No Aprobado
        </span>
        <span> </span>
        <span className="d">
          700 <br></br> <br></br> En Proceso
        </span>
        <span> </span>
        <span className="e">
          50 <br></br> <br></br> Observados
        </span>
        <span> </span>
        <span className="c">
          200 <br></br> <br></br> Rechazados
        </span>
        <span> </span>
        <span className="g">
          50 <br></br> <br></br> Aprobados
        </span>
        <span> </span>
        <span className="f">
          30 <br></br> <br></br> Enviados
        </span>
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
            id="societySelect"
            invalidText="This is an invalid error message."
            labelText="Sociedad"
            light
          >
            <SelectItem
              text="Seleccione Sociedad"
              value="placeholder-item"
              hidden
            />
            <SelectItem text="Centro" value="1" />
          </Select>
        </div>

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
        {renderContentTable}
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
          {(userReq.approverRole === 4) && (<div className="bx--col">
            <Button
              className="custom-class"
              kind="tertiary a_1"
              size="default"
              onClick={onClickAprobar}
            >
              Aprobar
            </Button>
          </div>)}
        </div>
      </div>
      <div className="bx--col">
        <Button
          className="custom-class"
          kind="tertiary a"
          renderIcon={Email32}
          size="default"
        >
          Aprobados
        </Button>
        <Button
          className="custom-class"
          kind="tertiary b"
          renderIcon={Email32}
          size="default"
        >
          Rechazados
        </Button>
        <Button
          className="custom-class"
          kind="tertiary c"
          renderIcon={Email32}
          size="default"
        >
          Observados
        </Button>
      </div>
    </div>
  );
}
