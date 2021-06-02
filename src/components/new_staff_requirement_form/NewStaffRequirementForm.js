import React, { useState, useEffect, fetchRequest } from "react";
import ReactDOM from "react-dom";
import "./NewStaffRequirementForm.scss";
import "carbon-components/css/carbon-components.min.css";
import {
  Form,
  TextInput,
  TextArea,
  Button,
  Modal,
  // Checkbox,
  RadioButton,
  RadioButtonGroup,
  ComboBox,
  NumberInput,
} from "carbon-components-react";
import RequirementGroup from "./RequirementGroupForm";
import { selectedRow } from "../staff_requirement_course/CourseStaffRequirement";
import { sendRequestApprover, sendRequestReject } from "../../services/api/servicies";

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

export default function NewStaffRequirementForm(props) {
  // const [checkSuggested, setCheckSuggested] = useState(false)
  // const [checkUnique, setCheckUnique] = useState(false)
  // const [countUnique, setCountUnique] = useState(1)
  // const dataReq = selectedRow
  // const [listPuestos, setListPuestos] = useState([
  //   { id: "0", cod: "COD8975", text: "TÉCNICO" },
  //   { id: "1", cod: "COD7153", text: "ANALISTA" },
  // ]);
  // const [minReq, setMinReq] = useState(1);
  // const [maxReq, setMaxReq] = useState(200);
  // const [countReq, setCountReq] = useState(5);
  // const [checkCount, setCheckCount] = useState(false)
  let listRep = selectedRow[0].listReplacement.map(item => ({
    ...item, datos: item.codigo + " " + item.apPaterno + " " +
                    item.apMaterno + ", " + item.name + " // " +
                    item.position.description
  }))
  let userReq = {
    position: 2,
    name: "",
    apPaterno: "",
    apMaterno: "",
    codeSuperior: "0",
    approverRole: 2
  }
  const [obsValue, setObsValue] = useState("Este requerimiento no es conforme")

  const verificarCant = () => {
    var cant;
    cant = selectedRow[0].quantity;
    if (cant > 1 && (selectedRow[0].type.id === 3)) {
      return (
        <div style={{ marginTop: "1rem", backgroundColor: "#dadee9" }}>
          <TextArea
            cols={10}
            id="txtListReplace"
            invalidText="Invalid error message."
            labelText="Lista Trabajadores"
            rows={3}
            value={listRep.map(item => {
              return item.datos+"\n"
            })}
            light
            style={{ resize: "none" }}
            readOnly
          ></TextArea>
        </div>
      );
    } else if (cant === 1 && (selectedRow[0].type.id === 3)) {
      return (
        <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
          <TextInput
            id="txtNomReemp"
            invalidText="Invalid error message."
            labelText="Nombres y Apellidos:"
            value={listRep.map(item => {
              return item.datos
            })}
            // placeholder="Juan Salaz"
            light
            readOnly
            style={{ height: "40px" }}
          />
        </div>
      );
    }
  };

  const goToRequirement = () => {
    // window.location.href="/requerimiento-personal-bandeja";
    props.history.goBack();
  };

  const aprobarReq = async () => {
    const data = {}

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
    const requestSend = await sendRequestApprover(data)
    props.history.goBack()
  }

  const rechazarReq = async () => {
    const data = {}

    data.request = {
      id: selectedRow[0].id,
      observation: obsValue,
      flow: (selectedRow[0].flow.id <= 6) ? 4 : 8,    
      state: 4,
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestReject(data)
    props.history.goBack()
  }

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
        <div class="bx--row">
          <RadioButtonGroup
            name="radio-button-group"
            defaultSelected={selectedRow[0].type.id}
          >
            <RadioButton
              labelText="Nuevo Planificado"
              value={1}
              id="radio-1"
              disabled={selectedRow[0].type.id !== 1}
            />
            <RadioButton
              labelText="Nuevo No Planificado"
              value={2}
              id="radio-2"
              disabled={selectedRow[0].type.id !== 2}
            />
            <RadioButton
              labelText="Reemplazo"
              value={3}
              id="radio-3"
              disabled={selectedRow[0].type.id !== 3}
            />
          </RadioButtonGroup>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtSociedad"
                labelText="Sociedad"
                readOnly
                value={selectedRow[0].society.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Sociedad"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" />
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select> */}
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtVP"
                labelText="VP/Dirección/Gerencia"
                readOnly
                value={selectedRow[0].vp.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-2"
                invalidText="This is an invalid error message."
                labelText="VP/Dirección/Gerencia"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select> */}
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtUFisica"
                labelText="Ubicación Física"
                readOnly
                value={selectedRow[0].physLocation.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-3"
                invalidText="This is an invalid error message."
                labelText="Ubicación Física"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select> */}
            </div>
            <div>
              <br></br> <br></br>
            </div>
            <hr style={{ borderTop: "3px solid #aaaaaa" }}></hr>
            <div>
              <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtBusqueda"
                labelText="Tipo de Busqueda"
                readOnly
                value={selectedRow[0].search.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-4"
                invalidText="This is an invalid error message."
                labelText="Tipo de Busqueda"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select> */}
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <label class="label a_3">Datos de Solicitante</label>
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtNombreSolicitante"
                  invalidText="Invalid error message."
                  labelText="Nombre"
                  readOnly
                  value={selectedRow[0].applicant.person.apPaterno + " " +
                         selectedRow[0].applicant.person.apMaterno + ", " +
                         selectedRow[0].applicant.person.name}
                  light
                />
              </div>
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtDivEmpresa"
                labelText="División Empresa"
                readOnly
                value={selectedRow[0].compDivision.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="División Empresa"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select> */}
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtOrgUnit"
                labelText="Unidad Organizativa"
                readOnly
                value={selectedRow[0].orgUnit.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-5"
                invalidText="This is an invalid error message."
                labelText="Unidad Organizativa"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select> */}
            </div>
            <div
              style={{ marginBottom: "1.14rem", backgroundColor: "#dadee9" }}
            >
              <TextInput
                id="txtCentroCosto"
                labelText="Centro de Costos"
                readOnly
                value={selectedRow[0].costCenter.description}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-6"
                invalidText="This is an invalid error message."
                labelText="Centro de Costos"
                light
              >
                <SelectItem text="Option 1" value="option-1" />
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" disabled/>
              </Select> */}
            </div>
            <div>
              <br></br> <br></br>
            </div>
            <hr
              style={{ borderTop: "3px solid #aaaaaa", marginBottom: "6.3rem" }}
            ></hr>
            <div>
              <br></br> <br></br>
            </div>
            <div style={{ marginBottom: "2.1rem" }}>
              {/* <label class="label a_3">Datos de Solicitante</label> */}
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtCargoSolicitante"
                  invalidText="Invalid error message."
                  labelText="Cargo"
                  value={selectedRow[0].applicant.position.description}
                  light
                  readOnly
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
              <TextInput
                id="txtCodPuesto"
                labelText="Código de Posición a Reemplazar"
                value={selectedRow[0].position.codePosition}
                light
                readOnly
              />
              {/* <ComboBox
                  onChange={() => {}}
                  id="comboCodPuesto"
                  light
                  items={listPuestos}
                  itemToString={(item) => (item ? item.cod : '')}
                  placeholder="Escriba código..."
                  titleText="Código de Posición a Reemplazar"
                  initialSelectedItem={listPuestos[1]}
                  disabled
              /> */}
            </div>
          </div>
          <div className="bx--col-lg-6">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtNomPuesto"
                labelText="Posición/Puesto"
                value={selectedRow[0].position.description}
                light
                readOnly
              />
              {/* <ComboBox
                  onChange={() => {}}
                  id="comboNomPuesto"
                  light
                  items={listPuestos}
                  itemToString={(item) => (item ? item.text : '')}
                  placeholder="Escriba puesto..."
                  titleText="Posición/Puesto"
                  initialSelectedItem={listPuestos[1]}
                  disabled
              /> */}
            </div>
          </div>
          <div className="bx--col-lg-2.1">
            <div style={{ backgroundColor: "#dadee9" }}>
              <TextInput
                id="cantidad"
                labelText="Cantidad de Vacantes"
                value={selectedRow[0].quantity}
                light
                readOnly
              />
              {/* <NumberInput
                  id="cantidad"
                  invalidText="Number is not valid"
                  label="Cantidad de Vacantes"
                  max={maxReq}
                  min={minReq}
                  step={1}
                  value={countReq}
                  light
                  readOnly
              /> */}
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txt-date-picker-single"
                labelText="Fecha Estimada de Ingreso"
                value={selectedRow[0].estimatedDate}
                light
                readOnly
              />
              {/* <DatePicker 
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
              </DatePicker> */}
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtTipoContrato"
                labelText="Tipo de Contrato"
                value={selectedRow[0].contract.description}
                light
                readOnly
              />
              {/* <Select
              defaultValue="placeholder-item"
              id="select-1"
              invalidText="This is an invalid error message."
              labelText="Tipo de Contrato"
              light
            >
              <SelectItem text="Option 1" value="option-1" disabled/>
              <SelectItem text="Option 2" value="option-2" />
              <SelectItem text="Option 3" value="option-3" disabled/>
            </Select> */}
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
            <div style={{ marginBottom: "9.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtConsideradoPlan"
                labelText="¿Vacante considerada en el Plan de Personal?"
                value={selectedRow[0].vacancyConsidered}
                light
                readOnly
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-5"
                invalidText="This is an invalid error message."
                labelText="¿Vacante considerada en el Plan de Personal?"
                light
              >
                <SelectItem text="SÍ" value="option-1" />
                <SelectItem text="NO" value="option-2" disabled/>
              </Select> */}
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtTiempoContrato"
                labelText="Tiempo de Contrato"
                value={selectedRow[0].timeService}
                light
                readOnly
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Tiempo de Servicio"
                light
              >
                <SelectItem text="Option 1" value="option-1" disabled/>
                <SelectItem text="Option 2" value="option-2" disabled/>
                <SelectItem text="Option 3" value="option-3" />
              </Select> */}
            </div>
            {/* {verificarCant()} */}
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
              <TextArea
                cols={20}
                id="txtJusti"
                // invalidText="Invalid error message."
                labelText="Justificación"
                // placeholder="Puede ser buena gente"
                rows={3}
                value={selectedRow[0].justification}
                light
                readOnly
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
            name="Describir las funciones o actividades especificas"
            firstLabel="Descripción"
            puestoInformation={selectedRow[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={2}
            name="Conocimiento Requerido"
            firstLabel="Descripción"
            puestoInformation={selectedRow[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={3}
            name="Habilidades Requeridas"
            firstLabel="Descripción"
            puestoInformation={selectedRow[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={4}
            name="Formación Académica"
            firstLabel="Formación"
            secondLabel="Grado Obtenido"
            puestoInformation={selectedRow[0].listCharacteristics}
            type="2"
          />
        </div>
        <div>
          <RequirementGroup
            id={5}
            name="Centro de Estudios (no determinante)"
            firstLabel="Tipo"
            secondLabel="Centro de Estudios"
            puestoInformation={selectedRow[0].listCharacteristics}
            type="2"
          />
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtTiempoExp"
                labelText="Tiempo de Experiencia"
                readOnly
                value={selectedRow[0].characteristicsAdditional.timeExperience}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Tiempo de Experiencia"
                light
              >
                <SelectItem text="Más de 1 año" value="Más de 1 año" />
                <SelectItem
                  text="Más de 2 años"
                  value="Más de 2 años"
                  disabled
                />
                <SelectItem
                  text="Más de 3 años"
                  value="Más de 3 años"
                  disabled
                />
                <SelectItem
                  text="Más de 4 años"
                  value="Más de 4 años"
                  disabled
                />
              </Select> */}
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtEdadRange"
                labelText="Rango de Edad"
                readOnly
                value={selectedRow[0].characteristicsAdditional.rangeAge}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Rango de Edad"
                light
              >
                <SelectItem
                  text="Más de 20 años"
                  value="Más de 20 años"
                  disabled
                />
                <SelectItem text="Más de 30 años" value="Más de 30 años" />
              </Select> */}
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtSex"
                labelText="Sexo"
                readOnly
                value={selectedRow[0].characteristicsAdditional.sex}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-1"
                invalidText="This is an invalid error message."
                labelText="Sexo"
                light
              >
                <SelectItem text="Femenino" value="option-1" disabled />
                <SelectItem text="Masculino" value="option-2" disabled />
                <SelectItem text="Indistinto" value="option-3" />
              </Select> */}
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtCivil"
                labelText="Estado Civil"
                readOnly
                value={selectedRow[0].characteristicsAdditional.civilStatus}
                light
              />
              {/* <Select
                defaultValue="placeholder-item"
                id="select-2"
                invalidText="This is an invalid error message."
                labelText="Estado Civil"
                light
              >
                <SelectItem text="Soltero" value="option-1" disabled />
                <SelectItem text="Casado" value="option-2" disabled />
                <SelectItem text="Viudo" value="option-3" disabled />
                <SelectItem text="Divorciado" value="option-4" disabled />
                <SelectItem text="Indistinto" value="option-5" />
              </Select> */}
            </div>
          </div>
          <div className="bx--col"></div>
        </div>
        <div>
          <RequirementGroup
            id={6}
            name="Idiomas"
            firstLabel="Idioma"
            secondLabel="Nivel"
            puestoInformation={selectedRow[0].listCharacteristics}
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
          <Button
            className="custom-class"
            kind="tertiary a_1"
            size="field"
            onClick={() => aprobarReq()}
          >
            Aprobar
          </Button>
          <div className="spacer"></div>
          <ModalStateManager
            renderLauncher={({ setOpen }) => (
              // <Button kind="danger" size="field" onClick={() => setOpen(true)}>
              //   Denegar
              // </Button>
              <Button
                className="custom-class"
                kind="tertiary b_1"
                size="field"
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
                onRequestSubmit={() => rechazarReq()}
                onRequestClose={() => setOpen(false)}
              >
                <p style={{ marginBottom: "1rem" }}>
                  Escriba las observaciones correspondientes
                </p>
                <TextArea
                  data-modal-primary-focus
                  id="textRejectAlone"
                  placeholder="Escriba aquí..."
                  defaultValue={obsValue}
                  // onChange={obsOnChangeText()}
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
            onClick={() => goToRequirement()}
          >
            Regresar
          </Button>
        </div>
      </div>
    </Form>
  );
}
