import React, { useState } from "react";
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
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableSelectAll,
  TableSelectRow,
  TextInput,
  Select,
  SelectItem,
} from "carbon-components-react";
import { Delete16 as Delete, Edit16 as Edit } from "@carbon/icons-react";
import { headerData, rowData } from "./sampleDataBol";
import "./SalaryAdjusmentActionBolivian.scss";
import "../../assets/scss/globa.scss";
class SalaryAdjusmentActionBolivian extends React.Component {
  constructor(props) {
    super(props);
    let list = [];
    for (let index = 0; index < headerData.length; index++) list.push(true);
    this.state = {
      title: "Aprobaciones: Ajuste Salarial",
      checked: false,
      dataContent: [0],
      headerDataContent: headerData,
      rowDataContent:
        localStorage.getItem("session") === null
          ? rowData
          : JSON.parse(localStorage.getItem("session")),
      visibleShowArray: list,
      auxiliar: 0,
    };
    this.addRow = this.addRow.bind(this);
    this.testHide = this.testHide.bind(this);
    this.testShow = this.testShow.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  addRow() {
    var currentState = this.state;
    currentState.rowDataContent.push(currentState.rowDataContent[0]);
    for (let index = 0; index < currentState.rowDataContent.length; index++) {
      currentState.rowDataContent[index] = index;
    }
    this.setState(currentState);
    localStorage.setItem(
      "session",
      JSON.stringify(currentState.rowDataContent)
    );
  }
  testHide(e) {
    let index = e.target.id;
    var currentState = this.state;
    currentState.headerDataContent[index].visibility = false;
    currentState.visibleShowArray[index] = false;
    this.setState(currentState);
  }
  testShow(e) {
    let index = e.target.id;
    index++; //index going to show increased by 1
    var currentState = this.state;
    while (index < currentState.headerDataContent.length) {
      if (!currentState.headerDataContent[index].visibility) {
        currentState.headerDataContent[index].visibility = true;
        currentState.visibleShowArray[index] = true;
      } else {
        break;
      }
      index++;
    }

    this.setState(currentState);
  }

  handleCheck(e) {
    this.setState({
      checked: e.target.checked,
    });
  }
  handleHover(e) {
    var button = e.target.querySelector("button");
    if (button && button.getAttribute("data-tag").includes("bh")) {
      if (button.style.visibility === "hidden") {
        button.style.visibility = "visible";
      } else {
        button.style.visibility = "hidden";
      }
    }
  }
  render() {
    return (
      <div className="bg--grid">
        <div className="bg--row">
          <h2>{this.state.title}</h2>
        </div>
        <div className="bg--row filter-section">
          <div className="bg--row">
            <label className="title">Filtros</label>
          </div>
          <div className="bg--row mt-12">
            <Select
              defaultValue="placeholder-item"
              id="select-1"
              labelText="Sociedad"
              inline
            >
              <SelectItem text="Selecione..." value="placeholder-item" />
              <SelectItem text="Cementos Yura" value="Cementos Yura " />
              <SelectItem text="Centro" value="Centro" />
            </Select>
          </div>
        </div>
        <div className="bg--row">
          <DataTable rows={rowData} headers={headerData}>
            {({
              rows,
              headers,
              getHeaderProps,
              getTableProps,
              getTableContainerProps,
              getBatchActionProps,
              getToolbarProps,
              getSelectionProps,
            }) => (
              <TableContainer title="">
                <Table {...getTableProps()} size="compact">
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header, index) => {
                        return (
                          header.visibility && (
                            <TableHeader
                              id={index}
                              {...getHeaderProps({ header })}
                              onMouseEnter={this.handleHover}
                              onMouseLeave={this.handleHover}
                            >
                              {header.header}
                              {index > 0 && (
                                <button
                                  id={index}
                                  onClick={this.testHide}
                                  data-tag={"bh" + index}
                                  style={{ visibility: "hidden" }}
                                >
                                  -
                                </button>
                              )}

                              {this.state.headerDataContent.length - 1 >
                                index &&
                                !this.state.visibleShowArray[index + 1] && (
                                  <button
                                    id={index}
                                    onClick={this.testShow}
                                    data-tag={"bs" + index}
                                  >
                                    +
                                  </button>
                                )}
                            </TableHeader>
                          )
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rowDataContent.map((row) => (
                      <TableRow key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />

                        {this.state.headerDataContent[0].visibility && (
                          <TableCell>
                            <input
                              tpye="text"
                              style={{ width: "100px" }}
                            ></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[1].visibility && (
                          <TableCell>
                            <input
                              type="date"
                              style={{ width: "140px" }}
                              value="2016-08-06"
                            />
                          </TableCell>
                        )}
                        {this.state.headerDataContent[2].visibility && (
                          <TableCell>
                            <span>ASISTENTE DE ALMACEN</span>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[3].visibility && (
                          <TableCell>
                            <span>RACIEMSA - ADMINISTRACION - CALCESUR</span>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[4].visibility && (
                          <TableCell>
                            <span>CONTROL DE GESTION</span>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[5].visibility && (
                          <TableCell>
                            <span>EMPLEADO</span>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[6].visibility && (
                          <TableCell>
                            <span>CONTABILIDAD</span>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[7].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[8].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[9].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[10].visibility && (
                          <TableCell>
                            <input
                              type="date"
                              style={{ width: "140px" }}
                            ></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[11].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[12].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[13].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}
                        {this.state.headerDataContent[14].visibility && (
                          <TableCell>
                            <input style={{ width: "100px" }}></input>
                          </TableCell>
                        )}

                        {this.state.headerDataContent[15].visibility && (
                          <TableCell>
                            <input
                              type="checkbox"
                              style={{ height: "25px", width: "100px" }}
                              checked={this.state.checked}
                              onChange={this.handleCheck}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          <div className="row-action">
            <div className="spacer"></div>
            <Button kind="primary" className="btn--approve" size="small">
              Aprobar
            </Button>
            <div className="spacer"></div>
            <Button kind="danger" size="small">
              Desaprobar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default SalaryAdjusmentActionBolivian;
