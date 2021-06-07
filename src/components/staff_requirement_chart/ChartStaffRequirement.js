import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { GroupedBarChart, PieChart, LineChart } from "@carbon/charts-react";
import "carbon-components/css/carbon-components.min.css";
import {
    Select,
    SelectItem,
    TextArea
  } from "carbon-components-react";
import { barData1, barOption1, barData3, barOption3, barData4, barOption4,
        monthList, yearList } from "./sampleData";
import "@carbon/charts/styles.css";
import "./ChartStaffRequirement.scss";
import { fetchDataGraph1, fetchDataGraph3 } from "../../services/api/servicies";

export default function ChartStaffRequirement () {
const [idGraph, setIdGraph] = useState(0)
const [barData1Get, setBarData1Get] = useState([])
const [barData3Get, setBarData3Get] = useState([])

//Fetch Graph1
useEffect(() => {
    const getDataGraph = async () => {
        const dataGraphFromServer = await fetchDataGraph1()
        setBarData1Get(dataGraphFromServer)
    }
    getDataGraph()
    }, [])

//Fetch Graph3
useEffect(() => {
    const getDataGraph = async () => {
        const dataGraphFromServer = await fetchDataGraph3()
        setBarData3Get(dataGraphFromServer)
    }
    getDataGraph()
    }, [])


const showDiv = () => {
    setIdGraph(document.getElementById("GraficoReq").value)
}

const showInstrucctions = () => {
    if(idGraph > 0){
        return(
            <div style={{ marginBottom: "2rem"}}>
                    <TextArea
                        cols={20}
                        id="Indicaciones_Graph_Barras_1"
                        labelText="Indicaciones"
                        rows={2}
                        light
                        style={{resize: "none"}}
                        readOnly
                        defaultValue="- Colocar el cursos sobre una de las barras/piezas para visualizar los datos correspondientes.
- Para visualizar un solo grupo, seleccionar el deseado en la leyenda."
                    >
                    </TextArea>
            </div>
        )
    }
}

const showCalendar = () => {
    console.log(barData1Get)
    if(idGraph > 0 && idGraph !== "3")
        return (
            <div className="bx--row" style={{ marginBottom: "1.2rem" }}>
                <div className="bx--col">
                    <Select
                        defaultValue="placeholder-item"
                        id="monthSelect"
                        invalidText="This is an invalid error message."
                        labelText="MES"
                        light                     
                    >
                        <SelectItem text="Seleccione mes" value="placeholder-item" hidden/>
                    {
                        monthList.map((month) => (
                            <SelectItem key={month.id.toString()} text={month.name} value={month.value}/>
                        ))
                    }
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
                        <SelectItem text="Seleccione año" value="placeholder-item" hidden/>
                    {
                        yearList.map((year) => (
                            <SelectItem key={year.id.toString()} text={year.value.toString()} value={year.value}/>
                        ))
                    }
                    </Select>
                </div>
            </div>
        )
}

return(
    <div>
        <div style={{ marginBottom: "1.2rem", width: "700px"}}>
        <Select
            defaultValue="placeholder-item"
            id="GraficoReq"
            invalidText="This is an invalid error message."
            labelText="Seleccione gráfico:"
            light
            onChange={showDiv}
            >
            <SelectItem text="Elija una opción..." value="placeholder-item" hidden/>
            <SelectItem text="Resumen Requerimientos Aprobados por Empresa por Nueva Vacante y Reemplazo" value='1' />
            <SelectItem text="Resumen Requerimientos Aprobados por Empresa" value='2' />
            <SelectItem text="Acumulado Anual Requerimientos Aprobados" value='3' />
            </Select>
        </div>
        {showInstrucctions()}
        {showCalendar()}
        {(idGraph === "1") && (
            <div>
                <div>
                <GroupedBarChart
                    data={barData1Get}
                    options={barOption1}>      
                </GroupedBarChart>
                </div>
            </div>
        )}
        {(idGraph === "2") && <div>
        <PieChart
            data={barData3Get}
            options={barOption3}>      
        </PieChart>
        </div>}
        {(idGraph === "3") && <div>
        <LineChart
            data={barData4}
            options={barOption4}>      
        </LineChart>
        </div>}
    </div>  
)
}