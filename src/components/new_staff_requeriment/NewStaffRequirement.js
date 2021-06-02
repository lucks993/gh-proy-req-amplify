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
import { fetchOrgAsignation, fetchPosition, fetchPerson, sendRequest } from "../../services/api/servicies";

export default function NewStaffRequirement() {
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
  const [listPersonaSelectNombre, setListPersonaSelectNombre] = useState()
  let listPersonCopy = listTrabajador.map(item => ({
    ...item, datos: item.codigo + " " + item.apPaterno + " " +
                    item.apMaterno + ", " + item.name + " // " +
                    item.position.description
  }))

  const [personaSelect, setPersonaSelect] = useState(null)  //Persona Select
  //Usuario
  const [userReq, setUserReq] = useState({
    position: "",
    name: "",
    apPaterno: "",
    apMaterno: "",
    codeSuperior: "0",
    approverRole: 1
  })
  const [maxDoc, setMaxDoc] = useState(0);
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
    const getOrganization = async () => {
        const organizationFromServer = await fetchOrgAsignation()
        setListOrgAsign(organizationFromServer)
    }
    getOrganization()
    }, [])

  //Fetch Position
  useEffect(() => {
    const getPosition = async () => {
        const positionFromServer = await fetchPosition()
        setListPuestos(positionFromServer)
    }
    getPosition()
    }, [])

  //Fetch Person
  useEffect(() => {
    const getPerson = async () => {
        const personFromServer = await fetchPerson()
        setListTrabajador(personFromServer)
        setUserReq({position: personFromServer[1].position.description,
                    name: personFromServer[1].name,
                    apPaterno: personFromServer[1].apPaterno,
                    apMaterno: personFromServer[1].apMaterno,
                    codeSuperior: personFromServer[1].codeSuperior})
    }
    getPerson()
  }, [])

  const verificarCant = (item) => {
    // if (document.getElementById("cantidad").value > 1) {
    if (item.imaginaryTarget.value > 1){
      setCheckCount(true);
    } else {
      setCheckCount(false);
    }
    // setCantReq(document.getElementById("cantidad").value)
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
    // if(!!index){     
    //   // let orgIndex = []
    //   let orgList = []
    //   orgList = listOrgAsign.listSociety
    //   // socIndex = socList.filter(item => {return item.id == index})
    //   setSocietySelect(orgList.filter(item => {return item.id == index}))
    //   // console.log(orgIndex)
    //   // console.log(societySelect)
    //   // console.log("orgIndex.id: "+orgIndex[0].id)
    //   // console.log("orgIndex.desc: "+orgIndex[0].description)
    //   // console.log("orgIndex.level: "+orgIndex[0].levelAproved)
    //   // console.log("societySelect.id: "+societySelect[0].id)
    //   // console.log("societySelect.desc: "+societySelect[0].description)
    //   // console.log("societySelect.level: "+societySelect[0].levelAproved)
    // }
  };

  const divisionSelectOnChange = (item) => {
    setDivisionSelect(item.selectedItem)
    if(item.selectedItem == null){
      setDivisionSelect(null)
    }
    // if(!!index){
    //   let orgList = []
    //   orgList = listOrgAsign.listDivision
    //   setDivisionSelect(orgList.filter(item => {return item.id == index}))
    // }
  };

  const physicalSelectOnChange = (item) => {
    setPhysicalSelect(item.selectedItem)
    if(item.selectedItem == null){
      setPhysicalSelect(null)
    }
    // if(!!index){
    //   let orgList = []
    //   orgList = listOrgAsign.listPhysicial
    //   setPhysicalSelect(orgList.filter(item => {return item.id == index}))
    // }
  };

  const vpSelectOnChange = (item) => {
    setVPSelect(item.selectedItem)
    if(item.selectedItem == null){
      setVPSelect(null)
    }
    // if(!!index){
    //   let orgList = []
    //   orgList = listOrgAsign.listVP
    //   setVPSelect(orgList.filter(item => {return item.id == index}))
    // }
  };

  const unitSelectOnChange = (item) => {
    setUnitSelect(item.selectedItem)
    if(item.selectedItem == null){
      setUnitSelect(null)
    }
    // if(!!index){
    //   let orgList = []
    //   orgList = listOrgAsign.listUnit
    //   setUnitSelect(orgList.filter(item => {return item.id == index}))
    // }
  };

  const centerSelectOnChange = (item) => {
    setCenterSelect(item.selectedItem)
    if(item.selectedItem == null){
      setCenterSelect(null)
    }
    // if(!!index){
    //   let orgList = []
    //   orgList = listOrgAsign.listCenter
    //   setCenterSelect(orgList.filter(item => {return item.id == index}))
    // }
  };

  const assignPersonDesc = (item) => {
    setPersonaSelect(item.selectedItem)
    if(!!item.selectedItem){
      setListPersonaSelect([...listPersonaSelect, {id: item.selectedItem.id,
                                                   datos: item.selectedItem.codigo + " " +
                                                   item.selectedItem.apPaterno + " " + item.selectedItem.apMaterno +
                                                    ", " + item.selectedItem.name + " // " +
                                                   item.selectedItem.position.description}])
      // setListPersonaSelectNombre(...listPersonaSelectNombre, listPersonCopy.map(index => {
      //   if(index.id === item.selectedItem.id){
      //     return {datos: index.datos}
      //   }
      // }))
    }
    console.log(listPersonaSelect)
    console.log(listPersonaSelectNombre)
    console.log(listPersonCopy)
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
        const newJustif = event.target.value
        setTiempoServ(newJustif)
    })
  }

  const saveRequest = async () => {
    if(!!puestoSelect && !!estimDate && tiempoServ !== "" && vacanteTipo !=="" && reqTipo !== 0 && contratoTipo !== 0 && busqTipo !== 0 &&
       !!societySelect && !!unitSelect && !!physicalSelect && !!centerSelect && !!divisionSelect && !!vpSelect){
      const data = {}    
      let listCharac = [] 
      if(!!reqGroupFunc.current){
        // listCharac = [...listCharac, ...reqGroupFunc.current.getDataContent()]
        listCharac = [...listCharac, ...reqGroupFunc.current.getDataContent().map( item => (
          {...item, charac: {id: 1, description: "Describir las funciones o actividades especificas"} }) )]
      }
      if(!!reqGroupCon.current){
        // listCharac = [...listCharac, ...reqGroupCon.current.getDataContent()].
        listCharac = [...listCharac, ...reqGroupCon.current.getDataContent().map( item => (
          {...item, charac: {id: 2, description: "Conocimiento Requerido"} }) )]
      }
      if(!!reqGroupHab.current){
        // listCharac = [...listCharac, ...reqGroupHab.current.getDataContent()]
        listCharac = [...listCharac, ...reqGroupHab.current.getDataContent().map( item => (
          {...item, charac: {id: 3, description: "Habilidades Requeridas"} }) )]
      }
      if(!!reqGroupAcad.current){
        // listCharac = [...listCharac, ...reqGroupAcad.current.getDataContent()]
        listCharac = [...listCharac, ...reqGroupAcad.current.getDataContent().map( item => (
          {...item, charac: {id: 4, description: "Formación Académica"} }) )]
      }
      if(!!reqGroupEst.current){
        // listCharac = [...listCharac, ...reqGroupEst.current.getDataContent()]
        listCharac = [...listCharac, ...reqGroupEst.current.getDataContent().map( item => (
          {...item, charac: {id: 5, description: "Centro de Estudios (no determinante)"} }) )]
      }
      if(!!reqGroupIdi.current){
        // listCharac = [...listCharac, ...reqGroupIdi.current.getDataContent()]
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
        flow: userReq.codeSuperior !== "0" ? 1 : (userReq.approverRole === 4 ? 4 : 2),
        contract: contratoTipo,
        typeSearch: busqTipo,
        position: puestoSelect.id,
        userID: 1,
        timeStatus: "1",
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
      // if(!!reqGroupFunc.current){
      //   const resRef = reqGroupFunc.current.getDataContent()
      //   console.log(resRef)
      // }
    }
    else{
      console.log("Falta llenar")
    }
    console.log(societySelect)
  };

  return (
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
                  setListPersonaSelectNombre([])
                }}
              />
              <RadioButton
                labelText="Nuevo No Planificado"
                value={2}
                id="radio-2"
                onClick={() => {
                  setCheckReemp(false)
                  setListPersonaSelect([])
                  setListPersonaSelectNombre([])
                }}
              />
              <RadioButton
                labelText="Reemplazo"
                value={3}
                id="radio-3"
                onClick={() => {
                  setCheckReemp(true)
                  setListPersonaSelect([])
                  setListPersonaSelectNombre([])
                }}
              />
            </RadioButtonGroup>
          </div>
          <div className="bx--col-lg-5" style={{ marginBottom: "1.2rem"}}>
            {checkReemp && (
              <ComboBox
                onChange={() => {}}
                // onChange={(item) => {assignPersonDesc(item)}}
                id="comboNomReemp"
                light
                items={listPersonCopy}
                // selectedItem={personaSelect}
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
                  else{
                    setBusqTipo(0)
                  }}}
                id="comboTipoBusq"
                light
                invalid={busqTipo === 0}
                // invalidText={"Seleccione un tipo"}
                items={["Interna","Externa"]}
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
                  // invalidText="Invalid error message."
                  labelText="Nombre"
                  value={userReq.apPaterno + " " + userReq.apMaterno + ", " + userReq.name}
                  // placeholder="Placeholder text"
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
                  // invalidText="Invalid error message."
                  labelText="Cargo"
                  value={userReq.position}
                  // placeholder="Placeholder text"
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
                titleText="Código de Posición a Reemplazar"
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
                items={["Más de 1 año","Más de 2 años","Más de 3 años","Más de 4 años"]}
                placeholder="Escriba tiempo..."
                titleText="Tiempo de Experiencia"
              ></ComboBox>
              {/* <Select
                defaultValue="placeholder-item"
                id="selectTiempoExp"
                invalidText="This is an invalid error message."
                labelText="Tiempo de Experiencia"
                light
              >
                <SelectItem text="Más de 1 año" value="Más de 1 año" />
                <SelectItem text="Más de 2 años" value="Más de 2 años" />
                <SelectItem text="Más de 3 años" value="Más de 3 años" />
                <SelectItem text="Más de 4 años" value="Más de 4 años" />
              </Select> */}
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <ComboBox
                onChange={(item) => {setPuestoRangoEdadSelect(item.selectedItem)}}
                id="comboRangoEdad"
                light
                selectedItem={puestoRangoEdadSelect}
                items={["Más de 20 años","Más de 30 años","Más de 40 años"]}
                placeholder="Escriba rango edad..."
                titleText="Rango de Edad"
              ></ComboBox>
              {/* <Select
                defaultValue="placeholder-item"
                id="selectRangoEdad"
                invalidText="This is an invalid error message."
                labelText="Rango de Edad"
                light
              >
                <SelectItem text="Más de 20 años" value="Más de 20 años" />
                <SelectItem text="Más de 30 años" value="Más de 30 años" />
              </Select> */}
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
              {/* <Select
                defaultValue="placeholder-item"
                id="selectSexo"
                invalidText="This is an invalid error message."
                labelText="Sexo"
                light
              >
                <SelectItem text="Femenino" value="Femenino" />
                <SelectItem text="Masculino" value="Masculino" />
                <SelectItem text="Indistinto" value="Indistinto" />
              </Select> */}
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
              {/* <Select
                defaultValue="placeholder-item"
                id="selectEstadoCivil"
                invalidText="This is an invalid error message."
                labelText="Estado Civil"
                light
              >
                <SelectItem text="Soltero" value="Soltero" />
                <SelectItem text="Casado" value="Casado" />
                <SelectItem text="Viudo" value="Viudo" />
                <SelectItem text="Divorciado" value="Divorciado" />
                <SelectItem text="Indistinto" value="Indistinto" />
              </Select> */}
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
        {/* <div>
          <Checkbox 
            labelText="¿Existen Candidatos Sugeridos?" 
            id="checked"
            checked={checkSuggested}
            onChange = {() => {setCheckSuggested(!checkSuggested)
                               setCountUnique(1)}}
          />
        </div>
        {checkSuggested && <div>
          <RequirementGroup
            countFunc={setCountUnique}
            name="Candidatos Sugeridos"
            firstLabel="Nombre y Apellidos"
            secondLabel="Posición"
            type="3"
            checkUniqueValue={checkUnique}  
          />
          {(countUnique < 2) ? (
              <Checkbox
                labelText="Candidato Único"
                id="checked-2"
                checked={checkUnique}
                onChange = {() => setCheckUnique(!checkUnique)}/>
              ) : (
              <Checkbox
                labelText="Candidato Único"
                id="checked-2"
                checked={checkUnique}
                onChange = {() => setCheckUnique(!checkUnique)}
                disabled/>
              )}
        </div>} */}
        <div className="bx--row">
          <FileUploader
            className="custom-class"
            multiple
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
            labelTitle="Adjunta Organigrama y Descriptivo de Puesto"
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
    </Form>
  );
}
