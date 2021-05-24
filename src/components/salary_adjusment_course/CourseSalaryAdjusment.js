import React from "react";
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
  Search,
  TableSelectRow,
  TableSelectAll,
} from "carbon-components-react";

import { headerData, rowData } from "./sampleData";
import "./CourseSalaryAdjusment.scss";
import "../../assets/scss/globa.scss";

class CourseSalaryAdjusment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //state is by default an object
      dataContent: [0],
    };
    this.addRow = this.addRow.bind(this);
  }

  addRow() {
    var currentState = this.state;
    currentState.dataContent.push(currentState.dataContent.length);
    this.setState(currentState);
  }
  render() {
    return (
      <div className="bg--grid">
        <div class="bx--row">
          <div class="bx--col-lg-5">
            <h2>Estado de Solicitudes</h2>
          </div>
          <div class="bx--col-lg-7">
            <div className="bx--row">
              <b>Leyenda</b>
            </div>
            <div className="bx--row">
              <Button className="spacer-sm b-approved" size="small">
                Aprobado
              </Button>
              <Button className="spacer-sm b-denied" size="small">
                Denegado
              </Button>
              <Button className="spacer-sm b-proccess" size="small">
                En Proceso
              </Button>
            </div>
          </div>
        </div>
        <hr></hr>

        {/*<div style={{ width: "9000px" }}>
            {headerData.map(
              (row, index) =>
                index < headerData.length && (
                  <div style={{ display: "inline-block" }}>
                    <Search
                      id="search-1"
                      size="sm"
                      style={{ width: "90px", backgroundColor: "red" }}
                      labelText={index}
                      value={index}
                    />
                  </div>
                )
            )}
          </div>*/}
        <DataTable rows={rowData} headers={headerData}>
          {({
            rows,
            headers,
            getHeaderProps,
            getTableProps,
            getRowProps,
            getBatchActionProps,
            onInputChange,
            getSelectionProps,
          }) => (
            <TableContainer title="" className="center_titles">
              <Table {...getTableProps()} size="compact">
                <TableHead>
                  <TableRow>
                    {headers.map(
                      (header, index) =>
                        index < headers.length - 1 && (
                          <TableHeader {...getHeaderProps({ header })}>
                            {index < headers.length - 1 && (
                              <Search
                                id="search-1"
                                size="sm"
                                style={{
                                  width: "84px",
                                  display: "block",
                                }}
                              />
                            )}
                            <span
                              style={{
                                height: "50px",
                                display: "block",
                                textAlign: "center",
                                paddingTop: "8px",
                              }}
                            >
                              {header.header}
                            </span>
                          </TableHeader>
                        )
                    )}
                    <div className="bx--col">
                      <div className="bx--row" style={{ marginLeft: "-14px" }}>
                        Enviar Email
                      </div>
                      <div className="bx--row" style={{ marginLeft: "-17px" }}>
                        <TableSelectAll
                          name="select-all"
                          ariaLabel="Select all rows in the table"
                          {...getSelectionProps()}
                        ></TableSelectAll>
                      </div>
                    </div>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map(
                          (cell, index) =>
                            index < row.cells.length - 1 && (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            )
                        )}
                        {<TableSelectRow {...getSelectionProps({ row })} />}
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </div>
    );
  }
}
export default CourseSalaryAdjusment;
