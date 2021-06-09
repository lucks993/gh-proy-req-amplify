import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";
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
import { headerData } from "./sampleData";
import "./CourseStaffRequirement.scss";
import { fetchRequest, sendRequestApprover, sendRequestReject, sendRequestObserve } from "../../services/api/servicies";

const ModalRechazo = ({rechazarReq, row })=> {
  
  const textArea = useRef();

  const onRequestSubmit = () => {
    rechazarReq(row.cells[0].value, textArea.current.value)
  }

  return (
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
          onRequestSubmit={onRequestSubmit}
          onRequestClose={() => setOpen(false)}
        >
          <p style={{ marginBottom: "1rem" }}>
            Escriba las observaciones correspondientes
          </p>
          <TextArea
            ref={textArea}
            data-modal-primary-focus
            id="textRejectAlone"
            placeholder="Escriba aquí..."
            defaultValue="Este requerimiento no es conforme"
          />
        </Modal>
      )}
    </ModalStateManager>
  )
}

const ModalObservado = ({observarReq, row })=> {
  
  const textArea = useRef();

  const onRequestSubmit = () => {
    observarReq(row.cells[0].value, textArea.current.value)
  }

  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button
          className="custom-class"
          kind="tertiary c_1"
          size="default"
          onClick={() => setOpen(true)}
        >
          Observar
        </Button>
      )}
    >
      {({ open, setOpen }) => (
        <Modal
          modalHeading="Observaciones"
          primaryButtonText="Guardar"
          secondaryButtonText="Cancelar"
          open={open}
          onRequestSubmit={onRequestSubmit}
          onRequestClose={() => setOpen(false)}
        >
          <p style={{ marginBottom: "1rem" }}>
            Escriba las observaciones correspondientes
          </p>
          <TextArea
            ref={textArea}
            data-modal-primary-focus
            id="textRejectAlone"
            placeholder="Escriba aquí..."
            defaultValue="Este requerimiento no es conforme"
          />
        </Modal>
      )}
    </ModalStateManager>
  )
}

