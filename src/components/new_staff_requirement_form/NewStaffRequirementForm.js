import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./NewStaffRequirementForm.scss";
import "carbon-components/css/carbon-components.min.css";
import {
  Form,
  TextInput,
  TextArea,
  Button,
  Modal,
  RadioButton,
  RadioButtonGroup,
} from "carbon-components-react";
import RequirementGroup from "./RequirementGroupForm";
import { selectedRow } from "../staff_requirement_course/CourseStaffRequirement";
import { selectedRow2 } from "../control_panel_staff/ControlPanelStaff";
import { selectedRow3 } from "../control_panel_staff_parcial/ControlPanelStaffParcial";
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
  const textArea = useRef();

  let rowExport = {}
  let banish = false
  if(!!selectedRow){
    rowExport = selectedRow
    // console.log("SelectedRow: " + selectedRow)
    // console.log("banish: " + banish)
  }
  else if (!!selectedRow2){
    rowExport = selectedRow2
    banish = true
    // console.log("banish: " + banish)
    // console.log("SelectedRow2: " + selectedRow2)
  }
  else if (!!selectedRow3){
    rowExport = selectedRow3
    banish = true
  }

  let listRep = rowExport[0].listReplacement.map(item => ({
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
    cant = rowExport[0].quantity;
    if (cant > 1 && (rowExport[0].type.id === 3)) {
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
    } else if (cant === 1 && (rowExport[0].type.id === 3)) {
      return (
        <div style={{ marginBottom: "2rem", backgroundColor: "#dadee9" }}>
          <TextInput
            id="txtNomReemp"
            invalidText="Invalid error message."
            labelText="Nombres y Apellidos:"
            value={listRep.map(item => {
              return item.datos
            })}
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
      id: rowExport[0].id,
      flow: (rowExport[0].flow.id === 1 && userReq.codeSuperior !== "0") ? 1 :
            (rowExport[0].approvedLevel === 0 && rowExport[0].flow.id === 2) ? 4 :
            (rowExport[0].flow.id < 6 ? (rowExport[0].flow.id + 1) : (rowExport[0].flow.id === 6 ? rowExport[0].flow.id :
                                          (rowExport[0].flow.id < 10 ? (rowExport[0].flow.id + 1) : rowExport[0].flow.id))), //Flow siguiente
      state: (rowExport[0].approvedLevel === 0 && rowExport[0].flow.id === 2) ? 3 :
             (rowExport[0].flow.id < 6 ? 2 : (rowExport[0].flow.id === 6 ? 3 :
                                          (rowExport[0].flow.id < 10 ? 2 : 3))),
      approver: userReq.approverRole, //id del usuario
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    console.log(JSON.stringify(data))
    const requestSend = await sendRequestApprover(data)
    props.history.goBack()
  }

  const rechazarReq = async () => {
    let data = {}

    // data.request = {
    let req = {   
      id: rowExport[0].id,
      observation: textArea.current.value,
      flow: rowExport[0].flow.id,    
      state: 4,
      dateApproved: new Date().today() + " T " + new Date().timeNow(),
    }
    data.request = [req]
    // console.log(JSON.stringify(data))
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
            defaultSelected={rowExport[0].type.id}
          >
            <RadioButton
              labelText="Nuevo Planificado"
              value={1}
              id="radio-1"
              disabled={rowExport[0].type.id !== 1}
            />
            <RadioButton
              labelText="Nuevo No Planificado"
              value={2}
              id="radio-2"
              disabled={rowExport[0].type.id !== 2}
            />
            <RadioButton
              labelText="Reemplazo"
              value={3}
              id="radio-3"
              disabled={rowExport[0].type.id !== 3}
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
                value={rowExport[0].society.description}
                light
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtVP"
                labelText="VP/Dirección/Gerencia"
                readOnly
                value={rowExport[0].vp.description}
                light
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtUFisica"
                labelText="Ubicación Física"
                readOnly
                value={rowExport[0].physLocation.description}
                light
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
              <TextInput
                id="txtBusqueda"
                labelText="Tipo de Busqueda"
                readOnly
                value={rowExport[0].search.description}
                light
              />
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
                  value={rowExport[0].applicant.person.apPaterno + " " +
                         rowExport[0].applicant.person.apMaterno + ", " +
                         rowExport[0].applicant.person.name}
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
                value={rowExport[0].compDivision.description}
                light
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtOrgUnit"
                labelText="Unidad Organizativa"
                readOnly
                value={rowExport[0].orgUnit.description}
                light
              />
            </div>
            <div
              style={{ marginBottom: "1.14rem", backgroundColor: "#dadee9" }}
            >
              <TextInput
                id="txtCentroCosto"
                labelText="Centro de Costos"
                readOnly
                value={rowExport[0].costCenter.description}
                light
              />
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
              <div>
                <br></br> <br></br>
              </div>
              <div style={{ backgroundColor: "#dadee9" }}>
                <TextInput
                  id="txtCargoSolicitante"
                  invalidText="Invalid error message."
                  labelText="Cargo"
                  value={rowExport[0].applicant.position.description}
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
                value={rowExport[0].position.codePosition}
                light
                readOnly
              />
            </div>
          </div>
          <div className="bx--col-lg-6">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtNomPuesto"
                labelText="Posición/Puesto"
                value={rowExport[0].position.description}
                light
                readOnly
              />
            </div>
          </div>
          <div className="bx--col-lg-2.1">
            <div style={{ backgroundColor: "#dadee9" }}>
              <TextInput
                id="cantidad"
                labelText="Cantidad de Vacantes"
                value={rowExport[0].quantity}
                light
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txt-date-picker-single"
                labelText="Fecha Estimada de Ingreso"
                value={rowExport[0].estimatedDate}
                light
                readOnly
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtTipoContrato"
                labelText="Tipo de Contrato"
                value={rowExport[0].contract.description}
                light
                readOnly
              />
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <label class="label a_3">Datos de la persona a reemplazar</label>
            </div>
            {verificarCant()}
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "9.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtConsideradoPlan"
                labelText="¿Vacante considerada en el Plan de Personal?"
                value={rowExport[0].vacancyConsidered}
                light
                readOnly
              />
            </div>
            <div style={{ marginBottom: "1.2rem", backgroundColor: "#dadee9" }}>
              <TextInput
                id="txtTiempoContrato"
                labelText="Tiempo de Contrato"
                value={rowExport[0].timeService}
                light
                readOnly
              />
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
                labelText="Justificación"
                rows={3}
                value={rowExport[0].justification}
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
            puestoInformation={rowExport[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={2}
            name="Conocimiento Requerido"
            firstLabel="Descripción"
            puestoInformation={rowExport[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={3}
            name="Habilidades Requeridas"
            firstLabel="Descripción"
            puestoInformation={rowExport[0].listCharacteristics}
            type="1"
          />
        </div>
        <div>
          <RequirementGroup
            id={4}
            name="Formación Académica"
            firstLabel="Formación"
            secondLabel="Grado Obtenido"
            puestoInformation={rowExport[0].listCharacteristics}
            type="2"
          />
        </div>
        <div>
          <RequirementGroup
            id={5}
            name="Centro de Estudios (no determinante)"
            firstLabel="Tipo"
            secondLabel="Centro de Estudios"
            puestoInformation={rowExport[0].listCharacteristics}
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
                value={rowExport[0].characteristicsAdditional.timeExperience}
                light
              />
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtEdadRange"
                labelText="Rango de Edad"
                readOnly
                value={rowExport[0].characteristicsAdditional.rangeAge}
                light
              />
            </div>
          </div>
          <div className="bx--col">
            <div style={{ marginBottom: "1.2rem" }}>
              <TextInput
                id="txtSex"
                labelText="Sexo"
                readOnly
                value={rowExport[0].characteristicsAdditional.sex}
                light
              />
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
                value={rowExport[0].characteristicsAdditional.civilStatus}
                light
              />
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
            puestoInformation={rowExport[0].listCharacteristics}
            type="2"
          />
        </div>
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
        {(!banish) &&
        (<div className="row-action">
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
                open={open}
                onRequestSubmit={() => rechazarReq()}
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
        </div>)}
        {(banish) &&
          (<div className="row-action">
            <Button
              kind="primary"
              className="b-action"
              kind="tertiary d_1"
              size="field"
              onClick={() => goToRequirement()}
            >
              Regresar
            </Button>
          </div>)
        }
      </div>
    </Form>
  );
}
