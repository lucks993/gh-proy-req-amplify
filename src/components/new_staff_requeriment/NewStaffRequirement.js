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
  const [societySelect, setSocietySelect] = useState(1)   //Sociedad
  const [divisionSelect, setDivisionSelect] = useState(1) //Division
  const [physicalSelect, setPhysicalSelect] = useState(1) //U Fisica
  const [vpSelect, setVPSelect] = useState(1)             //VP
  const [unitSelect, setUnitSelect] = useState(1)         //Unidad
  const [centerSelect, setCenterSelect] = useState(1)     //Centro
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
  const [listPersonaSelectNombre, setListPersonaSelectNombre] = useState([])
  const [personaSelect, setPersonaSelect] = useState(null)  //Persona Select
  //Usuario
  const [userReq, setUserReq] = useState({
    position: "",
    name: "",
    apPaterno: "",
    apMaterno: "",
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
                    apMaterno: personFromServer[1].apMaterno})
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
    if(!!item){
      setSocietySelect(item)
    }
  };

  const divisionSelectOnChange = (item) => {
    if(!!item){
      setDivisionSelect(item)
    }
  };

  const physicalSelectOnChange = (item) => {
    if(!!item){
      setPhysicalSelect(item)
    }
  };

  const vpSelectOnChange = (item) => {
    if(!!item){
      setVPSelect(item)
    }
  };

  const unitSelectOnChange = (item) => {
    if(!!item){
      setUnitSelect(item)
    }
  };

  const centerSelectOnChange = (item) => {
    if(!!item){
      setCenterSelect(item)
    }
  };

  const assignPersonDesc = (item) => {
    setPersonaSelect(item.selectedItem)
    if(!!item.selectedItem){
      setListPersonaSelect([...listPersonaSelect, {id: item.selectedItem.id}])
      setListPersonaSelectNombre([...listPersonaSelectNombre, item.selectedItem.name])
    }
    // console.log(listPersonaSelect)
    // if(item.selectedItem != null){
    //   assignPositionDesc(item.selectedItem.position)
    // }
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

  const descListPerson = () => {
    return (event => {
      
    })
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
    if(!!puestoSelect && !!estimDate && tiempoServ !== "" && vacanteTipo !=="" && reqTipo !== 0 && contratoTipo !== 0 && busqTipo !== 0){
      const data = {}    
      let listCharac = [] 
      if(!!reqGroupFunc.current){
        listCharac = [...listCharac, ...reqGroupFunc.current.getDataContent()]
      }
      if(!!reqGroupCon.current){
        listCharac = [...listCharac, ...reqGroupCon.current.getDataContent()]
      }
      if(!!reqGroupHab.current){
        listCharac = [...listCharac, ...reqGroupHab.current.getDataContent()]
      }
      if(!!reqGroupAcad.current){
        listCharac = [...listCharac, ...reqGroupAcad.current.getDataContent()]
      }
      if(!!reqGroupEst.current){
        listCharac = [...listCharac, ...reqGroupEst.current.getDataContent()]
      }
      if(!!reqGroupIdi.current){
        listCharac = [...listCharac, ...reqGroupIdi.current.getDataContent()]
      }
      data.request = {
        society: societySelect,
        organizationalUnit: unitSelect,
        physicalLocation: physicalSelect,
        costCenter: centerSelect,
        companyDivision: divisionSelect,
        vPManagement: vpSelect,
        observation: "",
        requestDate: new Date().toJSON().replace(/-/g,'/'),
        quantity: cantReq,
        estimatedDate: new Date(estimDate).toJSON().slice(0,10).replace(/-/g,'/'),
        timeService: tiempoServ,
        justification: justifServ,
        approvedLevel: 1,
        vacancyConsidered: vacanteTipo, 
        typeRequest: reqTipo,
        typeState: 1,
        flow: 1,
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
                items={listTrabajador}
                // selectedItem={personaSelect}
                itemToString={(item) => (item ? (item.apPaterno + " " + item.apMaterno + ", " + item.name) : "")}
                placeholder="Escriba nombre del trabajador a reemplazar..."
                shouldFilterItem={({ item: { name }, inputValue }) => 
                  name.toLowerCase().includes(inputValue.toLowerCase())
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
                selectOnChange={societySelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="VP/Dirección/Gerencia"
                orgList={listOrgAsign.listVP}
                selectOnChange={vpSelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Ubicación Física"
                orgList={listOrgAsign.listPhysicial}
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
                selectOnChange={divisionSelectOnChange}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Unidad Organizativa"
                orgList={listOrgAsign.listUnit}
                selectOnChange={unitSelectOnChange}
              />
            </div>
            <div
              style={{ marginBottom: "1.14rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Centro de Costos"
                orgList={listOrgAsign.listCenter}
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
                value={minReq}
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
                titleText="Tiempo de Contrato"
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
                  items={listTrabajador}
                  selectedItem={personaSelect}
                  itemToString={(item) => (item ? (item.apPaterno + " " + item.apMaterno + ", " + item.name) : "")}
                  placeholder="Escriba nombre..."
                  titleText="Nombres y Apellidos"
                  shouldFilterItem={({ item: { name }, inputValue }) =>
                    name.toLowerCase().includes(inputValue.toLowerCase())
                  }
                ></ComboBox>
              </div>
            )}
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.6rem", backgroundColor: "#dadee9" }}>
            <ComboBox
                onChange={(item) => {setVacanteTipo(item.selectedItem)}}
                id="comboTipoBusq"
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
                  labelText="Tiempo de Servicio"
                  placeholder="Escriba tiempo de servicio"
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
                  id="txta1"
                  invalidText="Invalid error message."
                  labelText="Lista Trabajadores"
                  rows={3}
                  light
                  style={{ resize: "none" }}
                  readOnly
                  value={listPersonaSelectNombre}
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
                id="txta1"
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