const ContentTable = forwardRef(({goToRequirement, aprobarReq, rechazarReq, observarReq, obsValue, ...props}, ref)=> {
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
              <TableSelectRow {...getSelectionProps({ row })}/>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableExpandRow>
            <TableExpandedRow
              colSpan={headers.length + 2}
              className="demo-expanded-td"
            >
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
              <ModalRechazo rechazarReq={rechazarReq} row={row} />
              {(userReq.approverRole === 4 || userReq.approverRole === 5 || userReq.approverRole === 6) &&
              (<ModalObservado observarReq={observarReq} row={row} />)}

              <div className="bx--row"></div>
            </TableExpandedRow>
          </React.Fragment>
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
export let selectedRow = null;
let userReq = {
  id: 2,
  position: 2,
  name: "",
  apPaterno: "",
  apMaterno: "",
  codeSuperior: "0",
  approverRole: 5
}
// const [listRow, setListRow] = useState([])
export default function CourseStaffRequirement(props) {
  const [listRequest, setListRequest] = useState([]);
  const [obsValue, setObsValue] = useState("Este requerimiento no es conforme")
  const [infRequest, setInfRequest] = useState([]);
  const textArea2 = useRef()
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
      const requestFromServer = await fetchRequest();
      setListRequest(requestFromServer);
      setInfRequest(() => {
        const dataReq = requestFromServer.map((req) => {
          return {
            id: req.id,
            index: req.id,
            _original: req,
            society: req.society.description,
            position: req.position.description,
            new: req.type.description,
            nameNew: (req.listReplacement.length === 0) ? "" :
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
                      return ("Trabajador: " + index.codigo + " " + index.apPaterno + " " + index.apMaterno + ", " + index.name + "\n" + "\n")
                    })}
                  />
                </Modal>
              )}
            </ModalStateManager>),
            quantity: req.quantity,
            unity_org: req.orgUnit.description,
            cost_center: req.costCenter.description,
            location: req.physLocation.description,
            date: req.requestDate,
            approvers: (req.listApprovers.length === 0) ? "" :
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
                  modalHeading="Lista Aprobadores"
                  passiveModal
                  secondaryButtonText={null}
                  open={open}
                  onRequestSubmit={() =>  setOpen(false)}
                  onRequestClose={() => setOpen(false)}
                >
                  <TextArea
                    readOnly
                    data-modal-primary-focus
                    id="textListApprov_2"
                    defaultValue={req.listApprovers.map(index => {
                      return ("Aprobador: "+ index.approver.person.codigo + " " + index.approver.person.apPaterno +
                                  " " + index.approver.person.apMaterno + ", " + index.approver.person.name + "\n" +
                              "Fecha: " + index.approbalDate + "\n" + "\n")
                    })}
                  />
                </Modal>
              )}
            </ModalStateManager>),
          };
        });
        return dataReq;
      });
    };
    getRequest();
  }, []);

  const goToRequirement = (item) => {
    selectedItem = item;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    // console.log(selectedItem)
    // console.log(selectedRow)
    props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
  };

  const aprobarReq = async (index) => {
    let data = {}

    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    console.log(selectedRow);
    let req = {
      id: selectedRow[0].id,
      flowID: selectedRow[0].flow.id,
      flowType: selectedRow[0].flow.type,
      flowSeq: selectedRow[0].flow.sequence,
      state: selectedRow[0].state.id,
      reqConf: selectedRow[0].approvedLevel,
      // flow: (selectedRow[0].flow.id === 1 && userReq.codeSuperior !== "0") ? 1 :
      //       (selectedRow[0].flow.id < 6 ? (selectedRow[0].flow.id + 1) : (selectedRow[0].flow.id === 6 ? selectedRow[0].flow.id :
      //                                     (selectedRow[0].flow.id < 10 ? (selectedRow[0].flow.id + 1) : selectedRow[0].flow.id))), //Flow siguiente
      // state: (selectedRow[0].approvedLevel === 0 && selectedRow[0].flow.id === 2) ? 3 :
      //        (selectedRow[0].flow.id < 6 ? 2 : (selectedRow[0].flow.id === 6 ? 3 :
      //                                     (selectedRow[0].flow.id < 10 ? 2 : 3))),
      userCodeSup: userReq.codeSuperior,
      approverID: userReq.id,             //ID del usuario
      approverRole: userReq.approverRole, //Rol del usuario
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }

    data.request = [req]
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestApprover(data)
    props.history.go(0)
  }

  const rechazarReq = async (index, textAreaValue) => {
    let data = {}

    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    console.log(selectedRow);
    let req = {
      id: selectedRow[0].id,
      observation: textAreaValue,
      flow: selectedRow[0].flow.id,
      state: 4,
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    data.request = [req]
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestReject(data)
    props.history.go(0)
  }

  const observarReq = async (index, textAreaValue) => {
    let data = {}

    selectedItem = index;
    selectedRow = listRequest.filter((item) => {
      return item.id === selectedItem;
    });
    console.log(selectedRow);
    let req = {
      id: selectedRow[0].id,
      observation: textAreaValue,
      flow: selectedRow[0].flow.id,
      state: 5,
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    data.request = [req]
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestObserve(data)
    props.history.go(0)
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

  const renderContentTable = (props) => {
    return <ContentTable 
        ref={table}
        goToRequirement={goToRequirement} 
        aprobarReq={aprobarReq} 
        rechazarReq={rechazarReq}
        observarReq={observarReq} 
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
        flowID: item.flow.id,
        flowType: item.flow.type,
        flowSeq: item.flow.sequence,
        state: item.state.id,
        reqConf: item.approvedLevel,
        // flow: (item.flow.id === 1 && userReq.codeSuperior !== "0") ? 1 :
        //       (item.flow.id < 6 ? (item.flow.id + 1) : (item.flow.id === 6 ? item.flow.id :
        //                                     (item.flow.id < 10 ? (item.flow.id + 1) : item.flow.id))), //Flow siguiente
        // state: (item.approvedLevel === 0 && item.flow.id === 2) ? 3 :
        //       (item.flow.id < 6 ? 2 : (item.flow.id === 6 ? 3 :
        //                                     (item.flow.id < 10 ? 2 : 3))),
        userCodeSup: userReq.codeSuperior,  //Cod Sup
        approverID: userReq.id,             //ID del usuario
        approverRole: userReq.approverRole, //Rol del usuario
        dateApproved: new Date().today() + " T " + new Date().timeNow(),
      
    }))

    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestApprover(data)
      props.history.go(0)
    }
    // console.log(selectedRows);
    // console.log(listSelectedRows)
  }

  const onClickRechazar = async () => {
    let data = {}

    const selectedRows = table.current.getSelectedRows();

    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        observation: textArea2.current.value,
        flow: item.flow.id,
        state: 4,
        dateApproved: new Date().today() + " T " + new Date().timeNow(),
    
    }))
    // console.log(selectedRows);
    console.log(JSON.stringify(data))
    // console.log(textArea2.current.value)
    if(data.request.length > 0){
      const requestSend = await sendRequestReject(data)
      props.history.go(0)
    }
  }

  const onClickObservar = async () => {
    let data = {}

    const selectedRows = table.current.getSelectedRows();

    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        observation: textArea2.current.value,
        flow: item.flow.id,
        state: 5,
        dateApproved: new Date().today() + " T " + new Date().timeNow(),
    
    }))
    // console.log(selectedRows);
    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestObserve(data)
      props.history.go(0)
    }
  }

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
        {renderContentTable}
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
        <Button className="custom-class" kind="tertiary a_1" size="default" onClick={onClickAprobar} >
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
              onRequestSubmit={onClickRechazar}
              onRequestClose={() => setOpen(false)}
            >
              <p style={{ marginBottom: "1rem" }}>
                Escriba las observaciones correspondientes
              </p>
              <TextArea
                ref={textArea2}
                data-modal-primary-focus
                id="textRejectAll"
                placeholder="Escriba aquí..."
                // style={{ marginBottom: "1rem", borderRadius: '6px', border: "3px solid black" }}
              />
            </Modal>
          )}
        </ModalStateManager>
        {(userReq.approverRole === 4 || userReq.approverRole === 5 || userReq.approverRole === 6) && 
        (<ModalStateManager
          renderLauncher={({ setOpen }) => (
            <Button
              className="custom-class"
              kind="tertiary c_1"
              size="default"
              onClick={() => setOpen(true)}
            >
              Observados
            </Button>
          )}
        >
          {({ open, setOpen }) => (
            <Modal
              modalHeading="Observaciones"
              primaryButtonText="Guardar"
              secondaryButtonText="Cancelar"
              open={open}
              onRequestSubmit={onClickObservar}
              onRequestClose={() => setOpen(false)}
            >
              <p style={{ marginBottom: "1rem" }}>
                Escriba las observaciones correspondientes
              </p>
              <TextArea
                ref={textArea2}
                data-modal-primary-focus
                id="textRejectAll"
                placeholder="Escriba aquí..."
                // style={{ marginBottom: "1rem", borderRadius: '6px', border: "3px solid black" }}
              />
            </Modal>
          )}
        </ModalStateManager>)}
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
