import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { GroupedBarChart, PieChart, LineChart } from "@carbon/charts-react";
import "carbon-components/css/carbon-components.min.css";
import {
    Select,
    SelectItem,
    ComboBox,
    TextArea
  } from "carbon-components-react";
import { barOption1, barOption3, barOption4,
        monthList, yearList } from "./sampleData";
import "@carbon/charts/styles.css";
import "./ChartStaffRequirement.scss";
import { fetchDataGraph1, fetchDataGraph3, fetchDataGraph4 } from "../../services/api/servicies";

export default function ChartStaffRequirement () {
const [idGraph, setIdGraph] = useState(0)
const [barData1Get, setBarData1Get] = useState([])
const [barData1CopyGet, setBarData1CopyGet] = useState([])
const [barData3Get, setBarData3Get] = useState([])
const [barData3CopyGet, setBarData3CopyGet] = useState([])
const [barData4Get, setBarData4Get] = useState([])
const [monthSelect, setMonthSelect] = useState(null);
const [yearSelect, setYearSelect] = useState(null);

//Fetch Graph1
useEffect(() => {
    const getDataGraph = async () => {
        const dataGraphFromServer = await fetchDataGraph1()
        setBarData1Get(dataGraphFromServer)
        setBarData1CopyGet(dataGraphFromServer)
    }
    getDataGraph()
    }, [])

//Fetch Graph3
useEffect(() => {
    const getDataGraph = async () => {
        const dataGraphFromServer = await fetchDataGraph3()
        setBarData3Get(dataGraphFromServer)
        setBarData3CopyGet(dataGraphFromServer)
    }
    getDataGraph()
    }, [])

//Fetch Graph4
useEffect(() => {
    const getDataGraph = async () => {
        const dataGraphFromServer = await fetchDataGraph4()
        setBarData4Get(dataGraphFromServer)
    }
    getDataGraph()
    }, [])


const showDiv = () => {
    setIdGraph(document.getElementById("GraficoReq").value)
    setMonthSelect(null)
    setYearSelect(null)
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

const newGraph = (item, data) => {
    if(!!item && !!data){
        if(idGraph === "1"){
            let newList = barData1Get.filter(index => 
                barData1CopyGet.find(key => index.dateMM === item.value && key.dateMM === item.value &&
                                            index.dateYY === data.name && key.dateYY === data.name))
            console.log("Lista Filtrada: " + newList)                                
            setBarData1CopyGet(newList)
        }
        else if(idGraph === "2"){
            let newList = barData3Get.filter(index => 
                barData3CopyGet.find(key => index.dateMM === item.value && key.dateMM === item.value &&
                                            index.dateYY === data.name && key.dateYY === data.name))
            console.log("Lista Filtrada: " + newList)                                
            setBarData3CopyGet(newList)
        }
    }
    else{
        setBarData1CopyGet(barData1Get)
        setBarData3CopyGet(barData3Get)
    }
}

const monthSelectChange = (item) => {
    if(!!item){
        setMonthSelect(item.selectedItem)
        newGraph(item.selectedItem, yearSelect)
    }
    else{
        setMonthSelect(null)
        setBarData1CopyGet(barData1Get)
        setBarData3CopyGet(barData3Get)
    }
}

const yearSelectChange = (item) => {
    if(!!item){
        setYearSelect(item.selectedItem)
        newGraph(monthSelect, item.selectedItem)
    }
    else{
        setYearSelect(null)
        setBarData1CopyGet(barData1Get)
        setBarData3CopyGet(barData3Get)
    }
}

const showCalendar = () => {
    if(idGraph > 0 && idGraph !== "3")
        return (
            <div className="bx--row" style={{ marginBottom: "1.2rem" }}>
                <div className="bx--col">
                <ComboBox
                    onChange={(item) => {monthSelectChange(item)}}
                    id="comboMes"
                    light
                    selectedItem={monthSelect}
                    items={monthList}
                    itemToString={(item) => (item ? item.name : "")}
                    placeholder="Escriba mes..."
                    titleText="Mes"
                    shouldFilterItem={({ item: { name }, inputValue }) => 
                    name.toLowerCase().includes(inputValue.toLowerCase())}
                />
                </div>
                <div className="bx--col">
                    <ComboBox
                        onChange={(item) => {yearSelectChange(item)}}
                        id="comboYear"
                        light
                        selectedItem={yearSelect}
                        items={yearList}
                        itemToString={(item) => (item ? item.name : "")}
                        placeholder="Escriba año..."
                        titleText="Año"
                        shouldFilterItem={({ item: { name }, inputValue }) => 
                        name.toLowerCase().includes(inputValue.toLowerCase())}
                    />
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
                    data={barData1CopyGet}
                    options={barOption1}>      
                </GroupedBarChart>
                </div>
            </div>
        )}
        {(idGraph === "2") && <div>
        <PieChart
            data={barData3CopyGet}
            options={barOption3}>      
        </PieChart>
        </div>}
        {(idGraph === "3") && <div>
        <LineChart
            data={barData4Get}
            options={barOption4}>      
        </LineChart>
        </div>}
    </div>  
)
}