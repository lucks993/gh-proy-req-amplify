import React from "react";
import { SimpleBarChart,BarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "carbon-components/css/carbon-components.min.css";
import { data, data_month, fillColors, options_h, options_v,stackedBarOptions } from "./sampleData";
import "./SalaryAdjusmentChart.scss";
import "../../assets/scss/globa.scss"
import {
  SelectItem,
  Select,
} from "carbon-components-react";
export default function SalaryAdjusmentChart() {
  const title ="Indicadores Ajuste Salarial";

  return (
    <div className="bg--grid">
      <div className="bg--row title-chart">
          <h2>{title}</h2>
        </div>
        <div className="bg--row filter-section-chart">
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
      <div className="bx--row mt">
        <SimpleBarChart data={data_month} options={options_v} fillColors={fillColors}></SimpleBarChart>
      </div>
      <div className="bx--row">
        <SimpleBarChart data={data} options={options_h}></SimpleBarChart>
      </div>
    </div>
  );
}
