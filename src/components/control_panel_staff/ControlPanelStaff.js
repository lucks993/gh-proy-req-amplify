import React, { useState, useEffect } from "react";
import { Email32, DocumentDownload32 } from "@carbon/icons-react";
import TableToExcel from "@linways/table-to-excel";
import "carbon-components/css/carbon-components.min.css";
import {
  Button,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Select,
  SelectItem,
} from "carbon-components-react";
import { headerData, rowData, monthList, yearList } from "./sampleData";
import "./ControlPanelStaff.scss";
import { fetchRequest } from "../../services/api/servicies";

export default function ControlPanelStaff() {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [listRequest, setListRequest] = useState([]);
  const [infRequest, setInfRequest] = useState(() => {
    const dataReq = [{}];
    listRequest.forEach((req) => {
      dataReq[req.id-1] = {id: req.id.toString(), 
                          index: req.id, 
                          state: req.state.description,
                          society: req.society.description, 
                          position: req.position.description,
                          typeOfVacant: req.type.description,
                          codOfVacant: req.position.codePosition,
                          replaceOf: req.listReplacement,
                          orgUnit: req.orgUnit.description,
                          centerOfCost: req.costCenter.description,
                          physicLocation: req.physicalLocation.description,
                          category: req.search.description,
                          typeOfContract: req.contract.description,
                          timeOfContract: req.timeService,
                          justify: req.justification,
                          description: req.position.information,
                          observation: req.observation,
                          dateState: req.requestDate,
                          status: req.flow.section,
                          check: false}
    });
    return dataReq;
  });

  //Fetch Requirement Request Employee
  useEffect(() => {
    const getRequest = async () => {
      const requestFromServer = await fetchRequest();
      setListRequest(requestFromServer);
      setInfRequest(() => {
        const dataReq = [{}]
        requestFromServer.map((req) => {
          dataReq[req.id-1] = {id: req.id.toString(), 
                             index: req.id, 
                             state: req.state.description,
                             society: req.society.description, 
                             position: req.position.description,
                             typeOfVacant: req.type.description,
                             codOfVacant: req.position.codePosition,
                             replaceOf: req.listReplacement,
                             orgUnit: req.orgUnit.description,
                             centerOfCost: req.costCenter.description,
                             physicLocation: req.physLocation.description,
                             category: req.search.description,
                             quantity: req.quantity,
                             typeOfContract: req.contract.description,
                             timeOfContract: req.timeService,
                             justify: req.justification,
                             description: req.position.information,
                             observation: req.observation,
                             dateState: req.requestDate,
                             status: req.flow.section,
                             check: false}
        });
        return dataReq;
      })
    };
    getRequest();
  }, []);

  const addRow = () => {
    var currentState = this.state;
    currentState.dataContent.push(currentState.dataContent.length);
    this.setState(currentState);
  };

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
                key={month.id.toString}
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
        {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
          <TableContainer title="">
            <Table {...getTableProps()} size="compact" id="table">
              <TableHead>
                <TableRow>
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
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.value}
                          {(cell.value === false || cell.value === true) && (
                            <input
                              type="checkbox"
                              style={{ height: "25px", width: "100px" }}
                            ></input>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
