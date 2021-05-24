import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./NewStaffRequirementForm.scss";
import "carbon-components/css/carbon-components.min.css";
import {
  Form,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Button,
  Modal,
  DatePicker,
  DatePickerInput,
  // Checkbox,
  RadioButton,
  RadioButtonGroup,
  ComboBox,
  NumberInput,
} from "carbon-components-react";
import RequirementGroup from "./RequirementGroupForm";

const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

export default function NewStaffRequirementForm () {
  // const [checkSuggested, setCheckSuggested] = useState(false)
  // const [checkUnique, setCheckUnique] = useState(false)
  // const [countUnique, setCountUnique] = useState(1)
  const [listPuestos, setListPuestos] = useState([{id:'0', cod: 'COD8975', text:'TÉCNICO'}, {id:'1', cod:'COD7153', text:'ANALISTA'}])
  const [minReq, setMinReq] = useState(1)
  const [maxReq, setMaxReq] = useState(200)
  const [countReq, setCountReq] = useState(5)
  // const [checkCount, setCheckCount] = useState(false)

  const verificarCant = () => {
    var cant
    cant = countReq
    if(cant > 1){
      return(
        <div style={{ marginTop: "1rem", backgroundColor:"#dadee9" }}>
                <TextArea
                cols={10}
                id="txta1"
                invalidText="Invalid error message."
                labelText="Lista Trabajadores"
                rows={3}
                defaultValue=" Marco Peres
                      Juan Reyes
                      Maria Nara
                      Javier Torres
                      Luis Suarez"
                light
                style={{ resize: "none" }}
                readOnly
              >
              </TextArea>
        </div>
      )
    }
    else{
      return(
        <div style={{ marginBottom: "2rem", backgroundColor:"#dadee9" }}>
          <TextInput
            id="txt3"
            invalidText="Invalid error message."
            labelText="Nombres y Apellidos:"
            placeholder="Juan Salaz"
            light
            readOnly
            style={{ height: "40px" }}
          />
        </div>
      )
    }
  }

  const goToRequirement = () =>{
    window.location.href="/requerimiento-personal-bandeja";
  }

  return (
    <Form>
      <div className="bg--grid">
        <h2>Requerimiento de Personal</h2>
        <p className="section-form" style={{ fontWeight: "bold", backgroundColor: "#002060"}}>001 Asignación Organizacional</p>
        <div class="bx--row">
          <RadioButtonGroup name="radio-button-group" defaultSelected="radio-3">
              <RadioButton labelText="Nuevo Planificado" value="radio-1" id="radio-1" disabled/>
              <RadioButton labelText="Nuevo No Planificado" value="radio-2" id="radio-2" disabled/>
              <RadioButton labelText="Reemplazo" value="radio-3" id="radio-3" />
          </RadioButtonGroup>
        </div>
        <div className="bx--row">
          <div className="bx--col">
          <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Sociedad"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" />
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-2"
                invalidText="This is an invalid error message."
                labelText="VP/Dirección/Gerencia"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-3"
                invalidText="This is an invalid error message."
                labelText="Ubicación Física"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select>
            </div>
            <div>
                <br></br> <br></br>
            </div>
            <hr style={{borderTop: "3px solid #aaaaaa"}}></hr>
            <div>
                <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-4"
                invalidText="This is an invalid error message."
                labelText="Tipo de Busqueda"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <label class="label a_3">Datos de Solicitante</label>
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor:"#dadee9" }}>
                <TextInput
                  id="txt1"
                  invalidText="Invalid error message."
                  labelText="Nombre"
                  readOnly
                  placeholder="Marco Sanchez"
                  light
                />
              </div>
            </div>
          </div>
          <div className="bx--col">
          <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="División Empresa"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-5"
                invalidText="This is an invalid error message."
                labelText="Unidad Organizativa"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select>
            </div>
            <div style={{ marginBottom: "1.14rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-6"
                invalidText="This is an invalid error message."
                labelText="Centro de Costos"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select>
            </div>
            <div>
                <br></br> <br></br>
            </div>
            <hr style={{borderTop: "3px solid #aaaaaa", marginBottom: "6.3rem"}}></hr>
            <div>
                <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "2.1rem" }}>
              {/* <label class="label a_3">Datos de Solicitante</label> */}
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor:"#dadee9" }}>
                <TextInput
                  id="txt2"
                  invalidText="Invalid error message."
                  labelText="Cargo"
                  placeholder="Analista"
                  light
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <p className="section-form" style={{ fontWeight: "bold", backgroundColor: "#002060"}}>002 Descripción del Puesto</p>
        <div className="bx--row">
          <div className="bx--col-lg-4">
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <ComboBox
                  onChange={() => {}}
                  id="comboCodPuesto"
                  light
                  items={listPuestos}
                  itemToString={(item) => (item ? item.cod : '')}
                  placeholder="Escriba código..."
                  titleText="Código de Posición a Reemplazar"
                  initialSelectedItem={listPuestos[1]}
                  disabled
              />
            </div>
          </div>
          <div className="bx--col-lg-6">
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <ComboBox
                  onChange={() => {}}
                  id="comboNomPuesto"
                  light
                  items={listPuestos}
                  itemToString={(item) => (item ? item.text : '')}
                  placeholder="Escriba puesto..."
                  titleText="Posición/Puesto"
                  initialSelectedItem={listPuestos[1]}
                  disabled
              />
            </div>
          </div>
          <div className="bx--col-lg-2.1">
            <div style={{ backgroundColor:"#dadee9" }}>
              <NumberInput
                  id="cantidad"
                  invalidText="Number is not valid"
                  label="Cantidad de Vacantes"
                  max={maxReq}
                  min={minReq}
                  step={1}
                  value={countReq}
                  light
                  readOnly
              />
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <DatePicker 
                dateFormat='d/m/Y'
                datePickerType="single"
                locale="es"
                allowInput="false"
                light
                style={{ backgroundColor:"#dadee9" }}>
                <DatePickerInput
                  placeholder="03/11/2010"
                  labelText="Fecha Estimada de Ingreso"
                  id="date-picker-single"
                  disabled
                />
              </DatePicker>
            </div>
          <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
            <Select
              defaultValue="placeholder-item"
              id="select-1"
              invalidText="This is an invalid error message."
              labelText="Tipo de Contrato"
              light
            >
              <SelectItem text="Option 1" value="option-1" disabled/>
              <SelectItem text="Option 2" value="option-2" />
              <SelectItem text="Option 3" value="option-3" disabled/>
            </Select>
          </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <label class="label a_3">Datos de la persona a reemplazar</label>
            </div>
            {verificarCant()}
            {/* <div style={{ marginBottom: "2rem", backgroundColor:"#dadee9" }}>
              <TextInput
                id="txt3"
                invalidText="Invalid error message."
                labelText="Nombres y Apellidos:"
                placeholder="Juan Salaz"
                light
                readOnly
                style={{ height: "40px" }}
              />
            </div> */}
          </div>          
          <div className="bx--col">
            <div style={{ marginBottom: "9.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-5"
                invalidText="This is an invalid error message."
                labelText="¿Vacante considerada en el Plan de Personal?"
                light
              >
                <SelectItem text="SÍ" value="option-1" />
                <SelectItem text="NO" value="option-2" disabled/>
              </Select>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor:"#dadee9" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Tiempo de Servicio"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select>
            </div>
            {/* {verificarCant()} */}
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "2rem", backgroundColor:"#dadee9" }}>
              <TextArea
                cols={20}
                id="txta1"
                invalidText="Invalid error message."
                labelText="Justificación"
                placeholder="Puede ser buena gente"
                rows={3}
                light
                readOnly
                style={{resize: "none"}}
              />
            </div>
          </div>
        </div>

        <p className="section-form" style={{ fontWeight: "bold", backgroundColor: "#002060"}}>003 Caracteristicas de los postulantes</p>
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
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Tiempo de Experiencia"
                light
              >
                <SelectItem text="Más de 1 año" value="Más de 1 año" />
                <SelectItem text="Más de 2 años" value="Más de 2 años" disabled/>
                <SelectItem text="Más de 3 años" value="Más de 3 años" disabled/>
                <SelectItem text="Más de 4 años" value="Más de 4 años" disabled/>
              </Select>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Rango de Edad"
                light
              >
                <SelectItem text="Más de 20 años" value="Más de 20 años" disabled/>
                <SelectItem text="Más de 30 años" value="Más de 30 años" />
              </Select>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Sexo"
                light
              >
                <SelectItem text="Femenino" value="option-1" disabled/>
                <SelectItem text="Masculino" value="option-2" disabled/>
                <SelectItem text="Indistinto" value="option-3" />
              </Select>
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <Select
                defaultValue="placeholder-item"
                id="select-2"
                invalidText="This is an invalid error message."
                labelText="Estado Civil"
                light
              >
                <SelectItem text="Soltero" value="option-1" disabled/>
                <SelectItem text="Casado" value="option-2" disabled/>
                <SelectItem text="Viudo" value="option-3" disabled/>
                <SelectItem text="Divorciado" value="option-4" disabled/>
                <SelectItem text="Indistinto" value="option-5" />
              </Select>
            </div>
          </div>
          <div className="bx--col"></div>
        </div>
        <div>
          <RequirementGroup
            name="Idiomas"
            firstLabel="Idioma"
            secondLabel="Nivel"
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
            disabled
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
                onChange = {() => setCheckUnique(!checkUnique)}
                disabled/>
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
          {/* <FileUploader
            accept={[
              '.docx',
              '.docm',
              '.pptx',
              '.pptm',
              '.xlsx',
              '.xlsm',
              '.pdf'
            ]}
            buttonKind="primary a"
            buttonLabel="Agregar"
            filenameStatus="edit"
            iconDescription="Clear file"
            labelDescription="Solo archivos de tipo Word, PowerPoint, Excel o PDF"
            labelTitle="Adjunta Organigrama / Descriptivo de Puesto"
          /> */}
        </div>
        <div className="row-action">
          {/* <Button kind="primary" className="b-action" size="field">
            Aprobar
          </Button> */}
          <Button className="custom-class" kind='tertiary a_1' size='field' >
                  Aprobar
          </Button>
          <div className="spacer"></div>
          <ModalStateManager
            renderLauncher={({ setOpen }) => (
              // <Button kind="danger" size="field" onClick={() => setOpen(true)}>
              //   Denegar
              // </Button>
              <Button className="custom-class" kind='tertiary b_1' size='field' onClick={() => setOpen(true)}>
                  Rechazar
              </Button>
              )}>
              {({ open, setOpen }) => (
                <Modal
                  modalHeading="Observaciones"
                  primaryButtonText="Guardar"
                  secondaryButtonText="Cancelar"
                  open={open}
                  onRequestClose={() => setOpen(false)}>
                  <p style={{ marginBottom: '1rem' }}>
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
          <div className="spacer"></div>
          {/* <Button kind="primary" size="field">
            Cancelar
          </Button> */}
          <Button 
            kind="primary" 
            className="b-action" 
            kind="tertiary d_1" 
            size="field" 
            onClick={() => goToRequirement()}>Regresar</Button>
        </div>
      </div>
    </Form>
  );
}
