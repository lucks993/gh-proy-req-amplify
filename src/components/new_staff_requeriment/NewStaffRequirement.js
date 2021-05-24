import React, { useState, useEffect } from "react";
import "./NewStaffRequirement.scss";
import "carbon-components/css/carbon-components.min.css";
import {
  Form,
  TextInput,
  TextArea,
  Select,
  SelectItem,
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
import { fetchOrgAsignation, fetchPosition, fetchPerson } from "../../services/api/servicies";

export default function NewStaffRequirement() {
  const [listOrgAsign, setListOrgAsign] = useState({
    listSociety: [],
    listDivision: [],
    listPhysicial: [],
    listVP: [],
    listUnit: [],
    listCenter: [],
  });
  const [listPuestos, setListPuestos] = useState([])
  const [puestoSelect, setPuestoSelect] = useState(null)
  const [puestoTiempoExpSelect, setPuestoTiempoExpSelect] = useState(null)
  const [puestoCivilStatusSelect, setPuestoCivilStatusSelect] = useState(null)
  const [puestoRangoEdadSelect, setPuestoRangoEdadSelect] = useState(null)
  const [puestoSexoSelect, setPuestoSexoSelect] = useState(null)
  const [puestoDetalle, setPuestoDetalle] = useState(() => {
    const information = {};
    listPuestos.forEach((puesto) => {
      information[puesto.id] = puesto.information;
    });
    return information;
  })
  const [checkPuesto, setCheckPuesto] = useState(() => {
    const statusInf = {};
    listPuestos.forEach((puesto) => {
      statusInf[puesto.id] = 0;
    });
    return statusInf;
  })
  const [posPuestoSelect, setPosPuestoSelect] = useState(0)
  const [listTrabajador, setListTrabajador] = useState([])
  const [minReq, setMinReq] = useState(1);
  const [maxReq, setMaxReq] = useState(200);
  const [checkCount, setCheckCount] = useState(false);
  const [checkReemp, setCheckReemp] = useState(false);

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
        setPuestoDetalle(() => {
          const information = {};
          positionFromServer.forEach((puesto) => {
            information[puesto.id] = puesto.information;
          });
          return information;
        })
        setCheckPuesto(() => {
          const statusInf = {};
          positionFromServer.forEach((puesto) => {
            statusInf[puesto.id] = 0;
          });
          return statusInf;
        })
    }
    getPosition()
    }, [])

  //Fetch Person
  useEffect(() => {
    const getPerson = async () => {
        const personFromServer = await fetchPerson()
        setListTrabajador(personFromServer)
    }
    getPerson()
    }, [])

  const verificarCant = () => {
    if (document.getElementById("cantidad").value > 1) {
      setCheckCount(true);
    } else {
      setCheckCount(false);
    }
  };

  const checkInitialState  = () => {
    let newCheckPuesto = {...checkPuesto}
      Object.keys(newCheckPuesto).map(function(key) {
        newCheckPuesto[key] = 0;
      });
    setCheckPuesto(newCheckPuesto)  
  }

  const assignPositionDesc = (item) => {
    setPuestoSelect(item.selectedItem)
    if(item.selectedItem != null){     
      setPuestoDetalle(item.selectedItem.information)
      checkInitialState()
      setCheckPuesto({...checkPuesto, [item.selectedItem.id]: 1})
      setPosPuestoSelect(item.selectedItem.id)
      setPuestoTiempoExpSelect(item.selectedItem.informationAdditional.timeExperience)
      setPuestoRangoEdadSelect(item.selectedItem.informationAdditional.rangeAge)
      setPuestoSexoSelect(item.selectedItem.informationAdditional.sex)
      setPuestoCivilStatusSelect(item.selectedItem.informationAdditional.civilStatus)
    }
    else{  
      setPuestoDetalle([])     
      checkInitialState()
      setPosPuestoSelect(0)
      setPuestoTiempoExpSelect(null)
      setPuestoRangoEdadSelect(null)
      setPuestoSexoSelect(null)
      setPuestoCivilStatusSelect(null)
    }
  }

  // const assignPositionCode = (item) => {
  //   console.log(item);
  //   if(item !== null && document.getElementById("comboNomPuesto").value !== ""){
  //     document.getElementById("comboCodPuesto").value = listPuestos[item.selectedItem.id-1].codePosition
  //     document.getElementById("selectTiempoExp").value = listPuestos[item.selectedItem.id-1].informationAdditional.timeExperience
  //     document.getElementById("selectRangoEdad").value = listPuestos[item.selectedItem.id-1].informationAdditional.rangeAge
  //     document.getElementById("selectSexo").value = listPuestos[item.selectedItem.id-1].informationAdditional.sex
  //     document.getElementById("selectEstadoCivil").value = listPuestos[item.selectedItem.id-1].informationAdditional.civilStatus
  //     console.log("Cod Puesto: " + document.getElementById("comboCodPuesto").value)
  //     console.log("Experiencia: " + document.getElementById("selectTiempoExp").value)
  //     console.log("Rango: " + document.getElementById("selectRangoEdad").value)
  //     console.log("Sexo: " + document.getElementById("selectSexo").value)
  //     console.log("Civil: " + document.getElementById("selectEstadoCivil").value)
  //   }
  //   else{
  //     document.getElementById("comboCodPuesto").value = ""
  //     document.getElementById("comboNomPuesto").value = ""
  //     document.getElementById("selectTiempoExp").value = "Más de 1 año"
  //     document.getElementById("selectRangoEdad").value = "Más de 20 años"
  //     document.getElementById("selectSexo").value = "Femenino"
  //     document.getElementById("selectEstadoCivil").value = "Soltero"
  //   }
  // }

  const saveRequest = () => {
    listOrgAsign.listSociety.map((society) => {
      console.log(society);
    });
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
              defaultSelected="radio-1"
            >
              <RadioButton
                labelText="Nuevo Planificado"
                value="radio-1"
                id="radio-1"
                onClick={() => setCheckReemp(false)}
              />
              <RadioButton
                labelText="Nuevo No Planificado"
                value="radio-2"
                id="radio-2"
                onClick={() => setCheckReemp(false)}
              />
              <RadioButton
                labelText="Reemplazo"
                value="radio-3"
                id="radio-3"
                onClick={() => setCheckReemp(true)}
              />
            </RadioButtonGroup>
          </div>
          <div className="bx--col-lg-5" style={{ marginBottom: "1.2rem"}}>
            {checkReemp && (
              <ComboBox
                onChange={() => {}}
                id="comboNomReemp"
                light
                items={listTrabajador}
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
              {/* <Select
                // defaultValue="placeholder-item"
                id="select-society"
                labelText="Sociedad"
                light
              >
                {listOrgAsign.listSociety.map(society => {
                    return(
                        <SelectItem 
                          key={society.id.toString()}
                          text={society.description}
                          value={society.id}/>
                    )
                })}
              </Select> */}
              <SelectOrg
                orgType="Sociedad"
                orgList={listOrgAsign.listSociety}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="VP/Dirección/Gerencia"
                orgList={listOrgAsign.listVP}
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Ubicación Física"
                orgList={listOrgAsign.listPhysicial}
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
              <Select
                defaultValue="placeholder-item"
                id="selectTipoBusq"
                invalidText="This is an invalid error message."
                labelText="Tipo de Busqueda"
                light
              >
                <SelectItem text="Interna" value="0" />
                <SelectItem text="Externa" value="1" />
              </Select>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <label class="label a_3">Datos de Solicitante</label>
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtNombreSol"
                  invalidText="Invalid error message."
                  labelText="Nombre"
                  placeholder="Placeholder text"
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
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Unidad Organizativa"
                orgList={listOrgAsign.listUnit}
              />
            </div>
            <div
              style={{ marginBottom: "1.14rem", backgroundColor: "#dadee9" }}>
              <SelectOrg
                orgType="Centro de Costos"
                orgList={listOrgAsign.listCenter}
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
                onChange={verificarCant}
              />
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <DatePicker
                datePickerType="single"
                locale="es"
                light
                style={{ backgroundColor: "#dadee9" }}
              >
                <DatePickerInput
                  placeholder="dd/mm/yyyy"
                  labelText="Fecha Estimada de Ingreso"
                  id="date-picker-single"
                />
              </DatePicker>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <Select
                // defaultValue="placeholder-item"
                id="selectTipoContract"
                // invalidText="This is an invalid error message."
                labelText="Tipo de Contrato"
                light
              >
                <SelectItem text="A plazo Indeterminado" value="1" />
                <SelectItem text="A plazo Fijo" value="2" />
                <SelectItem text="Convenio de Formación" value="3" />
              </Select>
            </div>
            {checkReemp && (<div style={{ marginBottom: "1.2rem" }}>
              <label class="label a_3">Datos de la persona a reemplazar</label>
            </div>)}
            {checkReemp && (
              <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
                <ComboBox
                  onChange={() => {}}
                  id="comboNombre"
                  light
                  items={listTrabajador}
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
              <Select
                defaultValue="placeholder-item"
                id="select-5"
                invalidText="This is an invalid error message."
                labelText="¿Vacante considerada en el Plan de Personal?"
                light
              >
                <SelectItem text="SÍ" value="option-1" />
                <SelectItem text="NO" value="option-2" />
              </Select>
            </div>
            <div style={{ marginBottom: "1.2em", backgroundColor: "#dadee9" }}>
              {/* <Select
                // defaultValue="placeholder-item"
                id="selectTiempoServ"
                // invalidText="This is an invalid error message."
                labelText="Tiempo de Servicio"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" />
                <SelectItem text="Option 3" value="option-3" />
              </Select> */}
              <TextInput
                  id="txtTiempoServ"
                  labelText="Tiempo de Servicio"
                  placeholder=""
                  light
                />
            </div>
            {checkReemp && checkCount && (
              <div style={{ marginTop: "2rem", backgroundColor: "#dadee9" }}>
                <TextArea
                  cols={10}
                  id="txta1"
                  invalidText="Invalid error message."
                  labelText="Lista Trabajadores"
                  rows={3}
                  light
                  style={{ resize: "none" }}
                  readOnly
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
            name="Describir las funciones o actividades especificas"
            firstLabel="Descripción"
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            name="Conocimiento Requerido"
            firstLabel="Descripción"
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            name="Habilidades Requeridas"
            firstLabel="Descripción"
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            name="Formación Académica"
            firstLabel="Formación"
            secondLabel="Grado Obtenido"
            type="2"
          />
        </div>
        <div>
          <RequirementGroup
            name="Centro de Estudios (no determinante)"
            firstLabel="Tipo"
            secondLabel="Centro de Estudios"
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
            name="Idiomas"
            firstLabel="Idioma"
            secondLabel="Nivel"
            puestoInformation={puestoDetalle}
            puestoInfCharac={checkPuesto[posPuestoSelect]}
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
