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
  ComboBox
} from "carbon-components-react";
import { headerData, monthList } from "./sampleData";
import "./ControlPanelStaff.scss";
import { fetchListRequest, sendRequestApprover, 
  fetchSocieties, fetchOrganizationalUnits, fetchTypeState, fetchTypeRequirements, sendRequestMail } from "../../services/api/servicies";

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
                  {/* {(cell.value === false || cell.value === true) && (
                  <input
                    type="checkbox"
                    style={{ height: "25px", width: "100px" }}
                  ></input>
                )} */}
                </TableCell>
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
let selectedRow = {};
export let selectedRow2 = null;
let userReq = {
  id: 4,
  position: 4,
  name: "",
  apPaterno: "",
  apMaterno: "",
  codeSuperior: "0",
  approverRole: 6
}

const showListYear = () => {
  let actualDate = new Date
  let actualYear = actualDate.getFullYear()
  let yearListTemp = []
  var i
  for(i = 1; i <= 11; i++){
      yearListTemp.push({
          id: i,
          name: String(actualYear -6 + i),
          value: (actualYear -6 + i)
      })
  }
  return yearListTemp
}

export default function ControlPanelStaff(props) {
  const [obsValue, setObsValue] = useState("Este requerimiento no es conforme")
  const [listRequest, setListRequest] = useState([])
  const [infRequest, setInfRequest] = useState([])
  const [infCopyRequest, setInfCopyRequest] = useState([]);
  const [cantCreado, setCantCreado] = useState(0)
  const [cantNoAprob, setCantNoAprob] = useState(0)
  const [cantProc, setCantProc] = useState(0)
  const [cantObs, setCantObs] = useState(0)
  const [cantRech, setCantRech] = useState(0)
  const [cantAprob, setCantAprob] = useState(0)
  const [cantEnv, setCantEnv] = useState(0)
  const [monthSelect, setMonthSelect] = useState(null);
  const [yearList] = useState(() => showListYear())
  const [yearSelect, setYearSelect] = useState(null);
  const [listSocieties, setListSocieties] = useState([]);
  const [listOrgUnit, setListOrgUnit] = useState([]);
  const [listState, setListState] = useState([]);
  const [listTypeReq, setListTypeReq] = useState([]);
  const [societySelect, setSocietySelect] = useState(null);
  const [orgUnitSelect, setOrgUnitSelect] = useState(null);
  const [stateSelect, setStateSelect] = useState(null);
  const [typeReqSelect, seTypeReqSelect] = useState(null);
  var filterList = {
    society: "",
    state: "",
    orgUnit: "",
    typeOfVacant: ""
  }

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
      setCantEnv(requestFromServer.filter(function(item){
        return item.sendReq === 1
      }).length)
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
                              {listDataText(req.listReplacement)}
                              {/* <TextArea
                                readOnly
                                data-modal-primary-focus
                                id="textListReemp_2"
                                defaultValue={req.listReplacement.map(index => {
                                  return (index.codigo + " " + index.apPaterno + " " + index.apMaterno + ", " + index.name + "\n" +
                                          "Puesto: " + index.position.codePosition + " " + index.position.description + "\n" + "\n")
                                  })}
                              /> */}
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
                            onClick={() => onClickVerReq(req, requestFromServer)}
                          >
                            Ver
                          </Button>),
              observation: req.observation,
              dateState: req.timeStatus,
              status: req.flow.section,
              check: <input
                        type="checkbox"
                        style={{ height: "25px", width: "100px" }}
                        checked={req.sendReq}
                        disabled={req.sendReq === 1}
                      >                     
                      </input>,
              checkValue: req.sendReq}
        });
        return dataReq;
      })
      setInfCopyRequest(() => {
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
                              {listDataText(req.listReplacement)}
                              {/* <TextArea
                                readOnly
                                data-modal-primary-focus
                                id="textListReemp_2"
                                defaultValue={req.listReplacement.map(index => {
                                  return (index.codigo + " " + index.apPaterno + " " + index.apMaterno + ", " + index.name + "\n" +
                                          "Puesto: " + index.position.codePosition + " " + index.position.description + "\n" + "\n")
                                  })}
                              /> */}
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
                            onClick={() => onClickVerReq(req, requestFromServer)}
                          >
                            Ver
                          </Button>),
              observation: req.observation,
              dateState: req.timeStatus,
              status: req.flow.section,
              check: <input
                        type="checkbox"
                        style={{ height: "25px", width: "100px" }}
                        checked={req.sendReq}
                        disabled={req.sendReq === 1}
                      >                     
                      </input>,
              checkValue: req.sendReq}
        });
        return dataReq;
      })
    };
    getRequest();
  }, []);

  //Fetch Societies
  useEffect(() => {
    const getSocieties = async () => {
      const societiesFromServer = await fetchSocieties();
      setListSocieties(societiesFromServer);
    };
    getSocieties();
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

  const listDataText = (list) => {
    return (   
      <div style={{background: "white", height:"200px",  width:"400px", borderRadius:"10px", overflow:"auto", border: "3px solid black"}}>
        {list.map(index => 
          <React.Fragment>
            <p> <strong>Persona: </strong> {index.codigo} {index.apPaterno} {index.apMaterno}, {index.name}</p>
            <p><strong>Puesto: </strong> {index.position.codePosition} {index.position.description} <br></br> <br></br></p>
          </React.Fragment>
        )
        }
      </div>
    )
  }

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
      flowID: selectedRow[0].flow.id,
      flowType: selectedRow[0].flow.type,
      flowSeq: selectedRow[0].flow.sequence,
      // state: selectedRow[0].state.id,
      reqConf: selectedRow[0].approvedLevel,
      // flow: (selectedRow[0].flow.id === 1 && userReq.codeSuperior !== "0") ? 1 :
      //       (selectedRow[0].approvedLevel === 0 && selectedRow[0].flow.id === 2) ? 4 :
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
      // state: 4,
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
        flowID: item.flow.id,
        flowType:item.flow.type,
        flowSeq: item.flow.sequence,
        // state: item.state.id,
        reqConf: item.approvedLevel,
        // flow: item.flow.id < 6 ? 5 : 9, //Flow siguiente
        // state: 2,
        userCodeSup: userReq.codeSuperior,
        approverID: userReq.id,             //ID del usuario
        approverRole: userReq.approverRole, //Rol del usuario
        dateApproved: new Date().today() + " T " + new Date().timeNow(),
      
    }))

    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestApprover(data)
      alert("Solicitud aprobada")
      props.history.go(0)
    }
    // console.log(selectedRows);
    // console.log(listSelectedRows)
  }

  const onClickEnviarAprob = async () => {
    let data = {}

    const selectedRows = table.current.getSelectedRows();

    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id && item.sendReq === 0 && 
                               item.state.description === 'Aprobado'))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        state: item.state.id,
        // dateApproved: new Date().today() + " T " + new Date().timeNow(),
    
    }))
    // console.log(selectedRows);
    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestMail(data)
      alert("Solicitud enviada")
      props.history.go(0)
    }
  }

  const onClickEnviarRech = async () => {
    let data = {}

    const selectedRows = table.current.getSelectedRows();
 
    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id && item.sendReq === 0 && 
                               item.state.description === 'No Aprobado'))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        state: item.state.id,
        // dateApproved: new Date().today() + " T " + new Date().timeNow(),
    
    }))
    // console.log(selectedRows);
    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestMail(data)
      alert("Solicitud aprobada")
      props.history.go(0)
    }
  }

  const onClickEnviarObs = async () => {
    let data = {}

    const selectedRows = table.current.getSelectedRows();

    let listSelectedRows = listRequest.filter(item => 
      selectedRows.find(key => item.id === key.id && item.sendReq === 0 && 
                               item.state.description === 'Observado'))

    data.request = listSelectedRows.map(item => ({
        id: item.id,
        state: item.state.id,
        // dateApproved: new Date().today() + " T " + new Date().timeNow(),
    
    }))
    // console.log(selectedRows);
    console.log(JSON.stringify(data))
    if(data.request.length > 0){
      const requestSend = await sendRequestMail(data)
      alert("Solicitud aprobada")
      props.history.go(0)
    }
  }

  const onClickVerReq = (index, list) => {
    console.log(index)
    console.log(list)
    selectedItem = index.id
    console.log("selectedRow2: "+selectedRow2)
    selectedRow2 = list.filter((item) => {
      return item.id === index.id;
    });
    // const selectedRows = table.current.getSelectedRows();
    // if(selectedRows.length > 0){
    //   selectedItem = selectedRows[0].id
    //   selectedRow = list.filter((item) => {
    //     return item.id === selectedItem;
    //   });
    // }
    // else{
    //   selectedItem = 0
    //   selectedRow = {}
    // }
    console.log("SelectedRow: "+selectedRow2) 
    console.log("SelectedRow[0].id: "+selectedRow2[0].id)
    console.log("selectedItem: "+selectedItem)
    if(selectedItem !== 0){
      props.history.push(`/requerimiento-personal-bandeja/${selectedItem}`);
    }
    // const selectedRows = table.current.getSelectedRows();
    // selectedRow = listRequest.filter((item) => {
    //   return item.id === selectedRows[0].id;
    // });
    // console.log(copyListReq)
    // console.log(selectedRows[0]);
    // console.log(selectedRow)
  }

  const newTable = (item, data) => {
    if(!!item && !!data){
      let newList = infRequest.filter(index => 
        infRequest.find(key => index.dateState.slice(5,7) === item.value && key.dateState.slice(5,7) === item.value &&
                                      index.dateState.slice(0,4) === data.name && key.dateState.slice(0,4) === data.name))
      setInfCopyRequest(newList)
      setCantCreado(newList.filter(function(item){
        return item.state === "Creado"
      }).length)
      setCantNoAprob(newList.filter(function(item){
        return item.state === "No Aprobado"
      }).length)
      setCantProc(newList.filter(function(item){
        return item.state === "En Proceso"
      }).length)
      setCantObs(newList.filter(function(item){
        return item.state === "Observado"
      }).length)
      setCantRech(newList.filter(function(item){
        return item.state === "Rechazado"
      }).length)
      setCantAprob(newList.filter(function(item){
        return item.state === "Aprobado"
      }).length)
      setCantEnv(newList.filter(function(item){
        return item.checkValue === 1
      }).length)
    }
    else{
      setInfCopyRequest(infRequest)
      setCantCreado(infRequest.filter(function(item){
        return item.state === "Creado"
      }).length)
      setCantNoAprob(infRequest.filter(function(item){
        return item.state === "No Aprobado"
      }).length)
      setCantProc(infRequest.filter(function(item){
        return item.state === "En Proceso"
      }).length)
      setCantObs(infRequest.filter(function(item){
        return item.state === "Observado"
      }).length)
      setCantRech(infRequest.filter(function(item){
        return item.state === "Rechazado"
      }).length)
      setCantAprob(infRequest.filter(function(item){
        return item.state === "Aprobado"
      }).length)
      setCantEnv(infRequest.filter(function(item){
        return item.checkValue === 1
      }).length)
    }
  }

  const newTableSubNewTable = (itemSoc, itemState, itemOrg, itemType) => {
    let cant = 0
    let newList = infCopyRequest
    if(!!itemSoc){
      filterList.society = itemSoc.description
      newList = newList.filter(index => 
        newList.find(key => 
        (filterList.society != "")  ?
                                        (index.society === filterList.society && key.society === filterList.society) 
                                    :  newList
))
    }
    else{
      filterList.society = "";
      cant++
    }
    if(!!itemState){
      filterList.state = itemState.description
      newList = newList.filter(index => 
        newList.find(key => 
        (filterList.state != "")  ?
                                  ((filterList.state !== 'Enviado') ? (index.state === filterList.state && key.state === filterList.state)
                                                                    : (index.checkValue === 1 && key.checkValue === 1))
                                  : newList
                            ))
    }
    else{
      filterList.state = "";
      cant++
    }
    if(!!itemOrg){
      filterList.orgUnit = itemOrg.description
      newList = newList.filter(index => 
        newList.find(key => 
          (filterList.orgUnit != "")  ?
                                         (index.orgUnit === filterList.orgUnit && key.orgUnit === filterList.orgUnit) 
                                      :  newList
                            ))
    }
    else{
      filterList.orgUnit = "";
      cant++
    }
    if(!!itemType){
      filterList.typeOfVacant = itemType.description
      newList = newList.filter(index => 
        newList.find(key => 
          (filterList.typeOfVacant != "") ?
                                            (index.typeOfVacant === filterList.typeOfVacant && key.typeOfVacant === filterList.typeOfVacant)
                                          : newList
                            ))
    }
    else{
      filterList.typeOfVacant = "";
      cant++
    }
    if(cant < 4){
      setInfCopyRequest(newList)
    }
    else{
      newTable(monthSelect, yearSelect)
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

  const societySelectChange = (item) => {
    if(!!item){
        setSocietySelect(item.selectedItem)
        newTableSubNewTable(item.selectedItem, stateSelect, orgUnitSelect, typeReqSelect)
    }
    else{
        setSocietySelect(null)
        setInfCopyRequest(infRequest)
    }
  }

  const stateSelectChange = (item) => {
    if(!!item){
        setStateSelect(item.selectedItem)
        newTableSubNewTable(societySelect, item.selectedItem, orgUnitSelect, typeReqSelect)
    }
    else{
        setStateSelect(null)
        setInfCopyRequest(infRequest)
    }
  }

  const orgUnitSelectChange = (item) => {
    if(!!item){
        setOrgUnitSelect(item.selectedItem)
        newTableSubNewTable(societySelect, stateSelect, item.selectedItem, typeReqSelect)
    }
    else{
        setOrgUnitSelect(null)
        setInfCopyRequest(infRequest)
    }
  }

  const typeReqSelectChange = (item) => {
    if(!!item){
        seTypeReqSelect(item.selectedItem)
        newTableSubNewTable(societySelect, stateSelect, orgUnitSelect, item.selectedItem)
    }
    else{
        seTypeReqSelect(null)
        setInfCopyRequest(infRequest)
    }
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
        <span className="b">
          {cantCreado} <br></br> <br></br> Creados
        </span>
        <span> </span>
        <span className="c">
          {cantNoAprob} <br></br> <br></br> No Aprobado
        </span>
        <span> </span>
        <span className="d">
          {cantProc} <br></br> <br></br> En Proceso
        </span>
        <span> </span>
        <span className="e">
          {cantObs} <br></br> <br></br> Observados
        </span>
        <span> </span>
        <span className="c">
          {cantRech} <br></br> <br></br> Rechazados
        </span>
        <span> </span>
        <span className="g">
          {cantAprob} <br></br> <br></br> Aprobados
        </span>
        <span> </span>
        <span className="f">
          {cantEnv} <br></br> <br></br> Enviados
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
          <ComboBox
            onChange={(item) => {societySelectChange(item)}}
            id="comboSociety"
            light
            selectedItem={societySelect}
            items={listSocieties}
            itemToString={(item) => (item ? item.description : "")}
            placeholder="Escriba Sociedad..."
            titleText="Sociedad"
            shouldFilterItem={({ item: { description }, inputValue }) => 
            description.toLowerCase().includes(inputValue.toLowerCase())}
          />
        </div>

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
          onClick={onClickEnviarAprob}
        >
          Aprobados
        </Button>
        <Button
          className="custom-class"
          kind="tertiary b"
          renderIcon={Email32}
          size="default"
          onClick={onClickEnviarRech}
        >
          Rechazados
        </Button>
        <Button
          className="custom-class"
          kind="tertiary c"
          renderIcon={Email32}
          size="default"
          onClick={onClickEnviarObs}
        >
          Observados
        </Button>
      </div>
    </div>
  );
}
