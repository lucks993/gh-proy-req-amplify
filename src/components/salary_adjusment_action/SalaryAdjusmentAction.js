import React, { useState, useEffect } from "react";
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
  TableSelectAll,
  TableSelectRow,
  SelectItem,
  Select,
} from "carbon-components-react";
import { Delete16 as Delete, Edit16 as Edit } from "@carbon/icons-react";
import { headerData, rowData } from "./sampleData";
import "./SalaryAdjusmentAction.scss";
import "../../assets/scss/globa.scss";
const SalaryAdjusmentAction = (e) => {
  let list = [];
  for (let index = 0; index < headerData.length; index++) list.push(true);

  const [dataContent, setDataContent] = useState([0]);
  const [headerDataContent, setHeaderDataContent] = useState(headerData);
  const [rowDataContent, setRowDataContent] = useState(
    localStorage.getItem("session") === null
      ? rowData
      : JSON.parse(localStorage.getItem("session"))
  );
  const [visibleShowArray, setVisibleShowArray] = useState(list);
  const [selectedHeadersByControl, setSelectedHeadersByControl] = useState([]);
  /*componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }*/
  const addRow = () => {
    console.log(rowDataContent);
    let aux = [];
    aux = rowDataContent;
    aux.push(rowDataContent[0]);
    for (let index = 0; index < rowDataContent.length; index++) {
      aux[index] = index;
    }

    setRowDataContent(aux);
    localStorage.setItem("session", JSON.stringify(rowDataContent));
  };
  const testHide = (e) => {
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
  };
  const testShow = (e) => {
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
  };

  const handleHover = (e) => {
    var button = e.target.querySelector("button");
    if (button && button.getAttribute("data-tag").includes("bh")) {
      if (button.style.visibility === "hidden") {
        button.style.visibility = "visible";
      } else {
        button.style.visibility = "hidden";
      }
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // In that case, event.ctrlKey does the trick.
    if (e.ctrlKey) {
      console.debug(e.target);
      var button = e.target.querySelector("button");
      var currentState = this.state;
      currentState.selectedHeadersByControl.push(button);
      this.setState(currentState);
    }
  };
  return (
    <div className="bg--grid">
      <div className="bg--row">
        <h2>
          <b>Ajuste Salarial</b>
        </h2>
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
            getRowProps,
            getTableContainerProps,
            getBatchActionProps,
            getToolbarProps,
            getSelectionProps,
          }) => (
            <TableContainer title="">
              <Table {...getTableProps()} size="compact">
                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => {
                      return (
                        header.visibility && (
                          <TableHeader
                            id={index}
                            {...getHeaderProps({ header })}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHover}
                          >
                            {header.header}
                            {index > 0 && (
                              <button
                                id={index}
                                onClick={testHide}
                                data-tag={"bh" + index}
                                style={{ visibility: "hidden" }}
                              >
                                -
                              </button>
                            )}

                            {headerDataContent.length - 1 > index &&
                              !visibleShowArray[index + 1] && (
                                <button
                                  id={index}
                                  onClick={testShow}
                                  data-tag={"bs" + index}
                                >
                                  +
                                </button>
                              )}
                          </TableHeader>
                        )
                      );
                    })}

                    <TableSelectAll
                      name="select-all"
                      ariaLabel="Select all rows in the table"
                      {...getSelectionProps()}
                    ></TableSelectAll>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowDataContent.map((row, index) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {headerDataContent[0].visibility && (
                        <TableCell>PROMOCION</TableCell>
                      )}

                      {headerDataContent[1].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[2].visibility && (
                        <TableCell>2015-04-07</TableCell>
                      )}
                      {headerDataContent[3].visibility && (
                        <TableCell>
                          <span>ASISTENTE DE ALMACEN</span>
                        </TableCell>
                      )}

                      {headerDataContent[3].visibility && (
                        <TableCell>
                          <span>RACIEMSA - ADMINISTRACION - CALCESUR</span>
                        </TableCell>
                      )}
                      {headerDataContent[4].visibility && (
                        <TableCell>
                          <span>CONTROL DE GESTION</span>
                        </TableCell>
                      )}
                      {headerDataContent[5].visibility && (
                        <TableCell>
                          <span>EMPLEADO</span>
                        </TableCell>
                      )}
                      {headerDataContent[6].visibility && (
                        <TableCell>
                          <span>LOGISTICA AQP</span>
                        </TableCell>
                      )}
                      {headerDataContent[7].visibility && (
                        <TableCell>
                          <select>
                            <option>SI</option>
                            <option>NO</option>
                          </select>
                        </TableCell>
                      )}

                      {headerDataContent[8].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[9].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[10].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[11].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[12].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[13].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[14].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[15].visibility && (
                        <TableCell>2019-03-10</TableCell>
                      )}
                      {headerDataContent[16].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[17].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[18].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>PROMOCION</option>
                            <option>REVISION SALARIAL</option>
                            <option>SINCERAMIENTO POS.</option>
                          </select>
                        </TableCell>
                      )}
                      {headerDataContent[19].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[20].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[21].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[22].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>EMPLEADO</option>
                            <option>FUNCIONARIO</option>
                          </select>
                        </TableCell>
                      )}
                      {headerDataContent[23].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[24].visibility && (
                        <TableCell>
                          <select className="large-bootstrap-select">
                            <option>SI</option>
                            <option>NO</option>
                          </select>
                        </TableCell>
                      )}
                      {headerDataContent[25].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[26].visibility && (
                        <TableCell>
                          <input type="date" style={{ width: "140px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[27].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[29].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[30].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[31].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[32].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[33].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[34].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[35].visibility && (
                        <TableCell>
                          <textarea className="textarea" />
                        </TableCell>
                      )}
                      {headerDataContent[36].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[37].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[38].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[39].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[40].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[41].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[42].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[43].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[44].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[45].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[46].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[47].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[48].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[49].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[50].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[51].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[52].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[53].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[54].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[55].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[56].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[57].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[58].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[59].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[60].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[61].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[62].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[63].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[64].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[65].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[66].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[67].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[68].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[69].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}
                      {headerDataContent[70].visibility && (
                        <TableCell>
                          <input type="text" style={{ width: "100px" }} />
                        </TableCell>
                      )}

                      {headerDataContent[71].visibility && (
                        <TableCell>
                          <textarea className="textarea" />
                        </TableCell>
                      )}
                      {
                        <TableSelectRow
                          {...getSelectionProps({ row })}
                          checked
                        />
                      }
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
};
export default SalaryAdjusmentAction;
