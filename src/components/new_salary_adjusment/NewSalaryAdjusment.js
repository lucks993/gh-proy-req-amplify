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
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableSelectAll,
  TableSelectRow,
} from "carbon-components-react";
import { Delete16 as Delete, Edit16 as Edit } from "@carbon/icons-react";
import { headerData, rowData } from "./sampleData";
import "./NewSalaryAdjusment.scss";
import "../../assets/scss/globa.scss";

class NewSalaryAdjusment extends React.Component {
  constructor(props) {
    super(props);
    let list = [];
    for (let index = 0; index < headerData.length; index++) list.push(true);
    this.state = {
      checked: false,
      dataContent: [0],
      headerDataContent: headerData,
      rowDataContent:
        localStorage.getItem("session") === null
          ? rowData
          : JSON.parse(localStorage.getItem("session")),
      visibleShowArray: list,
      auxiliar: 0,
      selectedHeadersByControl: [],
    };
    this.addRow = this.addRow.bind(this);
    this.testHide = this.testHide.bind(this);
    this.testShow = this.testShow.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
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
    if (this.state.selectedHeadersByControl.length > 0) {
      this.state.selectedHeadersByControl.forEach((e) => {
        let index = e.id;
        var currentState = this.state;
        currentState.headerDataContent[index].visibility = false;
        currentState.visibleShowArray[index] = false;
        this.setState(currentState);
      });
    } else {
      let index = e.target.id;
      var currentState = this.state;
      currentState.headerDataContent[index].visibility = false;
      currentState.visibleShowArray[index] = false;
      this.setState(currentState);
    }
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

  handleClick(e) {
    e.stopPropagation();
    // In that case, event.ctrlKey does the trick.
    if (e.ctrlKey) {
      console.debug(e.target);
      var button = e.target.querySelector("button");
      var currentState = this.state;
      currentState.selectedHeadersByControl.push(button);
      this.setState(currentState);
    }
  }

  render() {
    return (
      <div className="bg--grid">
        <h2>Ajuste Salarial</h2>
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
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={Edit}
                  >
                    Editar
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={Delete}
                  >
                    Eliminar
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <Button
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    size="small"
                    onClick={this.addRow}
                  >
                    Añadir Registro
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
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
                            <span>{header.header}</span>
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

                            {this.state.headerDataContent.length - 1 > index &&
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
                  {this.state.rowDataContent.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {this.state.headerDataContent[0].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>PROMOCION</option>
                            <option>REVISION SALARIAL</option>
                            <option>SINCERAMIENTO POS.</option>
                          </select>
                        </TableCell>
                      )}

                      {this.state.headerDataContent[1].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[2].visibility && (
                        <TableCell>
                          <input
                            type="date"
                            style={{ width: "140px" }}
                            value="2015-04-07"
                          />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[3].visibility && (
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
                          <span>LOGISTICA AQP</span>
                        </TableCell>
                      )}
                      {this.state.headerDataContent[7].visibility && (
                        <TableCell>
                          <select>
                            <option>SI</option>
                            <option>NO</option>
                          </select>
                        </TableCell>
                      )}

                      {this.state.headerDataContent[8].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[9].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[10].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[11].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[12].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[13].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[14].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[15].visibility && (
                        <TableCell>
                          <input
                            type="date"
                            style={{ width: "140px" }}
                            value="2019-03-10"
                          />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[16].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[17].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[18].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>PROMOCION</option>
                            <option>REVISION SALARIAL</option>
                            <option>SINCERAMIENTO POS.</option>
                          </select>
                        </TableCell>
                      )}
                      {this.state.headerDataContent[19].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[20].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[21].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[22].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>EMPLEADO</option>
                            <option>FUNCIONARIO</option>
                          </select>
                        </TableCell>
                      )}
                      {this.state.headerDataContent[23].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[24].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>SI</option>
                            <option>NO</option>
                          </select>
                        </TableCell>
                      )}
                      {this.state.headerDataContent[25].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[26].visibility && (
                        <TableCell>
                          <input type="date" style={{ width: "140px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[27].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[29].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[30].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[31].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[32].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[33].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[34].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[35].visibility && (
                        <TableCell>
                          <textarea class="textarea" />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[36].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[37].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[38].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[39].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[40].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[41].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[42].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[43].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[44].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[45].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[46].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[47].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[48].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[49].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[50].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[51].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[52].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[53].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[54].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[55].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[56].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[57].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[58].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[59].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[60].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[61].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[62].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[63].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[64].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[65].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[66].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[67].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[68].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[69].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[70].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}

                      {this.state.headerDataContent[71].visibility && (
                        <TableCell>
                          <textarea class="textarea" />
                        </TableCell>
                      )}
                      {this.state.headerDataContent[72].visibility && (
                        <TableCell>
                          <input
                            className="b--checkbox"
                            type="checkbox"
                            style={{ width: "100px" }}
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
          <Button kind="primary" size="small" disabled>
            Enviar
          </Button>
          <div className="spacer"></div>
          <Button className="btn--danger" size="small">
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}
export default NewSalaryAdjusment;
