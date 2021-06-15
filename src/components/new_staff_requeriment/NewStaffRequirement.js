import React, { useState, useEffect, useRef } from "react";
import "./NewStaffRequirement.scss";
import "carbon-components/css/carbon-components.min.css";
import {
  Form,
  TextInput,
  TextArea,
  Button,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
  FileUploader,
  ComboBox,
  NumberInput,
} from "carbon-components-react";
import RequirementGroup from "./RequirementGroup";
import SelectOrg from "./SelectOrg";
import { fetchOrgAsignation, fetchPosition, fetchPerson, fetchUser, sendRequest } from "../../services/api/servicies";
import ReactLoading from "react-loading";

export default function NewStaffRequirement(props) {
  const [doneV1, setDoneV1] = useState(undefined);
  const [doneV2, setDoneV2] = useState(undefined);
  const [doneV3, setDoneV3] = useState(undefined);
  const [doneV4, setDoneV4] = useState(undefined);
  //Listas
  const [listOrgAsign, setListOrgAsign] = useState({
    listSociety: [],
    listDivision: [],
    listPhysicial: [],
    listVP: [],
    listUnit: [],
    listCenter: [],
  });
  const [societySelect, setSocietySelect] = useState(null)   //Sociedad
  const [divisionSelect, setDivisionSelect] = useState(null) //Division
  const [physicalSelect, setPhysicalSelect] = useState(null) //U Fisica
  const [vpSelect, setVPSelect] = useState(null)             //VP
  const [unitSelect, setUnitSelect] = useState(null)         //Unidad
  const [centerSelect, setCenterSelect] = useState(null)     //Centro
  const [listPuestos, setListPuestos] = useState([])      //Lista Puestos
  const [puestoSelect, setPuestoSelect] = useState(null)  //Puesto Selec
  const [reqTipo, setReqTipo] = useState(1)               //Tipo Req
  const [busqTipo, setBusqTipo] = useState(0)             //Tipo busq
  const [contratoTipo, setContratoTipo] = useState(0)     //Tipo Contrato
  const [vacanteTipo, setVacanteTipo] = useState("")      //Tipo Vacante
  const [estimDate, setEstimDate] = useState("")          //Fecha estimada
  const [tiempoServ, setTiempoServ] = useState("")        //Tiempo servicio
  const [justifServ, setJustifServ] = useState("")        //Justificacion
  const [puestoTiempoExpSelect, setPuestoTiempoExpSelect] = useState(null)      //Tiempo Exp Selec
  const [puestoCivilStatusSelect, setPuestoCivilStatusSelect] = useState(null)  //Estado Civil Selec
  const [puestoRangoEdadSelect, setPuestoRangoEdadSelect] = useState(null)      //Rango Edad Selec
  const [puestoSexoSelect, setPuestoSexoSelect] = useState(null)                //Sexo
  const [listTrabajador, setListTrabajador] = useState([])                      //Lista Trabajador
  const [listPersonaSelect, setListPersonaSelect] = useState([])
  //Max Date
  var maxDate=new Date()
  maxDate.setDate(maxDate.getDate() + 15)

  //Min Date
  var minDate=new Date()
  minDate.setDate(minDate.getDate() - 15)
  let listPersonCopy = listTrabajador.map(item => ({
    ...item, datos: item.codigo + " " + item.apPaterno + " " +
                    item.apMaterno + ", " + item.name
  }))

  const [personaSelect, setPersonaSelect] = useState(null)  //Persona Select
  //Usuario
  const [userReq, setUserReq] = useState({
    position: 0,
    name: "",
    apPaterno: "",
    apMaterno: "",
    codeSuperior: 0,
    id: 0,
    profile: 0,
    approverRole: 0
  })
  const minReq = 1;                                     //Cant min
  const maxReq = 200;                                   //Cant max
  const [checkCount, setCheckCount] = useState(false);  //Verificar Cant
  const [cantReq, setCantReq] = useState(1)             //Cant req
  const [checkReemp, setCheckReemp] = useState(false);  //Verificar Reemp

  const reqGroupFunc = useRef();    //ref Carac tipo 1
  const reqGroupCon = useRef();     //ref Carac tipo 2
  const reqGroupHab = useRef();     //ref Carac tipo 3
  const reqGroupAcad = useRef();    //ref Carac tipo 4
  const reqGroupEst = useRef();     //ref Carac tipo 5
  const reqGroupIdi = useRef();     //ref Carac tipo 6

  // For todays date;
  Date.prototype.today = function () { 
    return this.getFullYear() + "/" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/" + ((this.getDate() < 10)?"0":"") + this.getDate();
  }

  // For the time now
  Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  }

  //Fetch Organization
  useEffect(() => {
    setTimeout(() => {
      const getOrganization = async () => {
          const organizationFromServer = await fetchOrgAsignation()
          setListOrgAsign(organizationFromServer)
          setDoneV1(true)
      }
      getOrganization()
    }, 4000);
  }, [])

  //Fetch Position
  useEffect(() => {
    setTimeout(() => {
      const getPosition = async () => {
          const positionFromServer = await fetchPosition()
          setListPuestos(positionFromServer)
          setDoneV2(true)
      }
      getPosition()
    }, 4000);
  }, [])

  //Fetch Person
  useEffect(() => {  
    setTimeout(() => {
      const getPerson = async () => {
          const personFromServer = await fetchPerson()
          setListTrabajador(personFromServer)
          setDoneV3(true)
      }
      getPerson()
    }, 4000);
  }, [])

  //Fetch User
  useEffect(() => {
    setTimeout(() => {
      const getUser = async () => {
          const userFromServer = await fetchUser()
          setUserReq({position: userFromServer.person.position.description,
                      name: userFromServer.person.name,
                      apPaterno: userFromServer.person.apPaterno,
                      apMaterno: userFromServer.person.apMaterno,
                      codeSuperior: userFromServer.person.codeSuperior,
                      id: userFromServer.userId,
                      profile: userFromServer.profile.tipo,
                      approverRole: userFromServer.rol.tipo,
                      userSoc: userFromServer.society.id,
                      userUnit: userFromServer.organizationalUnit.id,
                      userPhys: userFromServer.physicalLocation.id,
                      userComp: userFromServer.companyDivision.id,
                      userCost: userFromServer.costCenter.id,
                      userVP: userFromServer.vPManagement.id,
                    })
          setDoneV4(true)  
      }
      getUser()
    }, 4000);
  }, [])

  const verificarCant = (item) => {
    if (item.imaginaryTarget.value > 1){
      setCheckCount(true);
    } else {
      setCheckCount(false);
    }
    setCantReq(item.imaginaryTarget.value)
  };

  const reqOnChange = (item) => {
    setReqTipo(item)
  }

  const societySelectOnChange = (item) => {
    setSocietySelect(item.selectedItem)
    if(item.selectedItem == null){
      setSocietySelect(null)
    }
  };

  const divisionSelectOnChange = (item) => {
    setDivisionSelect(item.selectedItem)
    if(item.selectedItem == null){
      setDivisionSelect(null)
    }
  };

  const physicalSelectOnChange = (item) => {
    setPhysicalSelect(item.selectedItem)
    if(item.selectedItem == null){
      setPhysicalSelect(null)
    }
  };

  const vpSelectOnChange = (item) => {
    setVPSelect(item.selectedItem)
    if(item.selectedItem == null){
      setVPSelect(null)
    }
  };

  const unitSelectOnChange = (item) => {
    setUnitSelect(item.selectedItem)
    if(item.selectedItem == null){
      setUnitSelect(null)
    }
  };

  const centerSelectOnChange = (item) => {
    setCenterSelect(item.selectedItem)
    if(item.selectedItem == null){
      setCenterSelect(null)
    }
  };

  const assignPersonDesc = (item) => {
    setPersonaSelect(item.selectedItem)
    if(!!item.selectedItem){
      if(listPersonaSelect.length === 0){
        setListPersonaSelect([...listPersonaSelect, {id: item.selectedItem.id,
                                                    datos: item.selectedItem.codigo + " " +
                                                    item.selectedItem.apPaterno + " " + item.selectedItem.apMaterno +
                                                    ", " + item.selectedItem.name}])
        console.log(listPersonaSelect)
      }
      else{
        let encontrado = listPersonaSelect.some(function(index) {
          return item.selectedItem.id === index.id
        })
        if(!encontrado && listPersonaSelect.length < cantReq){
          setListPersonaSelect([...listPersonaSelect, {id: item.selectedItem.id,
                                                    datos: item.selectedItem.codigo + " " +
                                                    item.selectedItem.apPaterno + " " + item.selectedItem.apMaterno +
                                                    ", " + item.selectedItem.name}])
        }
        else{
          setListPersonaSelect(listPersonaSelect.filter(key => key.id != item.selectedItem.id))
        }
      }
    }
    console.log(listPersonaSelect)
    console.log(listPersonCopy)
  }

  const assignFillPersonDesc = (item) => {
    if(!!item){
      setPersonaSelect(item.selectedItem)
      if(item.selectedItem != null){
        setListPersonaSelect([...listPersonaSelect, {id: item.selectedItem.id,
          datos: item.selectedItem.codigo + " " +
          item.selectedItem.apPaterno + " " + item.selectedItem.apMaterno +
          ", " + item.selectedItem.name}])
        setSocietySelect(item.selectedItem.society)
        setDivisionSelect(item.selectedItem.companyDivision)
        setPhysicalSelect(item.selectedItem.companyDivision)
        setVPSelect(item.selectedItem.vPManagement)
        setUnitSelect(item.selectedItem.vPManagement)
        setCenterSelect(item.selectedItem.costCenter)
        setPuestoSelect(item.selectedItem.position)
        setPuestoTiempoExpSelect(item.selectedItem.position.informationAdditional.timeExperience)
        setPuestoRangoEdadSelect(item.selectedItem.position.informationAdditional.rangeAge)
        setPuestoSexoSelect(item.selectedItem.position.informationAdditional.sex)
        setPuestoCivilStatusSelect(item.selectedItem.position.informationAdditional.civilStatus)
      }
    }
    else{
      setPersonaSelect(null)
      setSocietySelect(null)
      setDivisionSelect(null)
      setPhysicalSelect(null)
      setVPSelect(null)
      setUnitSelect(null)
      setCenterSelect(null)
      setPuestoSelect(null)
      setPuestoTiempoExpSelect(null)
      setPuestoRangoEdadSelect(null)
      setPuestoSexoSelect(null)
      setPuestoCivilStatusSelect(null)
    }
  }

  const assignPositionDesc = (item) => {
    setPuestoSelect(item.selectedItem)
    if(item.selectedItem != null){     
      setPuestoTiempoExpSelect(item.selectedItem.informationAdditional.timeExperience)
      setPuestoRangoEdadSelect(item.selectedItem.informationAdditional.rangeAge)
      setPuestoSexoSelect(item.selectedItem.informationAdditional.sex)
      setPuestoCivilStatusSelect(item.selectedItem.informationAdditional.civilStatus)
    }   
    else{     
      setPuestoTiempoExpSelect(null)
      setPuestoRangoEdadSelect(null)
      setPuestoSexoSelect(null)
      setPuestoCivilStatusSelect(null)
    }
  }

  const justifOnChangeText = () => {
    return (event => {
        const newJustif = event.target.value
        setJustifServ(newJustif)
    })
  }

  const timeOnChangeText = () => {
    return (event => {
        const newTimeChange= event.target.value
        setTiempoServ(newTimeChange)
    })
  }

  const saveRequest = async () => {
    if(!!puestoSelect && !!estimDate && tiempoServ !== "" && vacanteTipo !=="" && reqTipo !== 0 && contratoTipo !== 0 && busqTipo !== 0 &&
       !!societySelect && !!unitSelect && !!physicalSelect && !!centerSelect && !!divisionSelect && !!vpSelect){
      const data = {}    
      let listCharac = [] 
      if(!!reqGroupFunc.current){
        listCharac = [...listCharac, ...reqGroupFunc.current.getDataContent().map( item => (
          {...item, charac: {id: 1, description: "Describir las funciones o actividades especificas"} }) )]
      }
      if(!!reqGroupCon.current){
        listCharac = [...listCharac, ...reqGroupCon.current.getDataContent().map( item => (
          {...item, charac: {id: 2, description: "Conocimiento Requerido"} }) )]
      }
      if(!!reqGroupHab.current){
        listCharac = [...listCharac, ...reqGroupHab.current.getDataContent().map( item => (
          {...item, charac: {id: 3, description: "Habilidades Requeridas"} }) )]
      }
      if(!!reqGroupAcad.current){
        listCharac = [...listCharac, ...reqGroupAcad.current.getDataContent().map( item => (
          {...item, charac: {id: 4, description: "Formación Académica"} }) )]
      }
      if(!!reqGroupEst.current){
        listCharac = [...listCharac, ...reqGroupEst.current.getDataContent().map( item => (
          {...item, charac: {id: 5, description: "Centro de Estudios (no determinante)"} }) )]
      }
      if(!!reqGroupIdi.current){
        listCharac = [...listCharac, ...reqGroupIdi.current.getDataContent().map( item => (
          {...item, charac: {id: 6, description: "Idiomas"} }) )]
      }
      data.request = {
        society: societySelect.id,
        organizationalUnit: unitSelect.id,
        physicalLocation: physicalSelect.id,
        costCenter: centerSelect.id,
        companyDivision: divisionSelect.id,
        vPManagement: vpSelect.id,
        observation: "",
        requestDate: new Date().today() + " T " + new Date().timeNow(),
        quantity: cantReq,
        estimatedDate: new Date(estimDate).toJSON().slice(0,10).replace(/-/g,'/'),
        timeService: tiempoServ,
        justification: justifServ,
        approvedLevel: societySelect.levelAproved,
        vacancyConsidered: vacanteTipo, 
        typeRequest: reqTipo,
        typeState: 1,
        // flow: userReq.codeSuperior !== "0" ? 1 : (posTypeFlow === "Corporativo" ? 7 : 2),
        contract: contratoTipo,
        typeSearch: busqTipo,
        position: puestoSelect.id,
        posScope: puestoSelect.scopePosition,
        userID: userReq.id,
        userAppRole: userReq.approverRole,
        userCodeSup: userReq.codeSuperior,
        timeStatus: new Date().today() + " T " + new Date().timeNow(),
        listReplacement: listPersonaSelect,
        listCharacteristic: listCharac,
        listCharacAdd: {
          exp: !!puestoTiempoExpSelect ? puestoTiempoExpSelect : "",
          timeRange: !!puestoRangoEdadSelect ? puestoRangoEdadSelect : "",
          sex: !!puestoSexoSelect ? puestoSexoSelect : "",
          civilStatus: !!puestoCivilStatusSelect ? puestoCivilStatusSelect : "",
          fileOrg: "",
          fileDesc: ""
        }
      };
      // console.log(JSON.stringify(data))
      const requestSend = await sendRequest(data);
      alert("Solicitud Creada")
      props.history.go(0)
    }
    else{
      alert("Fata llenar datos, revise que ningún campo obligatorio esté vacío")
      console.log("Falta llenar")
    }
  };

  return (
    <>
    {/* <Form> */}
      {(!doneV1 && !doneV2 && !doneV3 && !doneV4) ? (
        <ReactLoading
          type={"spin"}
          color={"#002060"}
          height={200}
          width={200}
        />
      ) : (
      <Form>
      <div className="bg--grid">
        <h2>Requerimiento de Personal</h2>
        <p
          className="section-form"
          style={{ fontWeight: "bold", backgroundColor: "#002060" }}
        >
          001 Asignación Organizacional
        </p>
        <div class="bx--row" >
          <div className="bx--col-lg-5">
            <RadioButtonGroup
              name="radio-button-group"
              defaultSelected={1}   
              onChange={(item) => reqOnChange(item)}      
            >
              <RadioButton
                labelText="Nuevo Planificado"
                value={1}
                id="radio-1"               
                onClick={() => {
                  setCheckReemp(false)
                  setListPersonaSelect([])
                  assignFillPersonDesc(null)
                }}
              />
              <RadioButton
                labelText="Nuevo No Planificado"
                value={2}
                id="radio-2"
                onClick={() => {
                  setCheckReemp(false)
                  setListPersonaSelect([])
                  assignFillPersonDesc(null)
                }}
              />
              <RadioButton
                labelText="Reemplazo"
                value={3}
                id="radio-3"
                onClick={() => {
                  setCheckReemp(true)
                  setListPersonaSelect([])
                }}
              />
            </RadioButtonGroup>
          </div>
          <div className="bx--col-lg-5" style={{ marginBottom: "1.2rem"}}>
            {checkReemp && (
              <ComboBox
                onChange={(item) => {assignFillPersonDesc(item)}}
                id="comboNomReemp"
                light
                items={listPersonCopy}
                selectedItem={personaSelect}
                itemToString={(item) => (item ? item.datos : "")}
                placeholder="Escriba nombre del trabajador a reemplazar..."
                shouldFilterItem={({ item: { datos }, inputValue }) => 
                  datos.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            )}
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Sociedad"
                orgList={listOrgAsign.listSociety}
                orgSelect={societySelect}
                selectOnChange={societySelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="VP/Dirección/Gerencia"
                orgList={listOrgAsign.listVP}
                orgSelect={vpSelect}
                selectOnChange={vpSelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Ubicación Física"
                orgList={listOrgAsign.listPhysicial}
                orgSelect={physicalSelect}
                selectOnChange={physicalSelectOnChange}
              />
            </div>
            <div>
              <br></br> <br></br>
            </div>
            <hr style={{ borderTop: "3px solid #aaaaaa" }}></hr>
            <div>
              <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
                <ComboBox
                onChange={(item) => {
                  if(item.selectedItem === "Interna"){
                    setBusqTipo(1)
                  }
                  else if(item.selectedItem === "Externa"){
                    setBusqTipo(2)
                  }
                  else if(item.selectedItem === "Ambas"){
                    setBusqTipo(3)
                  }
                  else{
                    setBusqTipo(0)
                  }}}
                id="comboTipoBusq"
                light
                invalid={busqTipo === 0}
                items={["Interna","Externa","Ambas"]}
                placeholder="Seleccione tipo..."
                titleText="Tipo de Busqueda"
              ></ComboBox>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <label class="label a_3">Datos de Solicitante</label>
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtNombreSol"
                  labelText="Nombre"
                  value={userReq.apPaterno + " " + userReq.apMaterno + ", " + userReq.name}
                  light
                />
              </div>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="División Empresa"
                orgList={listOrgAsign.listDivision}
                orgSelect={divisionSelect}
                selectOnChange={divisionSelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Unidad Organizativa"
                orgList={listOrgAsign.listUnit}
                orgSelect={unitSelect}
                selectOnChange={unitSelectOnChange}
              />
            </div>
            <div
              style={{ marginBottom: "1.14rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Centro de Costos"
                orgList={listOrgAsign.listCenter}
                orgSelect={centerSelect}
                selectOnChange={centerSelectOnChange}
              />
            </div>
            <div>
              <br></br> <br></br>
            </div>
            <hr
              style={{ borderTop: "3px solid #aaaaaa", marginBottom: "8rem" }}
            ></hr>
            <div>
              <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "2.1rem" }}>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtCargoSol"
                  labelText="Cargo"
                  value={userReq.position}
                  light
                />
              </div>
            </div>
          </div>
        </div>

        <p
          className="section-form"
          style={{ fontWeight: "bold", backgroundColor: "#002060" }}
        >
          002 Descripción del Puesto
        </p>
        <div className="bx--row">
          <div className="bx--col-lg-4">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <ComboBox
                onChange={(item) => {assignPositionDesc(item)}}
                id="comboCodPuesto"
                light
                items={listPuestos}
                itemToString={(item) => (item ? item.codePosition : "")}
                placeholder="Escriba código..."
                titleText="Código de Posición/Puesto"
                selectedItem={puestoSelect}
                shouldFilterItem={({ item: { codePosition }, inputValue }) => 
                codePosition.toLowerCase().includes(inputValue.toLowerCase())
                }
              ></ComboBox>
            </div>
          </div>
          <div className="bx--col-lg-6">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <ComboBox
                onChange={(item) => {assignPositionDesc(item)}}
                id="comboNomPuesto"
                light
                items={listPuestos}
                itemToString={(item) => (item ? item.description : "")}
                placeholder="Escriba posición..."
                titleText="Posición/Puesto"
                selectedItem={puestoSelect}
                shouldFilterItem={({ item: { description }, inputValue }) =>
                description.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            </div>
          </div>
          <div className="bx--col-lg-2.1">
            <div style={{ backgroundColor: "#dadee9" }}>
              <NumberInput
                id="cantidad"
                invalidText="Number is not valid"
                label="Cantidad de Vacantes"
                max={maxReq}
                min={minReq}
                step={1}
                value={cantReq}
                light
                onChange={(item) => verificarCant(item)}
              />
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <DatePicker
                datePickerType="single"
                light
                value={estimDate}                
                style={{ backgroundColor: "#dadee9" }}     
                maxDate={maxDate}
                minDate={minDate}           
                onChange={(item) => {
                  if(item !== ""){
                    setEstimDate(item)
                  }
                  else{
                    setEstimDate("")
                  }
                }}
              >
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText="Fecha Estimada de Ingreso"  
                  invalid={estimDate === ""}
                  // invalidText={"Seleccione fecha"}                
                  id="date-picker-single"
                />
              </DatePicker>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <ComboBox
                onChange={(item) => {
                  if(item.selectedItem==="A plazo Indeterminado"){
                    setContratoTipo(1)
                  }
                  else if(item.selectedItem==="A plazo Fijo"){
                    setContratoTipo(2)
                  }
                  else if(item.selectedItem==="Convenio de Formación"){
                    setContratoTipo(3)
                  }
                  else{
                    setContratoTipo(0)
                  }
                  }}
                id="dropTiempocontr"
                light
                invalid={contratoTipo === 0}
                // invalidText={"Seleccione tipo"}
                items={["A plazo Indeterminado","A plazo Fijo","Convenio de Formación"]}
                placeholder="Escriba tipo contrato..."
                titleText="Tipo de Contrato"
              ></ComboBox>
            </div>
            {checkReemp && (<div style={{ marginBottom: "1.2rem" }}>
              <label class="label a_3">Datos de la persona a reemplazar</label>
            </div>)}
            {checkReemp && (
              <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
                <ComboBox
                  // onChange={() => {}}
                  onChange={(item) => {assignPersonDesc(item)}}
                  id="comboNombre"
                  light
                  items={listPersonCopy}
                  selectedItem={personaSelect}
                  itemToString={(item) => (item ? item.datos : "")}
                  placeholder="Escriba nombre..."
                  titleText="Nombres y Apellidos"
                  shouldFilterItem={({ item: { datos }, inputValue }) =>
                    datos.toLowerCase().includes(inputValue.toLowerCase())
                  }
                ></ComboBox>
              </div>
            )}
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.6rem", backgroundColor: "#dadee9" }}>
            <ComboBox
                onChange={(item) => {setVacanteTipo(item.selectedItem)}}
                id="comboVacante"
                light
                // selectedItem={"Sí"}
                items={["Sí","No"]}
                invalid={vacanteTipo === ""}
                // invalidText={"Seleccione tipo"}
                placeholder="(Sí, No)"
                titleText="¿Vacante considerada en el Plan de Personal?"
              ></ComboBox>
            </div>
            <div style={{ marginBottom: "1.2em", backgroundColor: "#dadee9" }}>
              <TextInput
                  id="txtTiempoServ"
                  labelText="Tiempo de Contrato"
                  placeholder="Escriba tiempo de contrato..."
                  value={tiempoServ}
                  invalid={tiempoServ === ""}
                  // invalidText={"Escribo tiempo"}
                  onChange={timeOnChangeText()}
                  light
                />
            </div>
            {checkReemp && checkCount && (
              <div style={{ marginTop: "2rem", backgroundColor: "#dadee9" }}>
                <TextArea
                  // onChange={() => {descListPerson(listPersonaSelect)}}
                  cols={10}
                  id="txtListReplace"
                  invalidText="Invalid error message."
                  labelText="Lista Trabajadores"
                  rows={3}
                  light
                  style={{ resize: "none" }}
                  readOnly
                  value={listPersonaSelect.map(item => {
                    return item.datos + "\n"
                  })}
                ></TextArea>
              </div>
            )}
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
              <TextArea
                cols={20}
                id="txtJusti"
                invalidText="Invalid error message."
                labelText="Justificación"
                placeholder="Escriba justificación..."
                rows={3}
                value={justifServ}
                onChange={justifOnChangeText()}
                light
                style={{ resize: "none" }}
              />             
            </div>
          </div>
        </div>

        <p
          className="section-form"
          style={{ fontWeight: "bold", backgroundColor: "#002060" }}
        >
          003 Caracteristicas de los postulantes
        </p>
        <div>
          <RequirementGroup
            id={1}
            ref={reqGroupFunc}
            name="Describir las funciones o actividades especificas"
            firstLabel="Descripción"
            puestoInformation={puestoSelect}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={2}
            ref={reqGroupCon}
            name="Conocimiento Requerido"
            firstLabel="Descripción"
            puestoInformation={puestoSelect}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={3}
            ref={reqGroupHab}
            name="Habilidades Requeridas"
            firstLabel="Descripción"
            puestoInformation={puestoSelect}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={4}
            ref={reqGroupAcad}
            name="Formación Académica"
            firstLabel="Formación"
            secondLabel="Grado Obtenido"
            puestoInformation={puestoSelect}
            type="2"
          />
        </div>
        <div>
          <RequirementGroup
            id={5}
            ref={reqGroupEst}
            name="Centro de Estudios (no determinante)"
            firstLabel="Tipo"
            secondLabel="Centro de Estudios"
            puestoInformation={puestoSelect}
            type="2"
          />
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <ComboBox
                onChange={(item) => {setPuestoTiempoExpSelect(item.selectedItem)}}
                id="comboTiempoExp"
                light
                selectedItem={puestoTiempoExpSelect}
                items={["Menos de 1 año","1 - 3 años","3 - 5 años","5 - 10 años", "Más de 10 años"]}
                placeholder="Escriba tiempo..."
                titleText="Tiempo de Experiencia"
              ></ComboBox>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <ComboBox
                onChange={(item) => {setPuestoRangoEdadSelect(item.selectedItem)}}
                id="comboRangoEdad"
                light
                selectedItem={puestoRangoEdadSelect}
                items={["Hasta 25 años","Hasta 35 años","Hasta 45 años","Indiferente"]}
                placeholder="Escriba rango edad..."
                titleText="Rango de Edad"
              ></ComboBox>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
            <ComboBox
                onChange={(item) => {setPuestoSexoSelect(item.selectedItem)}}
                id="comboSexo"
                light
                selectedItem={puestoSexoSelect}
                items={["Femenino","Masculino","Indistinto"]}
                placeholder="Escriba género..."
                titleText="Sexo"
              ></ComboBox>
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <ComboBox
                onChange={(item) => {setPuestoCivilStatusSelect(item.selectedItem)}}
                id="comboEstadoCivil"
                light
                selectedItem={puestoCivilStatusSelect}
                items={["Soltero","Casado","Viudo","Divorciado","Indistinto"]}
                // itemToString={(item) => (item ? item.text : "")}
                placeholder="Escriba estado civil..."
                titleText="Estado Civil"
              ></ComboBox>
            </div>
          </div>
          <div className="bx--col"></div>
        </div>
        <div>
          <RequirementGroup
            id={6}
            ref={reqGroupIdi}
            name="Idiomas"
            firstLabel="Idioma"
            secondLabel="Nivel"
            puestoInformation={puestoSelect}
            type="2"
          />
        </div>
        <div className="bx--row">
          <FileUploader
            className="custom-class"
            accept={[
              ".docx",
              ".docm",
              ".pptx",
              ".pptm",
              ".xlsx",
              ".xlsm",
              ".pdf",
            ]}
            buttonKind="primary a"
            buttonLabel="Agregar"
            filenameStatus="edit"
            iconDescription="Clear file"
            labelDescription="Solo archivos de tipo Word, PowerPoint, Excel o PDF"
            labelTitle="Adjunta Organigrama o Descriptivo de Puesto"
          />
        </div>
        <div className="row-action">
          <Button
            className="custom-class"
            kind="primary a"
            size="default"
            onClick={saveRequest}
          >
            Crear Solicitud
          </Button>
        </div>
      </div>
      {/* )} */}
    </Form>
    )}
  </>
  );
}
